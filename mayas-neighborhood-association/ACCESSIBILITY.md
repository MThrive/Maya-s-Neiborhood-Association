# Accessibility Notes
### Maya's Neighborhood Association — Website Template

This template is built with WCAG 2.1 Level AA as the working target. Below is what's
already in place, the actual measured contrast ratios, and what to check whenever new
content is added.

## 1. Color contrast (measured, not guessed)
Every text/background pairing used in the shared stylesheet was checked against the
WCAG relative-luminance formula. Two combinations from the first draft of this
template fell short of AA and were darkened; current ratios:

| Pairing | Ratio | Result |
|---|---|---|
| Body text on page background | 13.45:1 | AAA |
| Muted/secondary text on page background | 5.06:1 | AA |
| White nav text on green header/nav background | 8.84–12.43:1 | AAA |
| "Client Content Area" pill text (white on accent-dark) | 5.38–5.52:1 | AA |
| Content-drop-zone body text (accent-dark on tinted background) | 4.94–4.99:1 | AA |
| "View Community Newsletter" button hover (white on cta-dark) | 5.38:1 | AA |
| Footer body text / links on dark green footer | 8.94–9.35:1 | AAA |

If you change any color variable in `css/styles.css`, re-check contrast before
shipping — free tools: WebAIM Contrast Checker, or the browser DevTools contrast
inspector on any element.

## 2. Keyboard & screen-reader support already built in
- A "Skip to content" link is the first focusable element on every page.
- The mobile menu button, dropdown menu, image carousel (prev/next/dots), and
  Contact Us cards are all fully operable by keyboard (Tab, Enter, Space) — not just
  mouse/touch.
- Contact Us cards use `focus-within` so tabbing to a card reveals its details the
  same way hovering does.
- Decorative graphics (mountain silhouettes, dividers) are marked `aria-hidden="true"`
  so screen readers skip them.
- The interactive boundary map on the About page has a descriptive `title` attribute
  and a plain-text fallback link, in case the embedded map doesn't load or isn't
  accessible to a given assistive technology.
- `prefers-reduced-motion` is respected sitewide — visitors who've asked their OS to
  reduce motion get the sticky-header shrink, dropdown, and carousel without the
  animation.

## 3. What to check when you add content
- **Images**: once you replace an `image-drop-zone` placeholder with a real
  `<img>` tag, always add a real `alt` attribute describing the photo (not just
  "photo" or the filename) and, for any image below the very top of the page, add
  `loading="lazy"` — e.g. `<img src="board-chair.jpg" alt="Board Chair Jane Doe standing at the community garden" loading="lazy">`.
- **Board member bios / minutes / PDFs**: keep heading levels in order (don't skip
  from an `<h3>` straight to an `<h5>`), and make sure any linked PDF has a
  descriptive link name (not just "click here").
- **Color**: if a client wants a custom brand color instead of the default blue/green,
  re-run a contrast check on that color against both white and the page background
  before locking it in.

## 4. Known limits
- The embedded City of Eugene map (About page) is a third-party ArcGIS iframe — its
  internal accessibility is controlled by Esri/the City, not this template.
- Full manual screen-reader testing (NVDA/VoiceOver) has not been performed; the
  above reflects code-level best practice and automated contrast verification, not a
  certified audit. For a client project with strict compliance requirements, budget
  for a manual accessibility pass before launch.
