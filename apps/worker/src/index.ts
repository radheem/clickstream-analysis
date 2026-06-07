import {
  AckPolicy,
  connect,
  JSONCodec,
  type JsMsg,
} from "nats";
import { StoredEvent } from "@clickstream/schema";
// import { clickhouse } from "@clickstream/db"; // wired in phase 1/2

/**
 * Worker — durable NATS JetStream consumer. Turns raw events into stored,
 * queryable data: sessionization + rollups → ClickHouse.
 *
 * Scaffold: consumes and validates the stream; the sessionize/insert steps are
 * stubbed for the build-out phases (see docs/architecture.md).
 */

const NATS_URL = process.env.NATS_URL ?? "nats://localhost:4222";
const STREAM = process.env.NATS_STREAM ?? "clickstream";

const codec = JSONCodec<unknown>();

async function handle(msg: JsMsg): Promise<void> {
  const parsed = StoredEvent.safeParse(codec.decode(msg.data));
  if (!parsed.success) {
    console.warn("dropping malformed event", parsed.error.issues);
    msg.ack();
    return;
  }
  const event = parsed.data;

  // TODO(phase 3): sessionize per (visitor_id, site_id) with the 30-min gap rule
  // TODO(phase 1/2): batched insert into ClickHouse `analytics.events`
  // TODO(phase 4): push live-visitor delta to the realtime gateway
  console.log(`[${event.site_id}] ${event.type} ${event.url}`);

  msg.ack();
}

async function main(): Promise<void> {
  const nats = await connect({ servers: NATS_URL });
  const jsm = await nats.jetstreamManager();

  // ensure the stream exists (idempotent)
  await jsm.streams.add({ name: STREAM, subjects: [`${STREAM}.>`] }).catch(() => undefined);

  // durable pull consumer over all events
  await jsm.consumers
    .add(STREAM, {
      durable_name: "worker",
      ack_policy: AckPolicy.Explicit,
      filter_subject: `${STREAM}.>`,
    })
    .catch(() => undefined);

  const js = nats.jetstream();
  const consumer = await js.consumers.get(STREAM, "worker");
  const messages = await consumer.consume();

  console.log(`worker consuming ${STREAM}.> from ${NATS_URL}`);
  for await (const msg of messages) {
    await handle(msg).catch((err) => {
      console.error("handler error", err);
      msg.nak();
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
