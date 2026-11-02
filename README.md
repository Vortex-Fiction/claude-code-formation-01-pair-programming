# Claude Code training — phase 1: pair programming

A small library app (books, authors, loans) used for the phase 1 exercises. The exercises are in [`exercices/`](exercices/) and the slides in [`slides.md`](slides.md).

## Prerequisites

Install these tools before the session. You need Node.js 22.13 or later. On Windows, use an x64 computer: the SQLite driver has no Windows ARM build.

On Windows, first allow PowerShell to run the npm launcher (once per user):

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

| Tool        | macOS (Homebrew)                  | Windows (winget, in PowerShell)       |
| ----------- | --------------------------------- | ------------------------------------- |
| Node.js LTS | `brew install node`               | `winget install OpenJS.NodeJS.LTS`    |
| git         | `brew install git`                | `winget install Git.Git`              |
| GitHub CLI  | `brew install gh`                 | `winget install GitHub.cli`           |
| Claude Code | `brew install --cask claude-code` | `winget install Anthropic.ClaudeCode` |

Close and open your terminal again after the installation, so that it finds the new commands.

Then, on both systems:

```bash
gh auth login
claude
```

`claude` asks you to sign in the first time.

## Run

```bash
git clone https://github.com/Vortex-Fiction/claude-code-formation-01-pair-programming.git
cd claude-code-formation-01-pair-programming
npm install
npm run back
```

`npm install` shows two messages. You can ignore them:

- `13 moderate severity vulnerabilities`: these advisories are about the development tools. Do not run `npm audit fix --force`, because it installs incompatible major versions.
- `install scripts blocked` for `esbuild` and `fsevents`: the app does not need these scripts. Do nothing.

In a second terminal:

```bash
npm run front
```

- API: http://localhost:3000/api/books
- App: http://localhost:5173

The SQLite database is created in `backend/data/` on the first `npm run back`. To start again from the seed data, stop the API and delete `backend/data/`.

## Check

```bash
npm test
npm run lint
```
