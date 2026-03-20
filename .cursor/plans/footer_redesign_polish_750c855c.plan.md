---
name: Footer Redesign Polish
overview: Apply 8 UI improvements to the FCU footer based on competitive research across Monzo, Starling, Wealthsimple, Ellevest, and React Bits Pro — all changes in footer-client.tsx except the logo swap which also touches the public assets.
todos:
  - id: headline-cta
    content: Add CTA button to headline section
    status: completed
  - id: logo-image
    content: Replace text logo with FCU logo image in bottom bar
    status: completed
  - id: newsletter-enhance
    content: Enhance newsletter heading size and input focus styling
    status: completed
  - id: column-headers
    content: Strengthen column header hierarchy with uppercase tracking
    status: completed
  - id: background-gradient
    content: Add subtle gradient to footer background
    status: completed
  - id: refine-animations
    content: Refine scroll animations with stagger and opacity-only
    status: completed
  - id: contact-prominent
    content: Move contact info to full-width row with clickable address
    status: completed
  - id: back-to-top
    content: Add Back to top button in legal links row
    status: completed
isProject: false
---

# Footer Redesign Polish

All changes target [src/components/footer-client.tsx](src/components/footer-client.tsx) unless noted otherwise.

## 1. Add CTA button to headline section

Turn the headline zone from a passive statement into a conversion opportunity.

- Add a "Become a Member" (or similar) pill-shaped button below the subheadline
- Style: `rounded-full bg-fcu-secondary-500 text-fcu-primary-950 font-semibold` with hover state
- Links to `/join` or `/contact` (internal link, can be updated in Sanity later)
- Keeps the existing headline + subheadline, just adds an action

## 2. Replace text logo with actual FCU logo image

In the bottom bar, replace the plain text "First Credit Union" with the actual logo.

- Use `next/image` with `/fcu-logo.png` (already exists in [public/fcu-logo.png](public/fcu-logo.png))
- Size: small — approximately `h-8 w-auto` to fit the bottom bar
- Keep the `Link` wrapper to `/` with the existing `aria-label`

## 3. Enhance newsletter input styling

Make the newsletter section feel more intentional and premium.

- Increase the heading size from `text-lg sm:text-xl` to `text-xl sm:text-2xl`
- Add a subtle `fcu-secondary-500` focus ring/glow on the email input (`focus:ring-1 focus:ring-fcu-secondary-500/50`)
- Keep the pill-shaped input + arrow button pattern (it's already good)

## 4. Strengthen column header hierarchy

Make navigation column headers more visually distinct from the links below them.

- Change column headers from `text-sm font-semibold` to `text-xs font-semibold uppercase tracking-wider`
- This creates a clear label vs. content distinction (inspired by React Bits Pro Footer 6 pattern)

## 5. Add subtle background texture

Add depth to the flat dark background.

- Apply a very subtle top-to-bottom gradient from `fcu-primary-800` at the top to `fcu-primary-950` at the bottom on the `<footer>` element
- This adds dimension without needing an external texture image
- Alternative: use a radial gradient glow near the headline area

## 6. Refine scroll animations

Make animations feel more intentional, not uniform.

- Add `staggerChildren: 0.15` to the `containerVariants` so sections reveal sequentially
- Remove the `y: 20` slide-up from `itemVariants` — use opacity-only fade for a more subtle, grounded feel
- This makes the footer feel stable (utility zone) while still having a polished entrance

## 7. Make contact info more prominent

Pull contact details out of the cramped right-column position.

- Move the contact info row to its own full-width section between the two-column layout and the legal links row
- Give it slightly more padding and larger icon sizes (`size-4` instead of `size-3.5`)
- Make the address clickable using the `googleMapsUrl` from Site Settings (just added)

## 8. Add "Back to top" button

Small accessibility win for the credit union's demographic.

- Add a subtle "Back to top" pill button in the legal links row (right-aligned)
- Uses `ArrowUp` icon from lucide-react + smooth scroll behavior
- Style: `text-xs text-white/50 hover:text-white` with a small arrow icon
- `onClick` scrolls to top: `window.scrollTo({ top: 0, behavior: 'smooth' })`
