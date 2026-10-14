# Ntsiki's Artisan Bakehouse – WEDE5020 PoE

**Live site:** [https://maybesennie.github.io/NtsikisBakery/](https://github.com/maybesennie/Ntsikis-Bakery-Part-3)
**Repository:** [https://github.com/maybesennie/NtsikisBakery](https://github.com/maybesennie/Ntsikis-Bakery-Part-3)

## Project Overview
A five-page responsive website for a fictional Johannesburg bakery (sourdough, custom cakes, pastries). Built with HTML5, CSS3 and vanilla JavaScript.

## Structure
```
index.html  about.html  products.html  enquiry.html  contact.html
css/styles.css   js/(main, products, enquiry, contact).js
data/products.json   images/   robots.txt   sitemap.xml
```

## Part 3 – Features Added
**JavaScript / interactivity**
- Accordion on About page (History, Mission, Vision).
- Gallery with lightbox on the Home page (click, arrow keys, Esc).
- Interactive Leaflet/OpenStreetMap map on the Contact page with a popup marker.
- CSS animations and transitions (hero entrance, scroll fade-ins, hover effects).
- DOM manipulation: product cards are created dynamically from `data/products.json` (loaded with `fetch`).
- Search, category filter and sort on the Products page.

**Forms**
- `enquiry.html`: AJAX-submitted (`fetch` POST to the form's `action`, a free test API) validated form (name, email, SA phone, product, quantity, date, notes). On success it calculates a price estimate (10% bulk discount for 10+), and checks availability against each product's lead time.
- `contact.html`: validated form (name, email, optional phone, message type, message). The data is compiled into an email and the user sends it to the recipient (`hello@ntsikisbakehouse.co.za`) with a `mailto:` link.
- HTML5 validation attributes plus JavaScript validation with inline error messages.

**SEO**
- Keyword research: "artisan bakery Johannesburg", "sourdough bread", "custom celebration cakes", "pastries Johannesburg".
- Unique title tag and meta description on every page; Open Graph tags; canonical links; JSON-LD `Bakery` schema (local SEO).
- One `<h1>` per page with logical H2/H3 structure.
- Descriptive image file names and alt text; `loading="lazy"` on images.
- Clean lower-case URLs, internal linking via nav and footer, mobile-friendly responsive layout.
- `robots.txt` and `sitemap.xml` added.
- Off-page SEO plan: list the bakery on Google Business Profile, share on Instagram/Facebook, and request backlinks from local food blogs and market-stall organisers.

**Performance & security**
- Compressed images, lazy loading, no heavy frameworks, fonts preconnected.
- User input is rendered with `textContent` (no `innerHTML` of user data) to prevent XSS; input length limits; no secrets in the code; HTTPS via GitHub Pages.

**Accessibility**
- Skip link, labelled form fields, `aria-live` error messages, `aria-current` on nav, keyboard-accessible lightbox, reduced-motion support.

## Changelog
| Date | File(s) | Change | Reason |
|---|---|---|---|
| Part 2 feedback | `about.html`, `images/` | Fixed broken About page image (alt text was showing). Image renamed `about-baker-kneading-dough.jpg` and path corrected. | Feedback: image not displaying |
| Part 2 feedback | all pages | Added consistent footer, sticky nav with active-page highlighting, and `aria-current`. | Feedback: navigation/consistency |
| Part 2 feedback | `index.html`, `products.html` | Renamed images to descriptive names and improved alt text. | Feedback: accessibility |
| Part 2 feedback | `css/styles.css` | Added mobile hamburger menu and improved responsive breakpoints. | Feedback: responsiveness |
| Part 3 | `about.html`, `main.js` | Added accordion. | Interactive elements |
| Part 3 | `index.html`, `main.js` | Added lightbox gallery. | Interactive elements |
| Part 3 | `contact.html`, `contact.js` | Replaced static map with interactive Leaflet map. | Interactive maps |
| Part 3 | `styles.css`, `main.js` | Added animations/transitions. | Animations |
| Part 3 | `products.html`, `products.js`, `data/products.json` | Dynamic products with search/filter/sort. | Dynamic content |
| Part 3 | `enquiry.html`, `enquiry.js` | AJAX-submitted validated form with cost and availability response. | Form functionality |
| Part 3 | `contact.html`, `contact.js` | Validated form compiled into an email. | Form functionality |
| Part 3 | all pages | Title tags, meta descriptions, OG tags, JSON-LD, canonical links. | On-page SEO |
| Part 3 | `robots.txt`, `sitemap.xml` | Added. | SEO |

## References
- Mozilla Developer Network. 2026. *HTML: HyperText Markup Language*. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/HTML [Accessed 12 August 2026].
- W3Schools. 2026. *HTML Introduction*. [Online]. Available: https://www.w3schools.com/html/ [Accessed 12 August 2026].
- W3Schools. 2026. *CSS Introduction*. [Online]. Available: https://www.w3schools.com/css/ [Accessed 12 August 2026].
- GitHub Docs. 2026. *Getting Started with Git and GitHub*. [Online]. Available: https://docs.github.com/en/get-started [Accessed 13 August 2026].
- The Independent Institute of Education. 2026. *WEDE5020 Module Guide*. Johannesburg: The IIE.
- Leaflet. 2026. *Leaflet – an open-source JavaScript library for interactive maps*. [Online]. Available: https://leafletjs.com [Accessed 14 October 2026].
- OpenStreetMap contributors. 2026. *OpenStreetMap*. [Online]. Available: https://www.openstreetmap.org [Accessed 14 October 2026].
- Google. 2026. *Google Search Central: SEO Starter Guide*. [Online]. Available: https://developers.google.com/search/docs/fundamentals/seo-starter-guide [Accessed 14 October 2026].
- MDN. 2026. *Fetch API*. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API [Accessed 14 October 2026].

## Image Note
The images in `images/` are illustrated placeholders created for this project; replace with own photography before going live (keep file names).
