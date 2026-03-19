# Intercom Workspace Audit

> Audit date: 20 March 2026
> Performed via Intercom MCP API calls against both connected workspaces.

---

## Workspace Overview

| Property | Production | Test / Dev |
|----------|-----------|------------|
| **Workspace ID** | `h5fxhzbb` | `a30t2fvp` |
| **MCP server name** | `user-intercom-production` | `user-intercom` |
| **Help Center URL** | `intercom.help/first-credit-union/en/` | `intercom.help/first-credit-union-test/en/` |

---

## Production Workspace — `h5fxhzbb`

### AI Agent (Fin / "Penny")

- **Name:** Penny
- **Email:** `operator+h5fxhzbb@intercom.io`
- **Greeting:** "Hi there! I'm Penny your Ai assistant.. How can I help you today?"
- **Status:** Active — initiates all sampled conversations

### Articles (Help Center)

| ID | Title | State | Created | Notes |
|----|-------|-------|---------|-------|
| `1713231` | Example article | Published | 2019-02-08 | Default Intercom placeholder content |
| `1713232` | Example draft | Draft | 2019-02-08 | Default Intercom placeholder content |
| `12418844` | Untitled public article | Draft | 2025-09-26 | Empty — no body content |
| `13457922` | Untitled public article | Draft | 2026-06-22 | Empty — no body content |

**Summary:** No real FCU-authored Help Center content exists in production. All 4 articles are either Intercom defaults or empty drafts. This means Penny is currently operating without any Help Center knowledge base — she's relying solely on whatever external content sources or custom answers have been configured in the Intercom dashboard.

### Conversations

- **Total:** ~9,345 conversations (1,869 pages × 5 per page)
- **Open:** 0 — no currently open conversations
- **All sampled conversations** are closed, initiated by Penny, and associated with anonymous lead contacts
- Conversations appear to be from the current live website at `firstcreditunion.co.nz`

### Contacts

- **Total:** ~8,160 contacts (1,632 pages × 5 per page)
- **Composition:** Predominantly anonymous leads (no name, no email)
- **Roles:** All sampled contacts have `role: "lead"` (not `user`)
- **Date range:** Contacts span from 2023 to present (March 2026)

This indicates the current site does not pass any user identity to Intercom — all visitors are tracked as anonymous leads.

---

## Test / Dev Workspace — `a30t2fvp`

### Articles (Help Center)

| ID | Title | State | Created | Notes |
|----|-------|-------|---------|-------|
| `12271728` | Credit Unions: A Movement Rooted in Community, Equality, and Financial Empowerment | Published | 2025-09-12 | Long-form article about credit union history and FCU's origins |
| `12307702` | The Smarter Way to Buy Your Next Car: Get Pre-Approved | Draft | 2025-09-17 | Car loan pre-approval guide (earlier draft version) |
| `12307725` | Buy Smarter: Get Pre-Approved for Your Next Car | Published | 2025-09-17 | Car loan pre-approval guide (polished version) |

**Summary:** The test workspace has real FCU content — 2 published articles and 1 draft. These appear to be content experiments before publishing to production.

### Conversations & Contacts

Not audited in detail for the test workspace as it is not the production environment.

---

## Key Findings

1. **No Intercom integration exists in the new Next.js project** — zero references to Intercom in any source file, no environment variables, no script tags.

2. **Production Help Center is effectively empty.** Penny has no article-based knowledge to draw from. All articles are Intercom defaults or blank drafts.

3. **All production contacts are anonymous.** The current website does not pass identity data (name, email, member ID) to Intercom, so every visitor is an unattributed lead.

4. **Penny is active and handling significant volume** — ~9,345 conversations to date, all closed, suggesting the AI agent is resolving queries without human handoff (or conversations are being auto-closed).

5. **Test workspace has real content** that could serve as a template for building out the production Help Center alongside the new website.
