# Maya's Neighborhood Association — Website Template

A portable, static (no build step, no server required) template for a neighborhood
association website. Pure HTML/CSS/JS — open `index.html` directly in a browser, or
upload the whole folder to any static host.

## Files
- `index.html` — Home
- `about.html` — Board Members, Charter & Bylaws, Minutes & Recordings, Agendas,
  Neighborhood Boundaries (NA), Contacts
- `news.html` — Community newsletter announcements (decorative, upload-only, not a blog)
- `get-involved.html` — Board & general membership meeting information
- `contact.html` — Hover/tap-to-reveal contact cards
- `css/styles.css` — All site styling and color/font variables (edit `:root` at the
  top to re-theme the whole site)
- `js/script.js` — Shrinking sticky header, dropdown menu, mobile nav, contact-card reveal
- `SECURITY-RECOMMENDATIONS.md` — Bot, cache, and geo-access hardening guidance

## What's a placeholder vs. real
Every bracketed label like `[Client: ...]` or dashed "Client Content Area" box is
scaffolding — no board members, bylaws, meeting minutes, boundaries, or contact
details have been invented. Replace each drop zone with the association's real content.

## Customizing
- **Logo**: replace the circular "YOUR LOGO HERE" placeholder in each page's
  `.logo-placeholder` div with an `<img>` tag pointing to the client's logo file.
- **Colors/fonts**: edit the CSS variables at the top of `css/styles.css`.
- **Nav/menu items**: the header and nav markup is duplicated at the top of each
  HTML file (by design, for portability without a server-side templating engine) —
  update all five files together when changing menu structure.

## Hosting
Works on any static host: GitHub Pages, Netlify, Vercel, S3, or traditional shared
hosting. No database, no backend, no build tools required.
