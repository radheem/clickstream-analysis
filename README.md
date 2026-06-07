# Clickstream Analytics

A self-built, end-to-end **clickstream analytics** pipeline in TypeScript/Node.js. Two Next.js sites emit
behavioural events through a shared tracking SDK; a Node collector ingests them, NATS JetStream carries
them, a worker sessionizes and aggregates, ClickHouse stores them, and a Next.js dashboard visualizes
them in real time.

See **[docs/architecture.md](docs/architecture.md)** for the full design.

## Monorepo layout

```
apps/
  website-a/    # Kinto  — SaaS/marketing source site (Next.js)
  website-b/    # Hatch  — agency/portfolio source site (Next.js)
  collector/    # Fastify ingestion API (POST /collect → NATS)
  worker/       # NATS JetStream consumer: sessionize + roll up → ClickHouse
  dashboard/    # Next.js analytics UI
packages/
  schema/       # @clickstream/schema — shared zod event model + types
  tracker/      # @clickstream/tracker — browser SDK
  db/           # @clickstream/db — ClickHouse + Postgres clients + migrations
deploy/
  docker-compose.yml   # NATS, ClickHouse, Postgres
docs/
  architecture.md
```

## Getting started

```bash
pnpm install
cp .env.example .env
docker compose -f deploy/docker-compose.yml up -d   # NATS + ClickHouse + Postgres
pnpm dev                                            # run the workspace via Turborepo
```

Requires Node ≥ 20 and pnpm ≥ 9. Toolchain: pnpm workspaces + Turborepo, TypeScript everywhere.

## Status

Scaffold — workspace, shared schema, tracker SDK, collector, worker, and dashboard skeletons are in
place. See the roadmap in [docs/architecture.md](docs/architecture.md#10-build-phases).
