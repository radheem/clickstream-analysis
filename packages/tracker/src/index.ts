import {
  SESSION_TIMEOUT_MS,
  type ClientEvent,
  type EventProps,
  type EventType,
  type SiteId,
} from "@clickstream/schema";

/**
 * @clickstream/tracker — a small, dependency-light browser SDK shared by both sites.
 *
 * Responsibilities:
 *  - generate a stable anonymous visitor id + a rolling session id
 *  - auto-capture page views, clicks ([data-track]), and scroll depth
 *  - batch events and flush on interval / visibility change / unload (sendBeacon)
 *  - stay silent until consent is granted; respect Do-Not-Track
 *
 * This is the scaffold: wiring + public API are in place; some auto-capture hooks
 * are marked TODO for the build-out phases (see docs/architecture.md).
 */

export interface TrackerConfig {
  siteId: SiteId;
  /** Collector ingestion endpoint, e.g. http://localhost:4000 */
  endpoint: string;
  /** Flush interval in ms (default 5000). */
  flushIntervalMs?: number;
  /** Max events per batch (default 25). */
  batchSize?: number;
  /** Start with consent granted (default false — emits nothing until consent()). */
  consent?: boolean;
  /** Persist ids in localStorage (default true) or stay in-memory/cookieless. */
  persist?: boolean;
}

const STORAGE_KEY = "cs_ids";

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

function dntEnabled(): boolean {
  if (typeof navigator === "undefined") return false;
  const dnt = (navigator as Navigator & { doNotTrack?: string }).doNotTrack;
  return dnt === "1" || dnt === "yes";
}

interface Ids {
  visitor_id: string;
  session_id: string;
  last_seen: number;
}

export interface Tracker {
  /** Grant consent and start flushing. */
  consent(): void;
  /** Manually record a page view (call on route change). */
  pageView(url?: string): void;
  /** Record a custom or named event. */
  track(name: string, props?: EventProps, type?: EventType): void;
  /** Force-send the current buffer. */
  flush(): void;
}

export function createTracker(config: TrackerConfig): Tracker {
  const {
    siteId,
    endpoint,
    flushIntervalMs = 5000,
    batchSize = 25,
    persist = true,
  } = config;

  let consentGranted = Boolean(config.consent);
  let buffer: ClientEvent[] = [];
  let timer: ReturnType<typeof setInterval> | undefined;

  const ids = loadIds();

  function loadIds(): Ids {
    const fresh: Ids = { visitor_id: uuid(), session_id: uuid(), last_seen: Date.now() };
    if (!persist || typeof localStorage === "undefined") return fresh;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return saveIds(fresh);
      const prev = JSON.parse(raw) as Ids;
      // rotate the session id after the inactivity window
      if (Date.now() - prev.last_seen > SESSION_TIMEOUT_MS) prev.session_id = uuid();
      prev.last_seen = Date.now();
      return saveIds(prev);
    } catch {
      return saveIds(fresh);
    }
  }

  function saveIds(next: Ids): Ids {
    if (persist && typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable — fall back to in-memory */
      }
    }
    return next;
  }

  function touchSession(): void {
    ids.last_seen = Date.now();
    saveIds(ids);
  }

  function enqueue(type: EventType, name?: string, props?: EventProps): void {
    if (!consentGranted || dntEnabled()) return;
    if (typeof window === "undefined") return;
    touchSession();
    const event: ClientEvent = {
      event_id: uuid(),
      type,
      site_id: siteId,
      ts: nowIso(),
      visitor_id: ids.visitor_id,
      session_id: ids.session_id,
      url: window.location.pathname + window.location.search,
      referrer: document.referrer || undefined,
      name,
      props,
      context: {
        user_agent: navigator.userAgent,
        screen: { w: window.screen.width, h: window.screen.height },
        locale: navigator.language,
        consent: true,
      },
    };
    buffer.push(event);
    if (buffer.length >= batchSize) flush();
  }

  function flush(useBeacon = false): void {
    if (buffer.length === 0) return;
    const events = buffer;
    buffer = [];
    const body = JSON.stringify({ site_id: siteId, sent_at: nowIso(), events });
    const url = `${endpoint}/collect`;
    if (useBeacon && typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* best-effort: never throw into the host page */
    });
  }

  function start(): void {
    if (timer || typeof window === "undefined") return;
    timer = setInterval(() => flush(), flushIntervalMs);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush(true);
    });
    window.addEventListener("pagehide", () => flush(true));
    // TODO(phase 2): delegated [data-track] click capture + scroll-depth observer
  }

  if (consentGranted) start();

  return {
    consent() {
      consentGranted = true;
      start();
      enqueue("session_start");
    },
    pageView(url?: string) {
      enqueue("page_view", url);
    },
    track(name: string, props?: EventProps, type: EventType = "custom") {
      enqueue(type, name, props);
    },
    flush() {
      flush();
    },
  };
}
