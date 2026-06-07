import { connect, JSONCodec, type NatsConnection } from "nats";
import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import {
  EventBatch,
  eventSubject,
  type StoredEvent,
} from "@clickstream/schema";

/**
 * Collector — the only internet-facing service. Validates batches with zod,
 * enriches server-side, and publishes each event to NATS JetStream.
 * It does NOT touch the database on the hot path.
 */

const PORT = Number(process.env.COLLECTOR_PORT ?? 4000);
const NATS_URL = process.env.NATS_URL ?? "nats://localhost:4222";
const STREAM = process.env.NATS_STREAM ?? "clickstream";
const ORIGINS = (process.env.COLLECTOR_ALLOWED_ORIGINS ?? "http://localhost:3000,http://localhost:3001")
  .split(",")
  .map((s) => s.trim());

const codec = JSONCodec<StoredEvent>();

async function main(): Promise<void> {
  const app = Fastify({ logger: true, bodyLimit: 256 * 1024 });

  await app.register(cors, { origin: ORIGINS, methods: ["POST"] });
  await app.register(rateLimit, { max: 240, timeWindow: "1 minute" });

  let nats: NatsConnection | undefined;
  try {
    nats = await connect({ servers: NATS_URL });
    app.log.info({ NATS_URL }, "connected to NATS");
  } catch (err) {
    app.log.warn({ err }, "NATS unavailable — events will be dropped until it is up");
  }

  app.get("/health", async () => ({ ok: true, nats: Boolean(nats) }));

  app.post("/collect", async (req, reply) => {
    const parsed = EventBatch.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "invalid_batch", issues: parsed.error.issues });
    }

    // accept fast; publish asynchronously
    reply.code(202).send({ accepted: parsed.data.events.length });

    if (!nats) return;
    const js = nats.jetstream();
    const serverTs = new Date().toISOString();
    for (const e of parsed.data.events) {
      const stored: StoredEvent = {
        ...e,
        server_ts: serverTs,
        // TODO(phase 2): UA parsing + GeoIP from truncated req.ip
      };
      try {
        await js.publish(eventSubject(STREAM, e), codec.encode(stored));
      } catch (err) {
        req.log.error({ err }, "jetstream publish failed");
      }
    }
  });

  await app.listen({ port: PORT, host: "0.0.0.0" });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
