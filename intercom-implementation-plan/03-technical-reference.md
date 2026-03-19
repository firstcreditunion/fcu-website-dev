# Intercom Technical Reference — FCU Project

> Quick reference for workspace IDs, API details, and MCP tool usage.

---

## Workspace Credentials

| Property | Production | Test |
|----------|-----------|------|
| App ID / Workspace ID | `h5fxhzbb` | `a30t2fvp` |
| MCP server identifier | `user-intercom-production` | `user-intercom` |
| Help Center domain | `intercom.help/first-credit-union` | `intercom.help/first-credit-union-test` |
| AI Agent operator email | `operator+h5fxhzbb@intercom.io` | — |
| AI Agent name | Penny | — |

---

## MCP Tools Available

Both Intercom MCP servers expose the same set of tools:

| Tool | Description |
|------|-------------|
| `list_articles` | Paginated list of Help Center articles (page, per_page) |
| `get_article` | Full article content by ID |
| `create_article` | Create a new Help Center article |
| `update_article` | Update an existing article |
| `search_articles` | Search articles by keyword |
| `search` | Unified search across conversations and contacts (GROQ-like DSL) |
| `fetch` | Fetch a specific resource by prefixed ID or Intercom URL |
| `get_contact` | Get contact details by UUID |
| `search_contacts` | Search contacts |
| `get_conversation` | Get conversation details by ID |
| `search_conversations` | Search conversations |

### Search Query DSL

The `search` tool uses a token-based query language:

```
object_type:conversations state:open created_at:gt:2026-01-01
object_type:contacts email:contains:"@example.com"
```

Operators: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`, `contains`

---

## Intercom JavaScript SDK Reference

### Boot (anonymous visitor)

```ts
window.Intercom('boot', {
  app_id: 'h5fxhzbb',
  // Optional: custom_launcher_selector, hide_default_launcher, etc.
})
```

### Boot (identified user)

```ts
window.Intercom('boot', {
  app_id: 'h5fxhzbb',
  user_id: 'clerk_user_abc123',
  name: 'Jane Smith',
  email: 'jane@example.com',
  created_at: 1672531200, // Unix timestamp
  user_hash: 'hmac_sha256_hash', // For identity verification
})
```

### Update on route change

```ts
window.Intercom('update')
// Or with new page data:
window.Intercom('update', { current_page: '/loans/car' })
```

### Track custom events

```ts
window.Intercom('trackEvent', 'applied-for-loan', {
  loan_type: 'car',
  amount: 25000,
})
```

### Shutdown (on logout)

```ts
window.Intercom('shutdown')
```

---

## File Locations (Planned)

| File | Purpose |
|------|---------|
| `src/components/intercom-provider.tsx` | Client component — boots and manages Intercom lifecycle |
| `src/types/intercom.d.ts` | TypeScript declarations for `window.Intercom` |
| `.env.local` | `NEXT_PUBLIC_INTERCOM_APP_ID` environment variable |

---

## Useful Links

- [Intercom JavaScript SDK docs](https://developers.intercom.com/docs/build-an-integration/getting-started/install-intercom/web/)
- [Intercom Identity Verification](https://developers.intercom.com/docs/build-an-integration/getting-started/identity-verification/)
- [Intercom REST API reference](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/)
- [Intercom AI Agent content sources](https://www.intercom.com/help/en/articles/9350018-manage-your-ai-agent-s-knowledge)
