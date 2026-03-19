# Intercom Content Training Strategy — Sanity CMS Integration

> Research date: 20 March 2026
> Based on: Intercom official documentation, Sanity MCP audit, and codebase analysis.

---

## The Core Question

How does Penny (Fin AI Agent) learn content, and how should we feed it from a Sanity CMS-powered website?

---

## How Intercom's AI Agent Learns Content

Fin (Penny) draws from a **priority-ordered stack of knowledge sources**. It searches all enabled sources and synthesises answers, but some sources are faster and more reliable than others.

### Knowledge Source Hierarchy

| Source | Update Speed | Best For | Limits |
|--------|-------------|----------|--------|
| **Snippets** | Instant | Short facts, FAQs, contact details, one-off answers | No rich formatting |
| **Public articles** | Near-instant | Structured help content, guides, how-tos | Visible in Help Center |
| **Internal articles** | Near-instant | Agent-only knowledge, internal processes | Not visible to customers in Help Center |
| **Website sync** | Weekly | Broad website content, marketing pages, product pages | Public URLs only, max 100 sites |
| **External integrations** | Varies (weekly) | Zendesk, Notion, Confluence, Salesforce, etc. | Depends on integration |
| **Conversation history** | Ongoing | Learning from past resolved conversations | Must enable per-teammate |
| **Fin Guidance** | Instant | Behavioural rules, tone, escalation logic | Not content — it's instructions |

### Key Insight from Intercom

> **Native Intercom content (articles + snippets) updates near-instantly. External content (website sync) updates only weekly.**

This means relying solely on website sync creates a week-long delay between publishing content in Sanity and Penny being able to answer questions about it.

---

## Current State of Your Sanity CMS

### What exists today

Your Sanity project (`c8w93txa` / `production`) currently has **no page or content document types**. The schema consists entirely of:

- **Singletons**: `siteSettings`, `headerNavigation`, `designTokens`
- **Config types**: `componentConfig`, `designSystemUser`
- **Object types**: `link`, `navGroup`, `mainNavItem`, `seo`, `socialLink`, `address`, `dayHours`, `announcementBar`, `disputeResolutionScheme`

There are no blog posts, product pages, FAQ documents, or any customer-facing content schemas yet. The site is in early build phase — the design system and navigation are set up, but content types are still to come.

### What will exist

As the site is built out, you'll likely add document types for:

- Homepage / landing pages (page builder pattern)
- Loan products (car, personal, home, business)
- Account types (everyday, savings, term deposits)
- Fees and charges
- Branch locations
- Blog posts / articles / guides
- FAQs
- About / team pages

Each of these will become content that Penny needs to know about.

---

## Recommended Strategy: Three-Layer Approach

Rather than choosing one method, use all three in combination for maximum coverage and speed.

### Layer 1: Website Sync (Broad Coverage, Weekly Updates)

**What**: Point Intercom's website crawler at your new site's domain.

**How**: In Intercom dashboard → Fin AI Agent → Train → Content → Website sync → enter `https://www.firstcreditunion.co.nz`

**What it covers**: Every public page on the site — product pages, about pages, branch info, blog posts, calculators, everything the crawler can reach.

**Limitations**:
- Only updates weekly
- Can't access content behind login
- May not parse complex interactive components (calculators, forms) well
- Marketing-heavy pages with little substantive content add noise

**Best practices for crawling**:
- Use the top-level domain, not subpages
- In advanced settings, exclude irrelevant paths (e.g., `/studio/*`, `/component-design/*`, `/sitemap-viewer/*`)
- Review the crawled pages and deselect any that are purely decorative or navigational

**When to set up**: Once the site has real content pages deployed (not yet — the site is still in design system phase).

### Layer 2: Native Intercom Articles (High-Priority Content, Instant Updates)

**What**: Create structured articles in Intercom's Help Center for the most important, frequently-asked-about content.

**How**: Either manually in the Intercom dashboard, or programmatically via the MCP `create_article` tool.

**What it covers**: The content areas that drive the most customer questions:

| Priority | Content Area | Why |
|----------|-------------|-----|
| Critical | Loan products — rates, terms, eligibility, how to apply | Highest volume of customer questions |
| Critical | Account types — features, fees, how to open | Second highest volume |
| Critical | Fees and charges schedule | Customers always ask about fees |
| High | Online/mobile banking help — login, transfers, payments | Common support queries |
| High | Branch locations and hours | Frequent lookup queries |
| High | Contact information and escalation paths | Customers need to know how to reach a human |
| Medium | FAQs — general membership, joining, KYC requirements | Onboarding questions |
| Medium | Insurance products | Product queries |
| Low | About FCU / credit union history | Already exists in test workspace |

**Best practices for articles** (from Intercom's official guide):

1. **Use full sentences, not yes/no answers.** "You can apply for a car loan online at loans.firstcreditunion.co.nz" not just "Yes."
2. **Use headers (H1, H2, H3) liberally.** Fin scans headings to find relevant sections. Restate the topic in the paragraph below each heading.
3. **Use bulleted lists** for features, steps, and requirements. Fin performs better with structured lists than dense paragraphs.
4. **Don't ask Fin to do math.** For loan calculations, provide example scenarios with worked-out numbers rather than expecting Fin to calculate.
5. **Include contact details explicitly.** "Contact our Lending team: 0800 429 000" — clearly labelled per department.
6. **Explain acronyms.** "FSP (Financial Service Provider)" — even if your audience likely knows them.
7. **Identify the target user.** "If you're an existing member..." vs "If you're looking to join..." — helps Fin serve the right answer to the right person.
8. **Use FAQ articles for small facts.** Group related small questions into a single FAQ article rather than leaving them undocumented.

### Layer 3: Snippets (Quick Facts, Instant Updates)

**What**: Short pieces of information that don't warrant a full article.

**How**: Create in Intercom dashboard → Knowledge → Snippets, or via API.

**What it covers**: Quick-reference facts like:

- Current interest rates (e.g., "Car loan rates start from 10.95% p.a.")
- Opening hours summary
- Phone numbers and email addresses
- Membership eligibility one-liners
- Promotional offers with expiry dates

**Why snippets matter**: They're the fastest way to get information into Penny. When a rate changes or a promotion launches, updating a snippet makes it available to Penny immediately — no waiting for a weekly crawl.

---

## The Sanity → Intercom Content Pipeline

As you build content in Sanity, here's how each content type should flow to Intercom:

```
┌─────────────────────────────────────────────────────────────┐
│                     Sanity CMS                              │
│                                                             │
│  Page types          Product types        FAQ/Guide types   │
│  (homepage,          (loans, accounts,    (blog posts,      │
│   landing pages)      insurance)           FAQs, guides)    │
│                                                             │
└──────────┬──────────────────┬──────────────────┬────────────┘
           │                  │                  │
           ▼                  ▼                  ▼
┌──────────────────┐ ┌────────────────┐ ┌────────────────────┐
│  Website Sync    │ │  Intercom      │ │  Intercom          │
│  (weekly crawl)  │ │  Articles      │ │  Articles          │
│                  │ │  (manual or    │ │  (manual or        │
│  Covers all      │ │   MCP push)   │ │   MCP push)        │
│  public pages    │ │               │ │                    │
│  automatically   │ │  High-priority │ │  Structured help   │
│                  │ │  product info  │ │  content           │
└──────────────────┘ └────────────────┘ └────────────────────┘
           │                  │                  │
           └──────────────────┴──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   Penny (Fin)    │
                    │   AI Agent       │
                    │                  │
                    │   Synthesises    │
                    │   answers from   │
                    │   all sources    │
                    └──────────────────┘
```

### Option A: Manual Article Creation (Simplest)

As you build each Sanity page, manually create a corresponding Intercom article covering the same content in a Fin-optimised format. This is the approach Intercom recommends for best results.

**Pros**: Full control over how content is structured for AI consumption. Instant updates.
**Cons**: Manual effort. Content can drift if Sanity content changes and the article isn't updated.

### Option B: MCP-Powered Article Push (Semi-Automated)

Use the Intercom MCP `create_article` and `update_article` tools to push content from Sanity to Intercom programmatically. I can do this for you as you build pages — extract the key content from a Sanity document and create a well-structured Intercom article from it.

**Pros**: Faster than manual. Content stays closer to Sanity source.
**Cons**: Still requires a trigger (you ask me to sync, or we build a workflow). Content needs reformatting for Fin optimisation.

### Option C: Automated Webhook Pipeline (Most Sophisticated)

Build a Sanity webhook that fires on document publish → hits a Next.js API route → calls the Intercom API to create/update articles automatically.

**Pros**: Fully automated. Content stays in sync.
**Cons**: Significant engineering effort. Needs content transformation logic. Overkill until you have many content types and frequent updates.

### Recommended Approach

**Start with Option A + Website Sync.** As you build pages in Sanity, I'll help you create corresponding Intercom articles via MCP (Option B) when you're ready. Website sync provides the safety net of broad coverage. Option C can be considered later when the content volume justifies the engineering investment.

---

## Fin Guidance (Behavioural Rules)

Separate from content, you should configure **Fin Guidance** to control how Penny behaves. This is done in the Intercom dashboard and tells Penny how to act, not what to know.

Recommended guidance for FCU:

| Guidance | Purpose |
|----------|---------|
| "You are Penny, the AI assistant for First Credit Union, a member-owned credit union based in Hamilton, New Zealand." | Identity and context |
| "Always refer members to firstcreditunion.co.nz for online applications. Never provide specific loan approval decisions." | Boundaries |
| "If a customer asks about their specific account balance, transactions, or personal loan details, explain that you can't access account information and offer to connect them with a team member." | Privacy/security |
| "When discussing interest rates, always mention that rates are subject to change and direct customers to the website for current rates." | Compliance |
| "Use New Zealand English spelling (e.g., 'organisation' not 'organization')." | Tone/locale |
| "If you're unsure about an answer, say so honestly and offer to connect the customer with a human team member rather than guessing." | Accuracy |

---

## Implementation Timeline

| When | Action | Who |
|------|--------|-----|
| Now | Phase 1 complete — messenger widget is live | Done |
| As pages are built | Create Intercom articles for each major content area | You + me (via MCP) |
| As pages are built | Create snippets for quick facts (rates, hours, contacts) | You (Intercom dashboard) |
| When site has real content | Set up website sync pointing at the new domain | You (Intercom dashboard) |
| When site has real content | Configure Fin Guidance rules | You (Intercom dashboard) |
| Post-launch | Use Intercom's Optimize dashboard to find content gaps | You (Intercom dashboard) |
| Post-launch (optional) | Build automated Sanity → Intercom webhook pipeline | Engineering task |

---

## What NOT to Do

1. **Don't rely solely on website sync.** The weekly update delay means Penny will serve stale answers for up to 7 days after content changes.
2. **Don't duplicate marketing copy as articles.** Intercom articles should be structured for support, not sales. Rewrite marketing content into clear, question-answering format.
3. **Don't create articles for content that doesn't exist yet.** Wait until the Sanity pages are built and the content is finalised.
4. **Don't skip Fin Guidance.** Without behavioural rules, Penny may make promises FCU can't keep (e.g., quoting specific rates as guaranteed).
5. **Don't forget compliance.** Financial services content needs disclaimers. Include them in articles where relevant.
