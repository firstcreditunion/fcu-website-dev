# Intercom Implementation Plan — FCU Website Rebuild

> Project: First Credit Union website rebuild (`fcu-website-dev`)
> Stack: Next.js 16, React 19, TypeScript, Tailwind v4, Sanity CMS, Clerk Auth
> Target workspace: `h5fxhzbb` (production) / `a30t2fvp` (dev/test)

---

## Phase 1: Messenger Widget Integration

**Goal:** Get the Intercom Messenger loaded on every frontend page so Penny can operate on the new site.

### 1.1 Environment Variables

```env
# .env.local
NEXT_PUBLIC_INTERCOM_APP_ID=a30t2fvp        # Use test workspace during development
# NEXT_PUBLIC_INTERCOM_APP_ID=h5fxhzbb      # Switch to production at launch
```

### 1.2 Intercom Provider Component

Create a client component that initialises the Intercom JavaScript SDK. This should:

- Load the Intercom script via `window.Intercom('boot', { app_id })` on mount
- Call `window.Intercom('update')` on route changes (Next.js App Router)
- Shut down on unmount
- Accept optional user identity props for authenticated visitors

**Location:** `src/components/intercom-provider.tsx`

### 1.3 Add to Root Layout

Add the `IntercomProvider` to `src/app/layout.tsx` (or the frontend layout) so it loads on all public-facing pages. It should **not** load inside the Sanity Studio routes.

### 1.4 TypeScript Declarations

Add type declarations for the `window.Intercom` global to avoid TypeScript errors.

**Location:** `src/types/intercom.d.ts`

---

## Phase 2: User Identity Integration (Clerk → Intercom)

**Goal:** Pass authenticated member data to Intercom so conversations are attributed to real users instead of anonymous leads.

### 2.1 Identify Logged-In Users

When a Clerk session is active, pass the user's identity to Intercom:

```ts
window.Intercom('update', {
  user_id: clerkUser.id,
  name: clerkUser.fullName,
  email: clerkUser.primaryEmailAddress,
  created_at: Math.floor(new Date(clerkUser.createdAt).getTime() / 1000),
})
```

### 2.2 Identity Verification (HMAC)

For production, enable Intercom's **Identity Verification** to prevent impersonation:

1. Generate an HMAC server-side using Intercom's secret key and the user's `user_id`
2. Pass the HMAC as `user_hash` in the `Intercom('boot')` call
3. This requires a server action or API route to compute the hash

### 2.3 Logout Handling

Call `window.Intercom('shutdown')` followed by a fresh anonymous `boot` when the user signs out, so the next visitor doesn't inherit the previous session.

---

## Phase 3: Help Center Content Build-Out

**Goal:** Give Penny a real knowledge base so she can answer FCU-specific questions accurately.

### 3.1 Content Strategy

As pages are built in Sanity, create corresponding Intercom articles covering:

| Content Area | Priority | Source |
|-------------|----------|--------|
| Loan products (car, personal, home) | High | Sanity loan product pages |
| Account types (everyday, savings, term deposits) | High | Sanity account pages |
| Fees and charges | High | Sanity fees page |
| Branch locations and hours | Medium | Sanity branch pages |
| FAQs | Medium | Sanity FAQ sections |
| About / Credit union info | Low | Already exists in test workspace |
| Online banking help | Medium | Operational knowledge |

### 3.2 Article Creation Approach

Two options:

1. **Manual in Intercom dashboard** — write articles directly in Intercom's editor
2. **Programmatic via MCP** — use the `create_article` tool to push content from Sanity to Intercom. This could be automated as part of a content publishing workflow.

### 3.3 External Content Sources

Configure Intercom's AI to crawl the new website as an **external content source**:

1. In Intercom dashboard → AI Agent → Content → External Sources
2. Add the new site URL (e.g., `https://www.firstcreditunion.co.nz`)
3. Intercom will index the site and use page content to power Penny's answers

This is the most efficient approach — it means every page you build automatically becomes part of Penny's knowledge without manually duplicating content as articles.

---

## Phase 4: Messenger Customisation

**Goal:** Match the Intercom Messenger appearance to FCU's brand on the new site.

### 4.1 Branding (Intercom Dashboard)

- Set messenger colour to match FCU brand palette
- Upload FCU logo for the messenger header
- Customise Penny's avatar and greeting message
- Configure business hours and away messages

### 4.2 Launcher Behaviour

Consider whether the messenger should:

- Auto-open on certain pages (e.g., loan application pages)
- Show proactive messages on high-intent pages
- Be hidden on certain routes (e.g., Sanity Studio, internal tools)

### 4.3 Custom Actions / Workflows

Set up Intercom workflows for common FCU actions:

- "Apply for a loan" → redirect to loan application
- "Find a branch" → show branch locator
- "Talk to a human" → route to support team

---

## Phase 5: Analytics & Tracking

**Goal:** Track Intercom engagement alongside site analytics.

### 5.1 Custom Events

Send custom Intercom events for key user actions:

```ts
window.Intercom('trackEvent', 'viewed-loan-calculator', {
  loan_type: 'car',
  amount: 25000,
})
```

### 5.2 Custom Attributes

Pass page-level context to Intercom:

```ts
window.Intercom('update', {
  current_page: '/loans/car',
  member_type: 'existing', // or 'prospect'
})
```

---

## Implementation Order

```
Phase 1 ──→ Phase 2 ──→ Phase 3 ──→ Phase 4 ──→ Phase 5
  │            │            │            │            │
  │            │            │            │            └─ Analytics events
  │            │            │            └─ Brand customisation
  │            │            └─ Articles & content sources
  │            └─ Clerk identity pass-through
  └─ Messenger widget on all pages
```

**Phase 1 is the immediate next step** and can be completed in a single session. Phases 2–5 can be done incrementally as the site takes shape.

---

## Environment Switching Strategy

| Environment | Intercom App ID | Purpose |
|-------------|----------------|---------|
| Local dev (`localhost:3000`) | `a30t2fvp` | Test workspace — safe to experiment |
| Preview deployments (Vercel) | `a30t2fvp` | Test workspace — no production pollution |
| Production (`firstcreditunion.co.nz`) | `h5fxhzbb` | Live workspace with Penny and real contacts |

This keeps development activity out of the production workspace's contact and conversation data.
