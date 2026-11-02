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

## Task 5 — Add the books, loans and authors pages

> Add a Vue 3 + Vite frontend on port 5173 with a `/api` proxy to the backend. One typed `api.ts` client, three tabs (Books, Loans, Authors) and an error banner that shows the API message. No CSS framework. Check in the browser: borrow a book, return it, and submit an empty borrower to see the 400 message.

## Task 6 — Add the prerequisites for macOS and Windows

> Write the README prerequisites as a table with one command per tool for macOS (Homebrew) and Windows (winget). Then clone the repo into an empty folder and check that `npm install`, `npm run back` and `npm run front` work with nothing else.

## Task 7 — Add the phase 1 exercises

> Write three exercises in French under `exercices/`: rewrite three vague prompts in three parts; fix a bug in plan mode with the test first; deliver a small backend + frontend improvement in one short session. Each exercise ends with clear success criteria.

## Task 8 — Add the phase 1 slides

> Write `slides.md` for Marp, in French, 24 slides in the order of the phase 1 outline. At most 5 bullets per slide, speaker notes on the theory slides. The Bad → OK → Great example must not give away an exercise. Render to HTML and PNG and check that no text overflows.

## Change — Build the backend with esbuild, as in Vortex

> Bundle the backend with esbuild so that imports need no `.js` suffix. esbuild does not emit decorator metadata, so do what Vortex does: an explicit `@Inject(Class)` in every constructor, no `ValidationPipe` and no `class-validator`. Each service validates its own input and throws `BadRequestException`. Write the failing validation tests in the services first. `npm run lint` also type-checks the backend.
