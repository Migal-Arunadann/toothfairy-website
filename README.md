# Tooth Fairy Dental Clinic — Premium Website

Production-quality, bespoke editorial website for **Tooth Fairy Dental Clinic** (டூத் ஃபைரி டெண்ட்டா கிளினிக்) in Perambur, Chennai, Tamil Nadu, India.

---

## 1. Practice Information (Source of Truth)

- **Clinic Name**: Tooth Fairy Dental Clinic
- **Tamil Name**: டூத் ஃபைரி டெண்ட்டா கிளினிக்
- **Lead Dentist**: Dr. Tamanna, B.D.S., F.A.G.E.
- **Location**: 266, Paper Mills Road, Opposite Ajantha Baker, Neelam Garden, Bunder Garden, Perambur, Chennai, Tamil Nadu 600011, India.
- **Primary Phone**: `+91 96000 21777`
- **Secondary Phone**: `+91 4425580832`
- **Consulting Hours**: Monday to Saturday: 10:00 AM – 8:00 PM
- **Sunday**: By Appointment Only
- **Google Reviews Rating**: 5.0 ★ across 206 verified Google reviews
- **Practice Features**: Identifies as Women-Owned, LGBTQ+ welcoming clinical setting

---

## 2. Four Primary Pages

1. **Home (`/` -> `index.html`)**:
   - Asymmetric editorial hero featuring authentic clinical surgery photography of Dr. Tamanna.
   - Proof metric strip (5.0 rating, verified qualifications, inclusive practice).
   - Core clinical focus areas (Root Canal, Braces & Alignment, Crowns, Impacted Teeth).
   - Interactive Before/After orthodontic alignment transformation slider.
   - Verified patient review themes.
   - Complete location stamp & consulting hours schedule.
   - Distinctive crimson closing call to action.

2. **About the Clinic (`/about` -> `about.html`)**:
   - Practice philosophy centered around patient comfort, transparent communication, and unhurried care.
   - Profile of Dr. Tamanna (B.D.S., F.A.G.E.) and her conservative dental preservation approach.
   - Clinical values: Unhurried appointment scheduling, transparent procedural explanations, welcoming environment.
   - Verified reputation overview.

3. **Treatments (`/treatments` -> `treatments.html`)**:
   - Detailed patient guides for verified focus areas:
     1. Root Canal Treatment (Endodontic preservation)
     2. Braces & Tooth Alignment (Orthodontics with embedded interactive Before/After slider)
     3. Dental Crowns & Restorations (Structural protection)
     4. Impacted Tooth Surgery (Gentle wisdom tooth management)
   - Diagnostic assessment notes and realistic guidance.
   - Practical FAQ accordion addressing scheduling, location, and Sunday appointments.

4. **Contact & Appointments (`/contact` -> `contact.html`)**:
   - Direct, clickable phone cards (`+91 96000 21777` and `+91 4425580832`).
   - Detailed consulting hours table emphasizing Sunday by appointment.
   - Complete physical address with landmark guidance (Opposite Ajantha Baker).
   - Direct Google Maps directions action.
   - Static demonstration appointment enquiry form with real-time validation and 1-click telephone confirmation.

---

## 3. Interactive Before & After Teeth Slider

- Demonstrates orthodontic alignment and natural enamel polish.
- Features smooth dragging with touch and mouse events, divider line with circular grip, and full keyboard accessibility (`ArrowLeft` / `ArrowRight` on the native range input).
- Embedded on both the Home page and the Treatments page.

---

## 4. Technical SEO & Accessibility

- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- **Structured Data (JSON-LD)**: Schema.org `Dentist` and `MedicalWebPage` markup with verified clinic coordinates, address, opening hours, and phone numbers.
- **Sitemap & Robots**: Crawlable `sitemap.xml` and `robots.txt`.
- **WCAG 2.2 AA**: High contrast, visible focus rings (`:focus-visible`), descriptive alt text, native skip-to-content link, and `@media (prefers-reduced-motion: reduce)` support.
- **Mobile-First UX**: Zero horizontal scrollbar overflow, touch targets > 44px, and fixed bottom mobile action bar (Call + Directions).

---

## 5. Local Development & Testing

```bash
# Start local static server
npm run dev
# or:
python -m http.server 3000

# Run automated integrity test suite
npm test
```

---

## 6. Production Deployment

### Static Hosting (Vercel, Netlify, Cloudflare Pages)
Deploy the root directory directly as static HTML/CSS/JS.

### Docker / Coolify
The repository includes a ready-to-deploy `Dockerfile` and `nginx.conf`:
- Alpine-based Nginx container with HTTP/2 and gzip compression.
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).
- Clean URL routing (`/about` resolves to `/about.html`, etc.).
- 1-year asset caching for images, CSS, and JS.
