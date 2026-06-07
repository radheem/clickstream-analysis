import { z } from "zod";

/**
 * The clickstream event model — the single source of truth shared by the tracker SDK,
 * the collector, and the worker. Validated with zod at the ingestion edge.
 */

export const SITE_IDS = ["website-a", "website-b"] as const;
export const SiteId = z.enum(SITE_IDS);
export type SiteId = z.infer<typeof SiteId>;

export const EventType = z.enum([
  "page_view",
  "click",
  "scroll_depth",
  "session_start",
  "custom",
]);
export type EventType = z.infer<typeof EventType>;

export const DeviceType = z.enum(["mobile", "desktop", "tablet"]);
export type DeviceType = z.infer<typeof DeviceType>;

/** Free-form, primitive-only event properties. */
export const EventProps = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.boolean()]),
);
export type EventProps = z.infer<typeof EventProps>;

/** Client-supplied context captured in the browser. */
export const EventContext = z.object({
  user_agent: z.string(),
  screen: z.object({ w: z.number().int(), h: z.number().int() }).optional(),
  locale: z.string().optional(),
  consent: z.boolean(),
});
export type EventContext = z.infer<typeof EventContext>;

/** What the tracker SDK sends. */
export const ClientEvent = z.object({
  event_id: z.string().uuid(),
  type: EventType,
  site_id: SiteId,
  ts: z.string().datetime(),
  visitor_id: z.string().min(1),
  session_id: z.string().min(1),
  url: z.string().min(1),
  referrer: z.string().optional(),
  name: z.string().optional(),
  props: EventProps.optional(),
  context: EventContext,
});
export type ClientEvent = z.infer<typeof ClientEvent>;

/** A batch posted to the collector. */
export const EventBatch = z.object({
  site_id: SiteId,
  sent_at: z.string().datetime(),
  events: z.array(ClientEvent).min(1).max(100),
});
export type EventBatch = z.infer<typeof EventBatch>;

/** Server-side enrichment added by the collector before publishing. */
export const ServerEnrichment = z.object({
  server_ts: z.string().datetime(),
  ip_country: z.string().optional(),
  device: z
    .object({
      browser: z.string(),
      os: z.string(),
      type: DeviceType,
    })
    .optional(),
});
export type ServerEnrichment = z.infer<typeof ServerEnrichment>;

/** The enriched event that flows through NATS into ClickHouse. */
export const StoredEvent = ClientEvent.merge(ServerEnrichment);
export type StoredEvent = z.infer<typeof StoredEvent>;

/** Subject helper: clickstream.<site_id>.<type> */
export function eventSubject(streamPrefix: string, e: Pick<ClientEvent, "site_id" | "type">): string {
  return `${streamPrefix}.${e.site_id}.${e.type}`;
}

/** Inactivity window that closes a session. */
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
