# First Credit Union — Design Guidelines Research

> A comprehensive research document covering **every section, subsection, and detail** that should be included in the FCU design guidelines page. This serves as the blueprint before any code is written.

---

## Table of Contents

1. [Brand Identity](#1-brand-identity)
2. [Design Tokens / Foundations](#2-design-tokens--foundations)
3. [Typography](#3-typography)
4. [Colour System](#4-colour-system)
5. [Spacing & Layout](#5-spacing--layout)
6. [Elevation & Shadows](#6-elevation--shadows)
7. [Border & Radius](#7-border--radius)
8. [Iconography](#8-iconography)
9. [Imagery & Photography](#9-imagery--photography)
10. [Motion & Animation](#10-motion--animation)
11. [Accessibility](#11-accessibility)
12. [Voice & Tone](#12-voice--tone)
13. [Components](#13-components)
14. [Patterns & Templates](#14-patterns--templates)
15. [States & Feedback](#15-states--feedback)
16. [Dark Mode](#16-dark-mode)
17. [Financial Services Considerations](#17-financial-services-considerations)

---

## 1. Brand Identity

### 1.1 Logo

- **Primary logo** — Full colour version on light backgrounds
- **Reversed logo** — White/light version on dark backgrounds
- **Monochrome logo** — Single colour for limited colour contexts
- **Logo mark / icon** — Standalone icon without wordmark (e.g. for favicon, app icon)
- **Clear space** — Minimum exclusion zone around the logo (typically equal to the height of the logo "x-height" or a specific measurement on all sides)
- **Minimum size** — Smallest permissible dimensions for print and digital
- **Do's and Don'ts** — Visual examples of correct vs incorrect usage:
  - Don't stretch, rotate, or skew
  - Don't change colours
  - Don't place on busy backgrounds without sufficient contrast
  - Don't add effects (drop shadows, outlines, gradients)
  - Don't crop or rearrange elements
- **Co-branding** — Rules for when the FCU logo appears alongside partner logos
- **Favicon & app icons** — Specifications for 16×16, 32×32, 180×180 (Apple touch), 192×192 and 512×512 (PWA manifest)

### 1.2 Brand Marks & Supporting Graphics

- Tagline or strapline usage
- Patterns or textures (if any)
- Decorative/graphic devices (lines, shapes, etc.)

---

## 2. Design Tokens / Foundations

Design tokens are the smallest, most primitive values in the system. They bridge design and code.

### 2.1 Token Architecture

Three layers of tokens to document:


| Layer                  | Purpose               | Example                                |
| ---------------------- | --------------------- | -------------------------------------- |
| **Primitive / Global** | Raw values            | `blue-500: oklch(70.61% 0.128 219.78)` |
| **Semantic / Alias**   | Meaning-based mapping | `color-primary: blue-500`              |
| **Component**          | Scoped to a component | `button-bg: color-primary`             |


### 2.2 Token Categories to Document

- Colour tokens
- Typography tokens (font family, size, weight, line-height, letter-spacing)
- Spacing tokens (padding, margin, gap)
- Border radius tokens
- Shadow / elevation tokens
- Opacity tokens
- Z-index tokens
- Breakpoint tokens
- Transition / duration tokens
- Font tokens

### 2.3 Naming Convention

Establish and document the naming pattern. FCU currently uses:

- `--color-fcu-primary-{shade}` / `--color-fcu-secondary-{shade}`
- Tailwind utility format: `bg-fcu-primary-500`, `text-fcu-secondary-700`

---

## 3. Typography

### 3.1 Typeface


| Property             | Value                                                        |
| -------------------- | ------------------------------------------------------------ |
| **Font Family**      | Poppins                                                      |
| **Source**           | Google Fonts via `next/font/google` (self-hosted by Next.js) |
| **Fallback Stack**   | `'Poppins', ui-sans-serif, system-ui, sans-serif`            |
| **Display Strategy** | `swap` (renders fallback, swaps when loaded)                 |
| **Subsets**          | `latin`                                                      |
| **Classification**   | Geometric sans-serif with rounded terminals                  |


### 3.2 Font Weights

Document each weight with its name and intended use:


| Weight | Name        | Usage                                |
| ------ | ----------- | ------------------------------------ |
| 100    | Thin        | Decorative / large display text only |
| 200    | Extra Light | Large headings, stylistic use        |
| 300    | Light       | Subheadings, secondary text          |
| 400    | Regular     | Body text, default                   |
| 500    | Medium      | Emphasis, UI labels, navigation      |
| 600    | Semi Bold   | Buttons, headings, strong emphasis   |
| 700    | Bold        | Primary headings, CTAs               |
| 800    | Extra Bold  | Hero headings, large display         |
| 900    | Black       | Maximum impact, headlines            |


### 3.3 Type Scale

Document a complete type scale. Recommended approach: use a modular scale (e.g. 1.250 Major Third) or a custom scale.

Each level should specify:


| Property                 | What to Document                                       |
| ------------------------ | ------------------------------------------------------ |
| **Size**                 | `font-size` in `rem` (and px equivalent for reference) |
| **Weight**               | Default weight for that level                          |
| **Line Height**          | Leading / `line-height`                                |
| **Letter Spacing**       | `letter-spacing` / tracking                            |
| **Responsive Behaviour** | Does it scale down on mobile? Fluid? Stepped?          |


Levels to define:

- **Display / Hero** — Largest, for hero sections
- **H1** — Page title
- **H2** — Section heading
- **H3** — Subsection heading
- **H4** — Card title, feature heading
- **H5** — Small heading
- **H6** — Overline, eyebrow text
- **Body Large** — Lead paragraphs, introductions
- **Body** — Default paragraph text
- **Body Small** — Secondary body, descriptions
- **Caption** — Image captions, metadata
- **Overline** — Category labels, small uppercase text
- **Label** — Form labels, button text
- **Helper** — Form helper text, footnotes

### 3.4 Text Styling Rules

- Maximum line length (measure) — typically 60–80 characters
- Paragraph spacing
- List styling (bullet and numbered)
- Link styling within text (underlined? colour? hover state?)
- Text alignment rules (left-aligned for body, centred only for short hero text)
- Truncation and overflow rules (ellipsis, line clamping)

### 3.5 Responsive Typography

- Define whether fluid typography is used (`clamp()`) or stepped breakpoints
- Minimum and maximum font sizes at each breakpoint
- How line-height adjusts with size

---

## 4. Colour System

### 4.1 Brand Palette

**FCU Primary — Blue** (11 shades, 50–950)


| Shade | OKLCH                        | Approx. Hex | Usage                             |
| ----- | ---------------------------- | ----------- | --------------------------------- |
| 50    | `oklch(97.42% 0.016 226.9)`  | —           | Lightest tint, subtle backgrounds |
| 100   | `oklch(93.67% 0.039 227.71)` | —           | Light backgrounds                 |
| 200   | `oklch(88.28% 0.077 224.69)` | —           | Borders, dividers                 |
| 300   | `oklch(81.7% 0.132 221.14)`  | —           | Hover backgrounds                 |
| 400   | `oklch(75.6% 0.138 220.17)`  | —           | Active/interactive                |
| 500   | `oklch(70.61% 0.128 219.78)` | —           | **Base brand blue**               |
| 600   | `oklch(64.66% 0.117 219.68)` | —           | Hover on primary                  |
| 700   | `oklch(59.5% 0.108 219.87)`  | —           | Strong emphasis                   |
| 800   | `oklch(53.58% 0.097 219.61)` | —           | Dark surfaces                     |
| 900   | `oklch(47.85% 0.087 220.03)` | —           | Text on light bg                  |
| 950   | `oklch(30.48% 0.056 221.59)` | —           | Near-black                        |


**FCU Secondary — Green/Yellow** (11 shades, 50–950)


| Shade | OKLCH                        | Approx. Hex | Usage                |
| ----- | ---------------------------- | ----------- | -------------------- |
| 50    | `oklch(96.56% 0.206 109.7)`  | —           | Lightest tint        |
| 100   | `oklch(95.11% 0.203 109.7)`  | —           | Light backgrounds    |
| 200   | `oklch(89.87% 0.192 109.7)`  | —           | Borders, dividers    |
| 300   | `oklch(85.44% 0.182 109.7)`  | —           | Hover backgrounds    |
| 400   | `oklch(81.26% 0.173 109.7)`  | —           | Active/interactive   |
| 500   | `oklch(76.71% 0.164 109.7)`  | —           | **Base brand green** |
| 600   | `oklch(64.23% 0.137 109.7)`  | —           | Hover on secondary   |
| 700   | `oklch(51.45% 0.11 109.7)`   | —           | Strong emphasis      |
| 800   | `oklch(38.54% 0.082 109.7)`  | —           | Dark surfaces        |
| 900   | `oklch(26.41% 0.056 109.7)`  | —           | Text on light bg     |
| 950   | `oklch(19.81% 0.043 109.76)` | —           | Near-black           |


### 4.2 Semantic / Functional Colours

Beyond brand colours, document purpose-based colours:


| Token                  | Purpose            | Example Usage               |
| ---------------------- | ------------------ | --------------------------- |
| `background`           | Page background    | Main content area           |
| `foreground`           | Default text       | Body copy                   |
| `primary`              | Primary actions    | Buttons, links              |
| `primary-foreground`   | Text on primary    | Button label                |
| `secondary`            | Secondary actions  | Secondary buttons           |
| `secondary-foreground` | Text on secondary  | Secondary button label      |
| `muted`                | Subdued elements   | Disabled backgrounds        |
| `muted-foreground`     | Subdued text       | Placeholder, captions       |
| `accent`               | Highlights         | Tags, badges                |
| `accent-foreground`    | Text on accent     | Badge label                 |
| `destructive`          | Danger / errors    | Delete button, error states |
| `border`               | Default borders    | Card outlines, dividers     |
| `input`                | Form input borders | Text fields                 |
| `ring`                 | Focus ring         | Keyboard focus indicator    |


### 4.3 Feedback / Status Colours


| Status                  | Colour       | Usage                                  |
| ----------------------- | ------------ | -------------------------------------- |
| **Success**             | Green        | Form success, confirmations            |
| **Warning**             | Amber/Yellow | Alerts, caution messages               |
| **Error / Destructive** | Red          | Validation errors, destructive actions |
| **Info**                | Blue         | Informational banners, tooltips        |


### 4.4 Chart / Data Visualisation Colours

Document the 5 chart colours already defined (`chart-1` through `chart-5`) plus guidance on when to use each.

### 4.5 Colour Usage Rules

- Never use colour alone to convey meaning (accessibility)
- Minimum contrast ratios (AA: 4.5:1 text, 3:1 large text / UI)
- Approved colour pairings (which backgrounds pair with which text colours)
- Gradient rules (if any gradients are used)
- Overlay/scrim colours for modals, image overlays

### 4.6 Colour Accessibility Matrix

Show a grid of every text/background combination with its contrast ratio and pass/fail status for WCAG AA and AAA.

---

## 5. Spacing & Layout

### 5.1 Base Unit

Define the base spacing unit (commonly 4px or 8px). All spacing should be multiples of this.

### 5.2 Spacing Scale


| Token       | Value | Usage                    |
| ----------- | ----- | ------------------------ |
| `space-0`   | 0px   | —                        |
| `space-0.5` | 2px   | Hairline gaps            |
| `space-1`   | 4px   | Tight inner padding      |
| `space-2`   | 8px   | Small padding, icon gaps |
| `space-3`   | 12px  | Compact padding          |
| `space-4`   | 16px  | Default padding          |
| `space-5`   | 20px  | —                        |
| `space-6`   | 24px  | Card padding             |
| `space-8`   | 32px  | Section gaps             |
| `space-10`  | 40px  | —                        |
| `space-12`  | 48px  | Large gaps               |
| `space-16`  | 64px  | Section spacing          |
| `space-20`  | 80px  | Page-level spacing       |
| `space-24`  | 96px  | Hero/major sections      |


### 5.3 Grid System


| Property      | Value                                                |
| ------------- | ---------------------------------------------------- |
| **Columns**   | 12-column grid                                       |
| **Gutter**    | 16px (mobile), 24px (tablet), 32px (desktop)         |
| **Margin**    | 16px (mobile), 32px (tablet), auto-centred (desktop) |
| **Max Width** | Container max-width (e.g. 1280px, 1440px)            |


### 5.4 Responsive Breakpoints


| Breakpoint | Min Width | Columns | Typical Use    |
| ---------- | --------- | ------- | -------------- |
| `xs`       | 0px       | 4       | Small phones   |
| `sm`       | 640px     | 8       | Large phones   |
| `md`       | 768px     | 8       | Tablets        |
| `lg`       | 1024px    | 12      | Small desktops |
| `xl`       | 1280px    | 12      | Desktops       |
| `2xl`      | 1536px    | 12      | Large screens  |


### 5.5 Container Widths

Define named container sizes:

- `prose` — Narrow, for reading (65ch / ~720px)
- `default` — Standard content (1280px)
- `wide` — Extended (1440px)
- `full` — Edge-to-edge

### 5.6 Layout Patterns

Document common page layouts:

- Single column (articles, forms)
- Two-column (sidebar + content)
- Three-column (dashboard)
- Asymmetric (hero with offset content)
- Bento grid

---

## 6. Elevation & Shadows

### 6.1 Elevation Levels


| Level | Shadow Value  | Usage                              |
| ----- | ------------- | ---------------------------------- |
| 0     | None          | Flat, inline elements              |
| 1     | Small, subtle | Cards, raised surfaces             |
| 2     | Medium        | Dropdowns, floating cards on hover |
| 3     | Large         | Popovers, tooltips                 |
| 4     | X-Large       | Modals, dialogs                    |
| 5     | XX-Large      | Toast notifications (top layer)    |


### 6.2 Shadow Principles

- Use layered/composite shadows (2–3 layers) for natural appearance
- Consistent light source direction (top-left or top-centre)
- Neutral colour (black with low opacity), not coloured shadows
- Higher elevation = larger blur + greater offset + slightly more opacity
- Dark mode shadows need higher opacity or use lighter surface colours instead

### 6.3 Interactive Elevation

- Cards: rest at level 1, hover to level 2
- Buttons: rest at level 1, active/pressed to level 0
- FAB / floating actions: level 3
- Transitions: 150–200ms ease

---

## 7. Border & Radius

### 7.1 Border Radius Scale


| Token         | Value                        | Usage                   |
| ------------- | ---------------------------- | ----------------------- |
| `radius-none` | 0px                          | Sharp corners           |
| `radius-sm`   | `calc(var(--radius) - 4px)`  | Small elements, tags    |
| `radius-md`   | `calc(var(--radius) - 2px)`  | Inputs, small cards     |
| `radius-lg`   | `var(--radius)` (0.625rem)   | Default cards, buttons  |
| `radius-xl`   | `calc(var(--radius) + 4px)`  | Large cards             |
| `radius-2xl`  | `calc(var(--radius) + 8px)`  | Modals                  |
| `radius-3xl`  | `calc(var(--radius) + 12px)` | Large surfaces          |
| `radius-4xl`  | `calc(var(--radius) + 16px)` | Hero sections           |
| `radius-full` | 9999px                       | Pills, circular avatars |


### 7.2 Border Widths


| Token      | Value | Usage                 |
| ---------- | ----- | --------------------- |
| `border-0` | 0px   | No border             |
| `border-1` | 1px   | Default borders       |
| `border-2` | 2px   | Emphasis, focus rings |
| `border-4` | 4px   | Heavy accent borders  |


### 7.3 Border Colour

- Default: `var(--border)`
- Focus: `var(--ring)`
- Error: destructive colour
- Dividers vs. container borders (different opacities)

---

## 8. Iconography

### 8.1 Icon Library

- Which icon set? (e.g. Lucide, Heroicons, Phosphor, custom)
- How they're imported and used in code
- Where the source files live

### 8.2 Icon Sizing


| Size  | Dimensions | Usage                       |
| ----- | ---------- | --------------------------- |
| `xs`  | 12×12px    | Inline decorative           |
| `sm`  | 16×16px    | Inline with text, badges    |
| `md`  | 20×20px    | Buttons, form elements      |
| `lg`  | 24×24px    | Navigation, default         |
| `xl`  | 32×32px    | Feature highlights          |
| `2xl` | 48×48px    | Empty states, illustrations |


### 8.3 Icon Rules

- Single colour (inherits text colour via `currentColor`)
- Align to pixel grid for crisp rendering
- Consistent stroke width across all icons
- Always provide accessible labels (`aria-label`) when used standalone
- Decorative icons should be hidden from screen readers (`aria-hidden="true"`)
- Minimum touch target: 44×44px (even if icon is smaller)

---

## 9. Imagery & Photography

### 9.1 Photography Style

- Authentic, local (NZ-focused, not generic stock)
- Show real members, real communities
- Warm, approachable tone
- Diverse representation
- Natural lighting preferred

### 9.2 Image Treatments

- Rounded corners (match border radius system)
- Overlay rules (gradient overlays for text legibility)
- Aspect ratios to standardise (e.g. 16:9 for heroes, 4:3 for cards, 1:1 for avatars)

### 9.3 Image Optimisation

- Use Next.js `<Image>` component for automatic optimisation
- WebP/AVIF formats
- Responsive `srcset` / `sizes`
- Lazy loading for below-fold images
- Explicit `width` and `height` to prevent CLS

### 9.4 Illustrations

- When to use illustration vs photography
- Style consistency (line weight, colour palette)
- Simple, flat, minimal — avoid busy illustrations

### 9.5 Alt Text Guidelines

- Descriptive alt text for meaningful images
- Empty `alt=""` for decorative images
- Never start with "Image of..." or "Photo of..."
- Describe the content and function, not the aesthetic

---

## 10. Motion & Animation

### 10.1 Animation Principles

- **Purposeful** — Every animation must serve a purpose (guide attention, show relationships, provide feedback)
- **Subtle** — Avoid flashy or distracting animations
- **Fast** — Keep durations short; UI should feel snappy
- **Accessible** — Respect `prefers-reduced-motion`

### 10.2 Duration Scale


| Token              | Duration | Usage                               |
| ------------------ | -------- | ----------------------------------- |
| `duration-fastest` | 50ms     | Micro-interactions (opacity toggle) |
| `duration-fast`    | 100ms    | Hover states, small transitions     |
| `duration-normal`  | 200ms    | Default transitions, dropdowns      |
| `duration-slow`    | 300ms    | Page-level transitions, modals      |
| `duration-slower`  | 500ms    | Complex choreographed sequences     |


### 10.3 Easing Curves


| Token          | Curve                          | Usage                |
| -------------- | ------------------------------ | -------------------- |
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General purpose      |
| `ease-in`      | `cubic-bezier(0.4, 0, 1, 1)`   | Elements exiting     |
| `ease-out`     | `cubic-bezier(0, 0, 0.2, 1)`   | Elements entering    |
| `ease-in-out`  | `cubic-bezier(0.4, 0, 0.2, 1)` | Elements moving      |
| `ease-spring`  | Spring-based (Framer Motion)   | Playful interactions |


### 10.4 Common Animations to Document

- Fade in/out
- Slide in/out (direction variants)
- Scale in/out
- Skeleton shimmer (loading states)
- Page transitions
- Scroll-triggered reveals
- Hover lifts (elevation change)
- Button press (scale down)
- Accordion expand/collapse
- Toast enter/exit
- Modal enter/exit (backdrop fade + content scale)

### 10.5 Reduced Motion

- All animations must have a `prefers-reduced-motion` alternative
- Replace motion with opacity fades or instant state changes
- Never auto-play video or looping animation without user consent

---

## 11. Accessibility

### 11.1 Standards

- **WCAG 2.1 AA** compliance (mandatory for FCU)
- Target WCAG 2.2 where practical

### 11.2 Colour Contrast


| Context                           | Minimum Ratio |
| --------------------------------- | ------------- |
| Normal text (<18pt)               | 4.5:1 (AA)    |
| Large text (≥18pt or 14pt bold)   | 3:1 (AA)      |
| UI components & graphical objects | 3:1           |
| Enhanced (AAA) normal text        | 7:1           |


### 11.3 Focus Management

- Custom `:focus-visible` styles (never remove default focus)
- Focus ring: 2px solid with offset, using `var(--ring)` colour
- Focus must be visible on all interactive elements
- Logical focus order (matches visual reading order)
- Focus trapping in modals and dialogs

### 11.4 Keyboard Navigation

- All interactive elements reachable via Tab
- Arrow keys for composite widgets (tabs, menus, radio groups)
- Escape to close overlays
- Enter/Space to activate
- Skip links at page top

### 11.5 Screen Reader

- Semantic HTML elements (`<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`)
- ARIA landmarks and roles where semantic HTML isn't sufficient
- Live regions (`aria-live`) for dynamic updates
- Descriptive link text (never "click here")
- Form labels associated with inputs (`htmlFor` / `aria-labelledby`)
- Error messages linked to fields (`aria-describedby`)

### 11.6 Touch Targets

- Minimum 44×44px for all interactive elements
- Adequate spacing between targets (at least 8px gap)

### 11.7 Content Accessibility

- Don't rely on colour alone to convey information
- Provide text alternatives for all non-text content
- Ensure text can be resized to 200% without loss of functionality
- Support browser zoom without horizontal scrolling

---

## 12. Voice & Tone

### 12.1 Brand Voice (Consistent)

Define FCU's personality attributes:

- **Trustworthy** — We're a financial institution; confidence and reliability matter
- **Approachable** — Not corporate-stiff; we're a community credit union
- **Clear** — Plain language, no jargon; members should immediately understand
- **Helpful** — Member-first; guide, don't lecture
- **NZ-authentic** — Local, grounded, Waikato-proud

### 12.2 Tone (Contextual)


| Situation              | Tone Shift                             |
| ---------------------- | -------------------------------------- |
| Welcome / onboarding   | Warm, encouraging                      |
| Error / validation     | Empathetic, solution-focused           |
| Success / confirmation | Celebratory but restrained             |
| Security / compliance  | Reassuring, authoritative              |
| Financial advice       | Professional, clear, non-condescending |
| Marketing / promotion  | Enthusiastic, benefit-focused          |
| Empty states           | Friendly, guiding                      |


### 12.3 Microcopy Patterns

Document standard copy for:

- Button labels (e.g. "Get Started", "Apply Now", "Learn More")
- Error messages (e.g. "Please enter a valid email address")
- Success messages (e.g. "Your application has been submitted")
- Empty states (e.g. "No transactions yet")
- Loading states (e.g. "Fetching your details...")
- Confirmation dialogs (e.g. "Are you sure you want to cancel?")
- Form placeholders
- Tooltip text

### 12.4 Writing Rules

- Use sentence case for headings (not Title Case)
- Use active voice
- Use "you" and "your" (speak directly to the member)
- Avoid abbreviations unless universally understood
- Use NZD ($) for all currency
- Dates in DD/MM/YYYY format
- Numbers: use commas for thousands ($1,000.00)

---

## 13. Components

### 13.1 Actions


| Component           | States to Document                               | Variants                                                                       |
| ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------ |
| **Button**          | Default, hover, active, focus, disabled, loading | Primary, secondary, outline, ghost, destructive, link; sizes: sm, md, lg, icon |
| **Button Group**    | —                                                | Horizontal, vertical                                                           |
| **Icon Button**     | Default, hover, active, focus, disabled          | Sizes, shapes (square, circle)                                                 |
| **Toggle / Switch** | On, off, disabled, focus                         | Sizes, with label                                                              |
| **Dropdown Menu**   | Open, closed                                     | With icons, with descriptions, nested                                          |
| **Context Menu**    | —                                                | —                                                                              |


### 13.2 Forms & Inputs


| Component          | States to Document                                 | Variants                                   |
| ------------------ | -------------------------------------------------- | ------------------------------------------ |
| **Input**          | Default, focus, filled, error, disabled, readonly  | Text, email, password, number, search, tel |
| **Textarea**       | Default, focus, filled, error, disabled            | Auto-resize, character count               |
| **Select**         | Default, open, selected, error, disabled           | Native, custom, searchable, multi-select   |
| **Checkbox**       | Unchecked, checked, indeterminate, disabled, focus | With label, group                          |
| **Radio Group**    | Unselected, selected, disabled, focus              | Vertical, horizontal, card-style           |
| **Slider / Range** | Default, active, disabled                          | Single, range, with input                  |
| **Date Picker**    | —                                                  | Single date, date range                    |
| **File Upload**    | Default, dragging, uploaded, error                 | Single, multiple, with preview             |
| **Form Layout**    | —                                                  | Vertical, horizontal, inline, multi-step   |
| **Label**          | Required, optional                                 | With helper icon                           |
| **Helper Text**    | Default, error, success                            | —                                          |
| **Input OTP**      | —                                                  | 4-digit, 6-digit                           |


### 13.3 Navigation


| Component             | States to Document             | Variants                                    |
| --------------------- | ------------------------------ | ------------------------------------------- |
| **Navbar / Header**   | Default, scrolled, mobile-open | Transparent, solid, sticky                  |
| **Sidebar**           | Expanded, collapsed            | With sections, with footer                  |
| **Breadcrumb**        | —                              | With icons, truncated                       |
| **Tabs**              | Default, active, disabled      | Horizontal, vertical, underline, pill       |
| **Pagination**        | —                              | Numbered, simple prev/next, infinite scroll |
| **Navigation Menu**   | Open, closed                   | Mega menu, dropdown                         |
| **Footer**            | —                              | Multi-column, simple                        |
| **Skip Link**         | —                              | —                                           |
| **Table of Contents** | —                              | Sticky, scrollspy                           |


### 13.4 Data Display


| Component               | States to Document                  | Variants                                                          |
| ----------------------- | ----------------------------------- | ----------------------------------------------------------------- |
| **Table**               | Default, sortable, selected row     | Striped, bordered, compact, responsive                            |
| **Data Table**          | Loading, empty, error, filtered     | With search, with pagination, selectable                          |
| **Card**                | Default, hover, active, selected    | Horizontal, vertical, with image, with footer                     |
| **Badge**               | —                                   | Solid, outline; colours: default, primary, secondary, destructive |
| **Avatar**              | With image, with initials, fallback | Sizes, with status indicator, group                               |
| **Tag / Chip**          | Default, selected, removable        | —                                                                 |
| **List**                | —                                   | Simple, with icons, with actions, with dividers                   |
| **Description List**    | —                                   | Horizontal, vertical                                              |
| **Stat / Metric**       | —                                   | With trend indicator, with icon                                   |
| **Timeline**            | —                                   | Vertical, horizontal                                              |
| **Separator / Divider** | —                                   | Horizontal, vertical, with text                                   |
| **Scroll Area**         | —                                   | Vertical, horizontal                                              |


### 13.5 Feedback & Status


| Component                | States to Document         | Variants                                   |
| ------------------------ | -------------------------- | ------------------------------------------ |
| **Alert**                | —                          | Info, success, warning, error; dismissible |
| **Alert Dialog**         | —                          | Confirm, destructive                       |
| **Toast / Notification** | Enter, visible, exit       | Success, error, warning, info; with action |
| **Progress**             | Determinate, indeterminate | Bar, circular                              |
| **Skeleton**             | —                          | Text, circle, rectangle, card, table       |
| **Spinner / Loading**    | —                          | Sizes, inline                              |
| **Banner**               | —                          | Info, warning, promotional; dismissible    |


### 13.6 Overlays & Modals


| Component           | States to Document | Variants                             |
| ------------------- | ------------------ | ------------------------------------ |
| **Dialog / Modal**  | Open, closed       | Sizes: sm, md, lg, full; with form   |
| **Sheet / Drawer**  | Open, closed       | Top, right, bottom, left             |
| **Popover**         | Open, closed       | With arrow, placement options        |
| **Tooltip**         | Visible, hidden    | Placement options, with rich content |
| **Hover Card**      | —                  | —                                    |
| **Command Palette** | —                  | With categories, with recent         |


### 13.7 Disclosure & Content


| Component             | States to Document | Variants                           |
| --------------------- | ------------------ | ---------------------------------- |
| **Accordion**         | Open, closed       | Single, multiple; with icons       |
| **Collapsible**       | Open, closed       | —                                  |
| **Tabs**              | (see Navigation)   | Content tabs with panels           |
| **Carousel / Slider** | —                  | Auto-play, manual, with thumbnails |
| **Aspect Ratio**      | —                  | 16:9, 4:3, 1:1, custom             |


### 13.8 Layout & Structure


| Component            | States to Document | Variants                                      |
| -------------------- | ------------------ | --------------------------------------------- |
| **Container**        | —                  | Sizes, padded, fluid                          |
| **Grid**             | —                  | Responsive columns                            |
| **Stack**            | —                  | Vertical (VStack), horizontal (HStack)        |
| **Section**          | —                  | With background colour, with padding variants |
| **Prose / Article**  | —                  | Typography-optimised content wrapper          |
| **Resizable Panels** | —                  | Horizontal, vertical                          |


### 13.9 Media


| Component | States to Document     | Variants                            |
| --------- | ---------------------- | ----------------------------------- |
| **Image** | Loading, loaded, error | Rounded, with caption, with overlay |
| **Video** | —                      | Inline, modal, with poster          |
| **Audio** | —                      | With controls                       |
| **Embed** | —                      | YouTube, map, iframe                |


### 13.10 Financial / Domain-Specific Components


| Component                            | Description                                         |
| ------------------------------------ | --------------------------------------------------- |
| **Loan Calculator**                  | Interactive calculator with sliders, output display |
| **Interest Rate Display**            | Formatted rate with comparison                      |
| **Currency Display**                 | NZD formatted amounts with proper locale            |
| **Fee Table**                        | Structured fee schedule                             |
| **Branch Card**                      | Location, hours, contact info                       |
| **Product Comparison**               | Side-by-side feature comparison                     |
| **Application Status**               | Step indicator with status                          |
| **Security Badge / Trust Indicator** | SSL, NZFMA, compliance logos                        |
| **Rate Ticker**                      | Live or updated rates display                       |
| **Quick Action Cards**               | Common member actions (pay, transfer, apply)        |


### 13.11 Component Documentation Standard

For **every** component, document:

1. **Description** — What it is and when to use it
2. **Anatomy** — Labelled diagram of all parts
3. **Variants** — All visual/functional variants
4. **States** — Every interactive state (default, hover, focus, active, disabled, loading, error)
5. **Sizes** — If applicable (sm, md, lg)
6. **Props / API** — Complete interface with types
7. **Accessibility** — Keyboard behaviour, ARIA attributes, screen reader notes
8. **Do's and Don'ts** — Usage guidelines with visual examples
9. **Related Components** — Links to similar/complementary components
10. **Code Example** — Live, interactive example with source code

---

## 14. Patterns & Templates

Patterns are combinations of components solving recurring design problems.

### 14.1 Page Patterns


| Pattern                    | Description                                                       |
| -------------------------- | ----------------------------------------------------------------- |
| **Marketing Landing Page** | Hero → features → testimonials → CTA                              |
| **Product Page**           | Product details → rates → features → comparison → application CTA |
| **Content / Blog Article** | Hero → body (prose) → author → related articles                   |
| **Contact Page**           | Form → branch locations → map → FAQ                               |
| **Search Results**         | Search bar → filters → result list → pagination                   |
| **404 / Error Page**       | Message → suggested links → search                                |
| **Legal / Policy Page**    | Table of contents → long-form content                             |


### 14.2 Interaction Patterns


| Pattern                 | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| **Multi-Step Form**     | Progress indicator → step content → next/back → confirmation |
| **Search**              | Input → autocomplete → results → empty state                 |
| **Filtering & Sorting** | Filter bar → active filters → sorted results                 |
| **Infinite Scroll**     | Loading trigger → skeleton → content append                  |
| **Optimistic Updates**  | Immediate UI change → background sync → rollback on error    |
| **Copy to Clipboard**   | Click → visual confirmation → tooltip                        |


### 14.3 Auth Patterns (if applicable)

- Sign in form
- Registration flow
- Password reset
- Two-factor authentication
- Session timeout warning

---

## 15. States & Feedback

### 15.1 Component States

Every interactive element should have these states documented:


| State                | Description                         |
| -------------------- | ----------------------------------- |
| **Default / Rest**   | Normal appearance                   |
| **Hover**            | Mouse cursor over element           |
| **Focus**            | Keyboard focus (`:focus-visible`)   |
| **Active / Pressed** | During click/tap                    |
| **Selected**         | Chosen / toggled on                 |
| **Disabled**         | Non-interactive, greyed out         |
| **Loading**          | Awaiting result (spinner, skeleton) |
| **Error**            | Validation failure                  |
| **Success**          | Completed action                    |
| **Read-only**        | Visible but not editable            |
| **Dragging**         | During drag operation               |


### 15.2 Page-Level States


| State             | What to Show                                         |
| ----------------- | ---------------------------------------------------- |
| **Loading**       | Skeleton of the expected content layout              |
| **Empty**         | Helpful message + illustration + primary action      |
| **Error**         | Error message + retry action + support link          |
| **Partial Error** | Working content with error banner for failed section |
| **Offline**       | Cached content with offline indicator                |
| **Maintenance**   | Friendly message with expected return time           |


### 15.3 Form Validation States

- **Inline validation** — When to validate (on blur vs on submit vs real-time)
- **Error messages** — Placement (below field), colour (destructive), icon
- **Success indicators** — Green check on valid fields
- **Required field indicators** — Asterisk () or "(required)" text
- **Character counters** — For constrained fields

---

## 16. Dark Mode

### 16.1 Implementation

- CSS custom properties switch via `.dark` class on `<html>`
- All semantic colour tokens have dark-mode values
- Colour inversion rules (not just swapping black/white)

### 16.2 Dark Mode Colour Principles

- Backgrounds: dark surfaces using low-lightness neutrals (not pure black)
- Text: off-white (not pure white) for reduced eye strain
- Elevation: lighter surfaces = higher elevation (opposite of light mode shadows)
- Brand colours may need adjusted lightness/saturation for dark backgrounds
- Borders: use white with low opacity (e.g. `oklch(1 0 0 / 10%)`)
- Shadows: higher opacity, or replaced with border-based separation

### 16.3 What to Document

- Full dark mode colour token table
- Side-by-side comparison of every component in light vs dark
- Image handling (do images need dark mode treatment?)
- Logo version for dark backgrounds

---

## 17. Financial Services Considerations

### 17.1 Trust Indicators

- Security badges and certifications
- NZFMA membership badge
- SSL / encryption indicators
- Privacy policy prominence
- Contact information always visible

### 17.2 Compliance

- PCI-DSS awareness in form handling
- Disclaimer text styling and placement
- Terms and conditions formatting
- Legally required disclosures (interest rate disclaimers, fees, etc.)

### 17.3 Data Formatting (NZ)


| Data Type     | Format                       | Example             |
| ------------- | ---------------------------- | ------------------- |
| Currency      | NZD, 2 decimal places        | $1,234.56           |
| Interest Rate | Percentage, 2 decimal places | 6.45% p.a.          |
| Date          | DD/MM/YYYY                   | 02/03/2026          |
| Phone         | +64 or 0X XXX XXXX           | 07 839 8896         |
| BSB / Account | XX-XXXX-XXXXXXX-XXX          | 02-0316-0012345-000 |


### 17.4 Sensitive Information Handling

- Masking of account numbers (show last 4 digits)
- Password visibility toggles
- Session timeout UI
- Secure form indicators

---

## 18. Implementation Checklist

A summary checklist of everything above:

### Foundations

- Logo (all variants, clear space, min size, do's & don'ts)
- Colour palette (primary, secondary, semantic, status, charts)
- Colour accessibility matrix (contrast ratios for all pairings)
- Typography (typeface, scale, weights, line heights, responsive)
- Spacing scale (base unit, full scale)
- Grid system (columns, gutters, margins, breakpoints)
- Elevation & shadows (levels, dark mode)
- Border radius scale
- Iconography (library, sizes, rules)
- Imagery & photography (style, treatments, optimisation, alt text)
- Motion & animation (durations, easing, reduced motion)

### Content

- Voice & tone (brand voice, contextual tone, microcopy)
- Writing rules (NZ formatting, style guide)

### Components

- Actions (buttons, toggles, dropdowns)
- Forms & inputs (all input types, validation, layouts)
- Navigation (header, footer, breadcrumbs, tabs, pagination)
- Data display (tables, cards, badges, avatars, stats)
- Feedback (alerts, toasts, progress, skeletons)
- Overlays (modals, drawers, popovers, tooltips)
- Disclosure (accordions, collapsibles, carousels)
- Layout (containers, grids, stacks, sections)
- Media (images, video, embeds)
- Financial-specific components

### States

- All component states documented
- Page-level states (loading, empty, error)
- Form validation states

### Patterns

- Page templates
- Interaction patterns
- Auth patterns

### Accessibility

- Colour contrast compliance
- Focus management
- Keyboard navigation
- Screen reader support
- Touch targets
- Reduced motion support

### Dark Mode

- Full dark colour tokens
- All components reviewed in dark mode
- Logo dark variant

### Compliance

- Trust indicators
- NZ data formatting
- Sensitive information handling
- Legal/regulatory disclaimers

---

## References & Inspiration


| Design System            | URL                          | Notable For                                    |
| ------------------------ | ---------------------------- | ---------------------------------------------- |
| Atlassian Design         | atlassian.design             | Foundations, tokens, accessibility             |
| IBM Carbon               | carbondesignsystem.com       | Comprehensive components, accessibility        |
| Shopify Polaris          | polaris.shopify.com          | Merchant-focused, voice & tone                 |
| Material Design 3        | m3.material.io               | Motion, elevation, theming                     |
| Fluent 2                 | fluent2.microsoft.design     | Elevation system, shadow physics               |
| Apple HIG                | developer.apple.com/design   | Platform patterns, clarity                     |
| GOV.UK Design System     | design-system.service.gov.uk | Accessibility, plain language                  |
| PenFed Credit Union      | (case study)                 | Financial services design system               |
| Shadcn/ui                | ui.shadcn.com                | Component API patterns (FCU's primary library) |
| Design Systems Checklist | designsystemschecklist.com   | Implementation tracking                        |


