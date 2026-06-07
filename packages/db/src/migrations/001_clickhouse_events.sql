-- ClickHouse: raw clickstream events.
-- Columnar MergeTree partitioned by day, ordered for the common dashboard queries.

CREATE TABLE IF NOT EXISTS analytics.events
(
    event_id    UUID,
    type        LowCardinality(String),
    site_id     LowCardinality(String),
    ts          DateTime64(3),
    server_ts   DateTime64(3),
    visitor_id  String,
    session_id  String,
    url         String,
    referrer    String,
    name        String,
    props       String,                 -- JSON-encoded primitive map
    ip_country  LowCardinality(String),
    device_browser LowCardinality(String),
    device_os      LowCardinality(String),
    device_type    LowCardinality(String)
)
ENGINE = MergeTree
PARTITION BY toYYYYMMDD(ts)
ORDER BY (site_id, type, ts)
TTL toDateTime(ts) + INTERVAL 13 MONTH;
