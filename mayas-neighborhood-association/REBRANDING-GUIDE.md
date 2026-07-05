# Rebranding Guide — Reusing This Template for a New Neighborhood Association

This template was built so a single person can re-skin it for a new Eugene
neighborhood association client in well under an hour. Follow these steps in order.

## Estimated time: 30–60 minutes per client (before content entry)

## 1. Colors — one file, one block
Open `css/styles.css` and edit only the `:root { ... }` block at the very top:

- `--color-primary` / `--color-primary-dark` / `--color-primary-light` — the main
  brand color (currently deep green). Every header, nav bar, and footer background
  derives from these three.
- `--color-accent` / `--color-accent-dark` — the secondary accent (currently light
  blue). Used for borders, dropdown highlights, and small UI details.
- `--color-cta` / `--color-cta-dark` / `--color-cta-bg` — leave these as-is unless the
  client specifically wants the "View the Community Newsletter" button in a different
  color; it's intentionally decoupled from the page accent so it stays a consistent,
  recognizable call to action across every client site.

**Before locking in a new color**, re-check contrast — see `ACCESSIBILITY.md` for the
method. Don't reuse a color combination that drops below a 4.5:1 ratio for body text.

## 2. Site name & tagline (find-and-replace across all files)
Every page repeats the same two strings in the header, `<title>` tag, and footer:

- `Maya's Neighborhood Association` → replace with the client's actual name
- `[Client: replace with your neighborhood association's tagline]` → their tagline

Because the header/footer markup is duplicated on each page (by design, so the site
works without a server), use a find-and-replace across all `.html` files in one pass
rather than editing page by page.

## 3. Logo
Replace the `.logo-placeholder` div (a dashed circle that reads "YOUR LOGO HERE") with
an `<img>` tag pointing to the client's logo file, e.g.:
```html
<img src="images/logo.png" alt="[Client Name] logo" style="width:100%;height:100%;object-fit:contain;">
```
Do this once per page (7 pages) — or once if you build a shared include process later.

## 4. Menu items
The nav list (`<ul class="nav-list">`) is identical on every page. Add, remove, or
rename items there — remember to update all 7 pages together, and keep the anchor
links inside the About dropdown (`about.html#board-members`, etc.) pointing at
matching `id` attributes in `about.html`.

## 5. NA-specific content
Everything marked with a dashed border and a "Client Content Area" label is meant to
be replaced per client: board members, bylaws, minutes, meeting schedules, contact
details, and the NA-specific boundary description on the About page. Never guess or
copy another NA's boundary/contact data — get it from the client directly or from the
City of Eugene's official Neighborhood Associations Maps page.

## 6. The two "Duplicate Page" templates
`duplicate-page-1.html` and `duplicate-page-2.html` exist specifically so each client
can bolt on NA-specific content (a history page, a sponsors page, a project page)
without touching the core template pages. Rename the file and update its nav label
and `<title>` once you know what the client wants it to be.

## 7. Sanity check before delivery
- Open every page in a browser and click every nav link.
- Resize the browser below 880px wide and confirm the hamburger menu opens/closes.
- Tab through the page with your keyboard only — you should be able to reach every
  link, button, and the Contact Us cards.
- Re-run the contrast check if you changed any color.

## 8. Reuse across Eugene's neighborhood associations
There are 23 recognized neighborhood associations in Eugene. This template, plus this
guide, is meant to make each new client engagement mostly a content-and-branding
exercise rather than a rebuild — see `demo/` for a fully populated example you can
show prospective clients before they've committed.
