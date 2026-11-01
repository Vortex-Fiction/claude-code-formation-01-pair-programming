# Build log

This repo was built with Claude Code from a written plan. Each entry is the instruction given for one task.

## Task 1 — Scaffold the npm workspaces monorepo

> Create an npm workspaces monorepo with `backend` (NestJS), `frontend` (Vue 3 + Vite) and `libs/shared` (shared types). Root scripts: `back`, `front`, `test`, `lint`, `format`. Node 20 or later. No shell scripts: it must run on Windows and macOS.

## Task 2 — Add the SQLite database layer

> Write a failing Vitest test first. Then add a Drizzle schema (`authors`, `books`, `loans`) on a SQLite file through `@libsql/client`. `createDatabase(url)` creates the parent folder, the tables and the seed data (3 authors, 6 public-domain books). It must not seed twice and must accept a `file://` URL built from a Windows path.

## Task 3 — Add authors and books endpoints with the API bootstrap

> Write failing tests for `AuthorsService` and `BooksService` first: list, create, unknown author (404), duplicated ISBN (409), get by id. Then add the DTOs with `class-validator`, the controllers under `/api`, the database provider and `main.ts` on port 3000. NestJS 12 is ESM only: the backend is an ES module with `.js` import suffixes. Check by hand that `GET /api/books` returns the author names and that `POST /api/books` with `{}` returns 400.

## Task 4 — Add loans with borrow and return

> Write failing tests for `LoansService` first: borrow an available book, reject an unavailable book (409), reject a missing book or loan (404), return a loan, list the loans. Then add the DTO, the service and the routes `GET /api/loans`, `POST /api/loans`, `POST /api/loans/:id/return`. One behavior is deliberately left without a test and without a guard: it is a phase 1 exercise.
