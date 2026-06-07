import { createClient as createClickHouse, type ClickHouseClient } from "@clickhouse/client";
import pg from "pg";

/** Thin client factories shared by the worker and the dashboard query gateway. */

export function clickhouse(): ClickHouseClient {
  return createClickHouse({
    url: process.env.CLICKHOUSE_URL ?? "http://localhost:8123",
    database: process.env.CLICKHOUSE_DB ?? "analytics",
    username: process.env.CLICKHOUSE_USER ?? "default",
    password: process.env.CLICKHOUSE_PASSWORD ?? "",
  });
}

export function postgres(): pg.Pool {
  return new pg.Pool({
    connectionString:
      process.env.POSTGRES_URL ?? "postgres://clickstream:clickstream@localhost:5432/clickstream",
  });
}

export { type ClickHouseClient };
