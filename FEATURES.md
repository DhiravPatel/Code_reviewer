# CodeReview AI — Features

A complete inventory of what the product does today.

---

## 1. GitHub integration

- **One-click connect** via GitHub OAuth (in addition to Google sign-in).
- **Repo browser** lists every repo on your account, with language, stars, fork count, privacy state, and last-updated time.
- **Up to 5 enabled repos** per account (free plan), tracked via a slot meter that fills in green with an editorial easing animation.
- **Search + filter** across All / Enabled / Available.
- **Webhook auto-registration** — enabling a repo registers a `pull_request` webhook on it automatically. Disabling unregisters it. Re-enabling reuses an existing webhook if one is already there.
- **HMAC signature verification** on every webhook payload — invalid signatures get rejected with 401.

## 2. AI code review (Groq llama-3.3-70b)

Each review produces a structured JSON object with:

- **Score** (0–100) and **Verdict** (`approved` / `changes_requested`). 80+ → approved.
- **Confidence score** (1–5) with a one-sentence reason explaining how well the diff could be analyzed.
- **Overall feedback** — 3–5 sentence high-level note in a senior-reviewer voice.
- **Key changes** — bullet list of major changes in the PR.
- **Issues found** — high-level concerns spotted across the diff.
- **Per-file overviews** with file-specific concerns flagged as warnings.
- **Mermaid flowchart** — optional, generated only when the PR introduces meaningful control flow (auth, state machines, request handlers with branching, pipelines).
- **3–10 prioritized inline comments**, each with:
  - Priority (`P1` security/correctness, `P2` bugs/perf, `P3` polish)
  - Type (security, bug, performance, maintainability, style, suggestion)
  - File + line range (HEAD-side)
  - Description (2–5 sentences explaining the issue and its real impact)
  - Verbatim `codeBefore` from the diff
  - Drop-in `codeAfter` replacement
  - Rationale bullets

### Token-budget guardrails

- `max_tokens: 4000`, `maxDiffLength: 18000 chars` — fits comfortably under Groq free-tier 12k TPM with a real safety margin.
- Prompt is compressed but preserves the full schema, priority guide, flowchart rules, and quality bar.

## 3. Triggers

- **Auto-trigger via webhook** on `pull_request` events with action `opened` or `synchronize` (new commits pushed).
- **Manual trigger from the dashboard** — "Run review" button on any unreviewed PR.
- **Re-review on new commits** — synchronize events run a fresh review and clean up the previous inline comments before posting new ones.

## 4. GitHub-native review output

Posts directly to the PR in two shapes:

1. **Summary issue-comment** with score, verdict, confidence, key changes, issues found, file overviews, optional Mermaid flowchart, and prioritized review comments with collapsible Before/After blocks.
2. **Inline review comments** via the PR Reviews API with `\`\`\`suggestion` blocks. Reviewers click GitHub's native **"Commit suggestion"** button and the fix is committed to the PR's branch in one click.

Both artifacts carry a hidden `<!-- codereview-ai:v1 -->` marker so re-runs can identify and clean them up.

### Smart line snapping

AI-generated line numbers are validated against the actual diff hunks before posting. A `snapToAnchor` helper tolerates off-by-one errors within ±3 lines. Comments that can't anchor inside a hunk silently fall through to the summary comment instead of being silently dropped or rejected by GitHub.

## 5. Project-specific rules (`.codereview.yml`)

Teams check in a `.codereview.yml` at the repo root to encode their conventions. Reviews load it from the PR's head branch and inject it into the prompt.

```yaml
rules:
  - Use zod for input validation, never joi
  - All authentication endpoints must rate-limit
  - No console.log in production code paths

ignore:
  - "*.md"
  - "docs/**"

focus:
  - security
  - performance
```

- **rules** — high-priority enforcements injected into the prompt.
- **ignore** — glob patterns (`*`, `**`) for files to skip *before* sending to the AI (saves tokens too).
- **focus** — priority areas the AI emphasizes.

A green-bordered banner on the PR detail page shows when rules were applied: rule count, source file, focus areas, and the number of files skipped.

Malformed configs degrade silently — reviews never break because of a bad rules file.

## 6. Apply Fix (backend)

`POST /api/v1/prs/review/:id/apply-fix` commits a single AI suggestion directly to the PR's head branch via GitHub Contents API:

- **Atomic write** — uses the file SHA so concurrent edits can't be clobbered.
- **Drift check** — verifies `codeBefore` still matches the current file (whitespace-insensitive) before writing. Refuses if the file changed since the review.
- **Idempotent** — refuses to re-apply an already-applied comment.
- **Refuses fork PRs and closed PRs** with a clear error.
- **Persists state** — `applied`, `appliedAt`, `appliedCommitSha`, `appliedCommitUrl` are written onto the comment in the review record.

(The dashboard button was removed from the UI; the endpoint remains for future re-introduction or API consumers.)

## 7. Dashboard

### Repositories
- Editorial header with eyebrow + green rule + serif "Your *repositories.*"
- Animated slot meter (fills with editorial easing on load)
- Search + filter tabs (All / Enabled / Available)
- Hairline-separated rows with hover lift, scale-up on logo hover, green left-edge accent on hover
- Stagger fade-up on initial load (capped at 600ms total)

### Pull Requests
- Same editorial header pattern
- Magazine-article row layout: 60px serif score on the left (priority-colored green/amber/red), serif title with byline meta above, status label below
- Animated left-edge green accent that scales in vertically on hover
- "Read review" text slides in from the right on hover (hidden by default to keep the row calm)
- Filter tabs (All / Reviewed / Reviewing / Pending)
- Auto-polling every 5s while any review is in progress

### Pull Request detail
- Eyebrow + serif PR title + meta (repo, #, author, branch)
- Editorial diff chips: green `+N`, red `−N`, neutral files count
- Stats strip: confidence (5 thin bars + reason), P1/P2/P3 counts, score — each a big serif numeral in priority color
- Summary as a 26px italic serif pull-quote with green curly quotes
- Key changes / Issues found as hairline-divided columns
- Files-changed table with mono filename chips and inline concern bullets
- Mermaid flowchart embed
- **Project rules banner** when applicable
- Review comment cards with vertical icon column + connector line, priority pill, serif title, refined Before/After code blocks with their own colored rules (red for before, green for after)
- Verdict footer: "Looks *good to ship.*" or "Changes *requested.*" with the status pill

### Integrations
- Editorial cards for GitHub (connected/available), GitLab (soon), Bitbucket (soon)
- Connected status pill with animated ping
- Hover: 12% scale on logo, green shadow glow, border tint
- Ink-black Connect button that morphs to brand green on hover
- "Need a different integration?" mailto CTA at the bottom

## 8. Editorial luxury design system

A single coherent visual language across landing, login, and dashboard.

### Typography
- **Cormorant Garamond** serif for display (headings, titles, scores, italic accents)
- **Montserrat** for UI (buttons, eyebrows, body)
- **JetBrains Mono** for code, file paths, repo names
- **Inter** as fallback for system text

### Tokens
- `primary` `#10b981` (brand green) / `primary-dark` `#047857`
- `ink` `#1a1612` for body text and dark CTAs
- `cream` `#faf8f3` / `ivory` `#f4f2ec` for surfaces
- Warm `sand` neutral scale (50 → 900)
- Editorial easing `cubic-bezier(0.22, 1, 0.36, 1)` standard across all transitions

### Motion
- Slow, never bouncy — 500–950ms transitions throughout
- `rule-grow` keyframe for headings (red/green hairline grows in on mount)
- `ed-fade-up` staggered scroll reveals
- `bar-grow` scroll-triggered chart animations
- `diff-cycle` looping diff line reveal in landing demo cells
- `chip-pulse` soft glow on security chips
- `ed-marquee` continuous announcement strip with hover-pause
- `nav-letter` magazine-style nav with letters lifting to reveal red ghosts beneath
- `slot-fill` for the repo slot meter
- `dark-aurora` (login left pane) — three drifting green orbs at 14s / 18s / 22s
- `scan-line`, `sparkle-dot`, `chipPulse`, `daDrift1/2/3` and more

### Components / utilities
- `display` / `display-italic` — serif headings
- `eyebrow` — 11px 0.22em uppercase tracking labels
- `rule` — 48px green hairline rule divider
- `btn-ed` (+ ghost / invert variants) — flat editorial buttons
- `btn-link-ed` — animated underline text-link
- `ed-card` (+ `card-hover-glow`) — flat surfaces with slow lift on hover
- `page-display` / `italic-accent` — dashboard page headlines
- `row-lift` / `press-scale` — hover and click micro-interactions

## 9. Landing page

- **Marquee announcement strip** above the nav (4 messages, 38s loop, pauses on hover)
- **Hero** with eyebrow + growing rule, 104px serif headline with italic green accent, typewriter cycling through italic accent words, parallax on scroll, warm cursor spotlight, code-specimen card with stagger-fading diff + AI suggestion + score footer, three animated stat counters
- **Bento Features grid** — 6 cells across a 6-column asymmetric layout:
  1. *Auto PR Review* (3×2 hero cell) with live looping diff demo
  2. *Security Warnings* — pulsing vulnerability chips
  3. *Quality Metrics* — scroll-triggered bar chart
  4. *Code Suggestions* — diff snippet
  5. *Smart Merging* — SVG merge graph
  6. *Enterprise Security* — ink-dark cell with compliance stamps
- **How It Works** — three numbered editorial rows (Connect / Open / Read) with hairline dividers
- **Testimonials** — dual marquee rows scrolling in opposite directions, pause on hover, pull-quote serif cards
- **Closing CTA** — ink-dark with 128px serif "Ship better code, *faster.*"
- **Footer** — massive serif wordmark + tagline + GitHub/Twitter icons (links stripped per request)

## 10. Authentication

- **Google OAuth** sign-in with JWT session in HTTP-only cookie
- **Login page** with two-pane layout: dark animated green-gradient on the left (drifting orbs + grid + scan line + sparkle dots + code specimen + stat strip), cream editorial sign-in on the right
- **Locked to viewport height** — `100vh overflow: hidden`, so the login never scrolls awkwardly
- **GitHub OAuth** as a separate integration flow (not used for primary login)

## 11. Theming

- **Editorial luxury** as the primary visual system (landing, login, sidebar, all dashboard pages)
- **Theme-aware tokens** on dashboard surfaces (`t-bg`, `t-text`, `t-card`, etc.) so dark mode still works through the topbar moon toggle
- **ThemeContext** persists choice in localStorage

## 12. Reliability

- **Detailed error logging** in `runReview` catch block — `userId`, `repoId`, `prNumber`, message, status, full stack — so webhook-triggered failures are no longer silent.
- **GitHub failure comment** posts when AI review throws, so users see the failure on the PR itself.
- **DB marks failed reviews** as `status: 'failed'` rather than leaving them stuck on `reviewing`.
- **Webhooks always return 200** even on review failure, so GitHub doesn't keep retrying.
- **Best-effort cleanup** of prior inline comments on re-runs — individual failures don't block the new review.
- **Marker-based comment identification** — we never delete comments that aren't ours.

## 13. Stack

- **API** — Fastify 5 + Bun + TypeScript + Prisma + PostgreSQL (Supabase)
- **Web** — React 18 + Vite 5 + Tailwind CSS 3 + React Router 6 + Framer Motion + Lucide
- **AI** — Groq SDK with `llama-3.3-70b-versatile`
- **OAuth** — `@fastify/oauth2` for Google + GitHub flows
- **JWT** — `@fastify/jwt` with HTTP-only cookies
- **Mermaid** — client-side diagram rendering on the PR detail page

---

## Routes

### Web
| Route | Purpose |
|-------|---------|
| `/` | Editorial landing page |
| `/login` | Sign in (Google) |
| `/dashboard/repositories` | Repo browser + AI review slot manager |
| `/dashboard/pull-requests` | PR list with status / score / verdict |
| `/dashboard/pr/:id` | Single PR review detail |
| `/dashboard/integrations` | GitHub / GitLab / Bitbucket connections |

### API (selected)
| Method | Path | Purpose |
|--------|------|---------|
| `GET`    | `/api/v1/prs`                       | List open PRs across enabled repos |
| `POST`   | `/api/v1/prs/review`                | Trigger AI review |
| `GET`    | `/api/v1/prs/review/:id`            | Get a single review |
| `POST`   | `/api/v1/prs/review/:id/apply-fix`  | Apply a suggestion to the PR branch |
| `GET`    | `/api/v1/repos`                     | List GitHub repos |
| `POST`   | `/api/v1/repos/enable`              | Enable a repo (registers webhook) |
| `POST`   | `/api/v1/repos/disable`             | Disable a repo (deletes webhook) |
| `POST`   | `/api/v1/webhooks/github`           | GitHub webhook receiver |
| `GET`    | `/api/v1/auth/google`               | Start Google OAuth |
| `GET`    | `/api/v1/integrations/github/connect` | Start GitHub OAuth |
| `DELETE` | `/api/v1/integrations/github/disconnect` | Disconnect GitHub |
