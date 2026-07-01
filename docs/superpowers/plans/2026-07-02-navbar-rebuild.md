# Navbar Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the marketing header pixel-perfect to the Figma "Navbar" design (file `lDlXQhpLRP9GnRLeM31Iec`), fully powered by the existing `headerNavigation` Sanity singleton, with **click-only** panel open/close.

**Architecture:** Server component (`header.tsx`) fetches `HEADER_NAVIGATION_QUERY` + `SITE_SETTINGS_QUERY` and passes to a new client shell in `src/components/header/`. The shell owns open-state (click-toggle, Esc, click-away, one-panel-at-a-time) and composes small presentational units: `AnnouncementBar`, `NavTopItem`, `MegaPanel` (intro card / link columns / featured card / campaign strip), `MenuLink`, `MobileMenu`. Old `src/components/header-client.tsx` stays untouched until the swap task is approved.

**Tech Stack:** Next 16 App Router · React 19 · Tailwind v4 + FCU tokens (globals.css) · Base UI `Button` (`@/components/ui/button`) · lucide-react v1 · motion · next-sanity `sanityFetch`.

**HARD RULE (user):** First-level items open/close the panel on **CLICK only**. Hover may restyle (grey pill) but must NEVER open/close. Esc / click-away / click-again close. One panel open at a time.

**Fidelity sources:** memory `design-system-fidelity` applies. Verify against Figma node `259:166` (composite) + component nodes `258:96` (bar), `256:42` (top item), `256:67` (menu link), `259:44` (panel), `259:327` (mobile). All values below were extracted from Figma MCP `get_design_context`/`get_variable_defs` on 2026-07-02 and map 1:1 to existing tokens in `src/app/globals.css`.

---

## Locked design values (Figma → FCU tokens)

| Element | Spec |
|---|---|
| Announcement bar | bg `fcu-primary-900`, px-24 py-10px, text 13px Poppins white; "Learn more" underlined medium; dismiss ✕ right (14px) |
| Nav row | h-64px, px-32px, gap-4px, bg `--card` (white), border-b `--border`; Glass variant = 50–60% white + `backdrop-blur-[8px]` |
| Wordmark slot | Poppins SemiBold 17px, tracking −0.17px, color `--primary` (site uses logo image — see Q2) |
| Top item | h-40px px-12px gap-6px rounded `--radius-lg`(10); label 14px Poppins Medium `--foreground`; caret 14px. States: hover→bg `--surface-sunken`; open→border `--border-strong` + caret rotate-180. Plain link (no megaMenu) = no caret |
| Log in | ghost button h-40 px-16 rounded `--radius-xl`(14), 14px Medium `--foreground-muted`, tracking −0.07px |
| Become a member | bg `fcu-secondary-500` text `fcu-secondary-950`, h-40 px-16 rounded `--radius-xl`, 14px Medium (Button `variant=secondary`) |
| Panel sheet | w-1200 centered flush under bar; bg `--popover`, border `--border`, rounded-b-[18px], pt-28 px-28 pb-24, gap-20; shadow `0 4px 8px -2px #0B181C0F, 0 12px 24px -4px #0B181C14` (=DS Shadow/lg) |
| Columns row | flex gap-24; hairlines = w-px self-stretch bg `--border` between every section |
| Intro card | w-250 self-stretch bg `--surface-muted` p-20 rounded-lg gap-8; 64px circle bg `--primary-subtle` with 24px glyph in `--primary`; title 17px SemiBold; blurb 13px leading-1.5 `--foreground-muted` |
| Column eyebrow | Geist Mono Regular 10.5px tracking +0.63px `--foreground-subtle` UPPERCASE; column = flex-1 flex-col gap-6 |
| Menu link | p-10 gap-12 rounded-lg w-full; hover bg `--surface-muted`; icon chip 36px rounded-md bg `--primary-subtle` w/ 18px lucide icon in `--primary`; label 14px SemiBold; NEW pill = bg `--primary` px-6 py-2 rounded-full, 9px Geist Mono Medium tracking +0.54 white; desc 12.5px leading-[1.45] `--foreground-muted` |
| Featured card (rate) | w-250 self-stretch bg `--primary-subtle` p-20 rounded-lg gap-6; eyebrow mono 10.5; value Geist Mono SemiBold 28px tracking −0.56 `--primary`; label 14px Medium; 4px spacer; link 13px `--primary` "… →" |
| Campaign strip | w-full bg `--surface-muted` px-16 py-12 rounded-md gap-10; NEW pill (as above); text 13px `--foreground-muted` flex-1; link 13px SemiBold `--primary` |
| Mobile | full-screen takeover: top row (wordmark + ✕ 36px), accordion rows 58px (label 18-ish Medium, caret), expanded rows reuse MenuLink (icon chips, badges); pinned bottom: `Log in` (outline, full-width) + `Become a member` (secondary, full-width) |
| Scrolled (variant 2.3) | row 52px, buttons size sm (32px), Shadow/sm, announcement collapsed |
| Fonts | Poppins = `font-sans` (default), Geist Mono = `font-mono` — both already loaded in `src/app/layout.tsx` |

**Decisions locked with Isaac (2026-07-02):** Q1 active-page indicator = **underline (2.2a)** — 2.5px `--primary` bar inside the item, `usePathname()` prefix match. Q2 wordmark slot = **real FCU logo image** (`/fcu-logo.png`, sized to the 64px bar; Figma's text wordmark was a placeholder). Execution = inline, batched, checkpoint at Task 7 fidelity gate.

**Icon registry (schema `link.icon` → lucide, canonical v1 names):** credit-card→`CreditCard`, globe→`Globe`, send→`Send`, wallet→`Wallet`, file-text→`FileText`, home→`House` (canonical; `Home` is a deprecated alias), calculator→`Calculator`, percent→`Percent`, shield→`Shield`, help-circle→`CircleQuestionMark` (canonical; `HelpCircle` deprecated), phone→`Phone`, map-pin→`MapPin`, trending-up→`TrendingUp`. **Unknown-name fallback: `Circle`** (honest neutral; never collides with a real mapping).

**Data mapping:** `mainNav[]` item + `megaMenu[]` groups → columns (group.title = eyebrow); `introCard`/`featuredCard`/`campaignStrip` → panel slots (each optional — omit slot + its hairline when absent); `utilityNav.secondaryAction`→Log in, `primaryAction`→Become a member, `showSearch`→⌘K trigger; announcement bar from `siteSettings.announcementBar` — **gate render on `enabled === true`, show ✕ only when `dismissible`; `style` field is intentionally ignored** (single Figma brand-900 treatment; document for marketing in Studio description later). **`headerStyle` mapping (schema values are `transparent|solid|sticky`, initial `sticky` — there is no "glass" value):** `transparent` → Glass treatment (60% white + `backdrop-blur-[8px]`); `solid` and `sticky` → Solid white. Header is **always sticky-positioned** regardless (matches current behavior + Figma note "Constant on scroll"). Flag this mapping to Isaac at the Task 7 checkpoint. Legacy `navGroup.isFeatured`/`featuredPosition`: **ignored for layout** in the new design (data preserved; columns render uniformly). `introCard.icon` (free-text) + `featuredCard.link.icon`: if the string matches a registry name → 18/24px lucide icon; otherwise render the literal string as a text glyph (covers Figma's ☂-style glyphs).

---

## File structure

- Create `src/components/header/nav-icons.ts` — icon registry + `getHref`/`isExternalLink` helpers (pure, unit-tested)
- Create `src/components/header/announcement-bar.tsx` — dismissible brand bar (client, sessionStorage dismiss)
- Create `src/components/header/nav-top-item.tsx` — 3-state trigger (button) / plain link
- Create `src/components/header/menu-link.tsx` — icon-chip link row (+NEW pill)
- Create `src/components/header/mega-panel.tsx` — the 1200px sheet
- Create `src/components/header/mobile-menu.tsx` — full-screen takeover
- Create `src/components/header/header-client.tsx` — client shell (state + bar + composition)
- Modify `src/components/header.tsx` — also fetch `SITE_SETTINGS_QUERY`; **swap import only in Task 8 (approval-gated)**
- Test `src/components/header/nav-icons.test.ts` (co-located, repo convention; behavioral coverage lives in the Task 7 Playwright probe since vitest is node-env)
- Old `src/components/header-client.tsx` deleted only after Isaac approves the swap.

## Verification gate (every task)
`npx tsc --noEmit` exit 0 · `npm run lint` exit 0 · `npm test` green. UI tasks additionally: Playwright computed-style probe + screenshot vs the Figma node (`.agents/` probe pattern; AV blocks the preview browser — use repo Playwright). Commit per task on branch `feat/navbar-rebuild` (never commit `.agents/`).

---

### Task 1: Branch + icon registry + helpers (pure logic, TDD)
**Files:** Create `src/components/header/nav-icons.ts`, `src/components/header/nav-icons.test.ts` (co-located, repo convention)
- [ ] Pre-flight: `git checkout -- schema.json src/sanity/types.ts` (CRLF-only typegen noise — verified `git diff -w` empty; must not ride into commits), then `git fetch` + `git checkout -b feat/navbar-rebuild` from `main`
- [ ] Write failing tests: registry resolves all 13 schema icon names to components (canonical lucide names per Locked values); unknown/missing name → **`Circle`** fallback; `getHref` internal/external/null; `isExternalLink` truthiness incl. `openInNewTab`
- [ ] Run `npm test` → new tests FAIL
- [ ] Implement `nav-icons.ts` (map + helpers, moved from old header-client)
- [ ] `npm test` → PASS · tsc · lint
- [ ] Commit `feat(navbar): icon registry + link helpers`

### Task 2: MenuLink + NavTopItem (presentational)
**Files:** Create `menu-link.tsx`, `nav-top-item.tsx`
- [ ] `MenuLink({link, onNavigate})`: Link/a wrapper per `linkType`; layout per locked spec (chip 36/icon 18/label row + badge pill/desc); hover `bg-surface-muted`; render `badge` text verbatim (uppercase via CSS)
- [ ] `NavTopItem`: if `hasPanel` → `<button aria-expanded aria-haspopup onClick>` w/ caret (ChevronDown 14px, `rotate-180` when open, `transition-transform`); open→`border border-border-strong`, hover(only visual)→`hover:bg-surface-sunken`; else plain `<Link>` no caret. **No mouseenter/mouseleave handlers on the panel logic — click only.**
- [ ] tsc · lint · commit `feat(navbar): MenuLink + NavTopItem per Figma spec`

### Task 3: MegaPanel
**Files:** Create `mega-panel.tsx`
- [ ] Sheet: `mx-auto w-full max-w-[1200px] rounded-b-2xl border border-t-0 border-border bg-popover pt-7 px-7 pb-6 flex flex-col gap-5 shadow-[var(--shadow-lg)]` — **DS tokens, not hardcoded values**: `--radius-2xl` = 18px and `--shadow-lg` = the exact Figma Shadow/lg (verified in globals.css); per design-system-fidelity, never inline the raw shadow/radius
- [ ] Columns row `flex gap-6` with `<Hairline/>` (`w-px self-stretch bg-border`) between all rendered sections; intro card (glyph circle/title/blurb) when `introCard`; one column per `megaMenu` group (eyebrow = `font-mono text-[10.5px] tracking-[0.63px] uppercase text-foreground-subtle`, then MenuLinks); featured card when `featuredCard` (image variant if `image` set, else rate layout); campaign strip when `campaignStrip`
- [ ] tsc · lint · commit `feat(navbar): MegaPanel (intro/columns/featured/campaign)`

### Task 4: AnnouncementBar (standalone — NO header.tsx change)
**Files:** Create `announcement-bar.tsx` ONLY. **Do not touch `src/components/header.tsx`** — it renders the live site on every page; passing an extra prop to the old client is a tsc excess-prop error and violates the no-live-changes-before-gate promise. All header.tsx changes happen in Task 8.
- [ ] `AnnouncementBar({announcement})`: render only when `announcement?.enabled === true`; brand-900 bar per spec; link from fields; ✕ only when `dismissible === true`; sessionStorage key **suffixed with the message text** (`fcu-announcement-dismissed:${message}`) so a new announcement re-appears; hidden until mounted (hydration flash); `style` field intentionally unused (Figma single treatment)
- [ ] tsc · lint · vitest · commit `feat(navbar): AnnouncementBar`

### Task 5: HeaderClient shell (desktop bar + click interaction + scrolled state)
**Files:** Create `src/components/header/header-client.tsx`
- [ ] Bar per spec (h-16 → `h-[64px]`, px-8 → `px-[32px]`, gap-1); wordmark slot (Q2); items map → NavTopItem; spacer `flex-1`; SiteSearch (`showSearch`); Log in = `Button variant=ghost size=default render={<a/>}` (muted label); Become a member = `Button variant=secondary size=default render={<Link/>}`
- [ ] State: port click-toggle/Esc/click-away/body-lock from old header-client **unchanged in behavior**; panel renders in `AnimatePresence` flush under bar (`absolute inset-x-0 top-full`), spring like existing
- [ ] Scrolled state: `useEffect` scroll listener → row `h-[52px]`, buttons `size=sm`, `shadow-[var(--shadow-sm)]` (DS token, not Tailwind default — probe must confirm), announcement collapses (`max-h` transition)
- [ ] Active-page indicator (Q1 choice) via `usePathname()` prefix match
- [ ] Glass/solid from `siteSettings.headerStyle`
- [ ] tsc · lint · commit `feat(navbar): new HeaderClient — bar, click-only panels, scrolled state`

### Task 6: MobileMenu
**Files:** Create `mobile-menu.tsx`
- [ ] Full-screen takeover (`fixed inset-0 z-50 bg-background overflow-y-auto`, body scroll-lock): top row wordmark + ✕ (36px, `surface-sunken` circle); accordion rows (click-toggle, 58px, chevron rotate); expanded = MenuLinks; pinned bottom CTAs (outline Log in / secondary Join, full width); `role=dialog aria-modal`
- [ ] tsc · lint · commit `feat(navbar): mobile full-screen menu`

### Task 7: Visual + behavioral verification loop (fidelity gate — before swap)
- [ ] Temp preview route `src/app/nav-preview/page.tsx` — **at app root, OUTSIDE the `(frontend)` group**, because `(frontend)/layout.tsx` renders the old live `<Header/>` and the preview would show two headers, breaking probes/screenshots (root layout renders only fonts/providers — verified). NOT underscore-prefixed (`_` folders are unroutable private folders). `metadata = { robots: { index: false } }`; the route does its **own** `sanityFetch` of `HEADER_NAVIGATION_QUERY` + `SITE_SETTINGS_QUERY` and renders the NEW header client (old header untouched, still live site-wide)
- [ ] `npm run build` + `next start -p 3300`; Playwright probe: computed styles of bar h/px, item h/px/radius/colors (hover, open), panel w/radius/shadow (must equal `--shadow-lg`, not a Tailwind default)/paddings, chip size, eyebrow font; screenshots desktop 1440 (closed, open, scrolled) + mobile 390 (closed, open, expanded)
- [ ] **Behavioral probe — the HARD RULE, automated:** hover a top item ≥600ms → panel does NOT open; click → opens (`aria-expanded=true`); click again → closes; reopen, `Esc` → closes; reopen, click page body → closes; open item A then click item B → A closes, B opens (exactly one panel). All six assertions must pass.
- [ ] Compare vs Figma screenshots (nodes `259:166`, `258:96`, `259:327`); fix diffs; re-probe until match
- [ ] **Show Isaac before/after screenshots (+ flag the headerStyle mapping) → approval gate**
- [ ] Commit `test(navbar): fidelity + behavior probes + preview route`

### Task 8: Swap + cleanup + content (approval-gated)
- [ ] On approval: rewrite `src/components/header.tsx` — add `sanityFetch({query: SITE_SETTINGS_QUERY, stega: false})` alongside the nav fetch and import the new `header/header-client` (this is the FIRST live-site change of the whole plan); delete old `src/components/header-client.tsx` + `nav-preview` route; full gate (tsc/lint/vitest/build + spot-check `/`)
- [ ] Seed `drafts.headerNavigation` with Figma IA content (Everyday/Borrow/Save & Invest/Help/About + icons/badges/intro/featured/strip) — **ask Isaac first** (writes to CMS; draft-only so marketing can review/publish)
- [ ] Commit `feat(navbar): swap to rebuilt header` · ff-merge → main · push (gh: firstcreditunion) · update memory `navbar-rebuild`
