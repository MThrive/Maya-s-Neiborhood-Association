# Security & Access Recommendations
### Maya's Neighborhood Association — Website Template

This template is plain HTML/CSS/JS so it can be hosted anywhere. Plain static files
**cannot**, by themselves, block bots or restrict access by country — that enforcement
has to happen at the hosting/CDN/server layer, in front of these files. Below is what
to add at that layer, plus what's already built into the template.

## 1. Already built into the template
- **Contact Us page** hides names' email/phone details in data attributes and only
  assembles/display them in the DOM after a real hover, tap, or keyboard-focus event —
  a plain HTML scrape of the page source never sees a complete, harvestable email address.
- No `mailto:` links are exposed in raw markup.
- Semantic HTML and `aria-*` attributes are used instead of exotic scripting, which
  keeps the site compatible with accessibility tools while still limiting easy scraping.

## 2. Bot / scraper protection (requires hosting or CDN configuration)
- Put the site behind a CDN/WAF with bot-management, such as **Cloudflare** (free
  tier includes basic bot-fight mode), **AWS CloudFront + WAF**, or your host's
  equivalent.
- Enable **rate limiting** on all pages so a single IP can't request hundreds of
  pages per minute.
- If you ever add a contact form, include a **honeypot field** (hidden input that
  only bots fill in) and/or a CAPTCHA (e.g., Cloudflare Turnstile, hCaptcha).
- Add a `robots.txt` if you want to discourage well-behaved crawlers from indexing
  specific pages (this does **not** stop malicious bots, only polite ones).
- Keep JavaScript-rendered contact details (as used on the Contact Us page) rather
  than plain-text emails anywhere else on the site.

## 3. Caching precautions
- Set **cache-control headers** at the host/CDN level for HTML (short cache, e.g.
  `max-age=300`) versus CSS/JS/images (long cache with versioned filenames, e.g.
  `styles.v2.css`), so visitors always see the latest content updates quickly while
  static assets stay fast.
- If using a CDN, configure **cache purging** so that when the client updates the
  newsletter or meeting minutes, the new file is served immediately rather than a
  stale cached copy.
- Avoid caching any page that will later include a login-protected or member-only
  area, if one is added.

## 4. Restricting access to non-international visitors
- Static HTML/CSS/JS has no concept of visitor location — **geo-restriction must be
  configured at the CDN/hosting layer**, for example:
  - Cloudflare: Firewall Rules → "Country" condition → block/challenge all countries
    outside the U.S. (or your target region).
  - AWS CloudFront: Geo-restriction (allow-list) at the distribution level.
  - Many shared-hosting control panels (e.g., cPanel) offer country IP blocking.
- Geo-blocking by country is a strong deterrent but not perfect (VPNs can bypass it);
  pair it with the bot-management rules in Section 2 for defense in depth.

## 5. General hosting hygiene
- Serve the entire site over **HTTPS** (free certificates via Let's Encrypt or your
  host) and enable **HSTS**.
- Add standard security headers where your host allows it: `Content-Security-Policy`,
  `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` or `SAMEORIGIN`,
  `Referrer-Policy: strict-origin-when-cross-origin`.
- Keep an eye on your hosting provider's access logs periodically for unusual traffic
  spikes, which often indicate scraping or bot activity.
- If the client later adds a CMS or admin login to manage newsletters, use strong,
  unique credentials and two-factor authentication.

## 6. What this template intentionally does NOT include
- No real names, emails, phone numbers, or neighborhood-association boundary data.
  All of those fields are bracketed placeholders (e.g., `[Board Chair Name]`) for the
  client to fill in with verified, current information.
- No backend, database, or server code — this is a static front-end template designed
  to be portable to any static host (Netlify, Vercel, GitHub Pages, S3, traditional
  shared hosting, etc.) or dropped behind a CDN/WAF as described above.
