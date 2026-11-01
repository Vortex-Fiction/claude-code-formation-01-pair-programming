# Build log

This repo was built with Claude Code from a written plan. Each entry is the instruction given for one task.

## Task 1 — Scaffold the npm workspaces monorepo

> Create an npm workspaces monorepo with `backend` (NestJS), `frontend` (Vue 3 + Vite) and `libs/shared` (shared types). Root scripts: `back`, `front`, `test`, `lint`, `format`. Node 20 or later. No shell scripts: it must run on Windows and macOS.

## Task 2 — Add the SQLite database layer

> Write a failing Vitest test first. Then add a Drizzle schema (`authors`, `books`, `loans`) on a SQLite file through `@libsql/client`. `createDatabase(url)` creates the parent folder, the tables and the seed data (3 authors, 6 public-domain books). It must not seed twice and must accept a `file://` URL built from a Windows path.
