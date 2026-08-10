# Godrej DNS — CFA & Warehousing Website

A premium, single-page marketing website for a Godrej DNS / CFA (Carrying & Forwarding)
warehouse and logistics company. Built with **React + Vite**, light theme, no UI framework —
just a hand-crafted design system.

## Run it

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Replacing the mock data (important)

**Every piece of text, number, name and image URL lives in one file:**

```
src/data/content.js
```

Edit that file to update:

| What | Export |
| --- | --- |
| Company name, phone, email, address, map, tagline | `company` |
| Operations counters (dispatches, sq.ft., employees…) | `stats` |
| Hero quick-stat chips | `heroStats` |
| About Us text, pillars, MD name | `about` |
| Service cards | `services` |
| Infrastructure features & spec table | `infrastructure` |
| Brand/company chips in the marquee | `brands` |
| Why Choose Us cards | `whyUs` |
| 6-step workflow | `processSteps` |
| Gallery photos & captions | `gallery` |
| Testimonials | `testimonials` |
| FAQ questions & answers | `faqs` |
| Navbar/footer links | `navLinks` |

Items marked `// MOCK` are placeholders. Gallery/hero images are Unsplash placeholders —
replace the URLs with your real facility photos (drop them in `public/` and reference as
`/photo-name.jpg`).

The contact form is front-end only (`src/components/Contact.jsx`, `onSubmit`) — wire it to
Formspree, EmailJS or your own API where the `// MOCK` comment indicates.

## Structure

```
src/
  data/content.js        ← ALL editable content
  hooks/useReveal.jsx    ← scroll-reveal + section-header helpers
  components/            ← one file per section (Hero, About, Services, …)
  index.css              ← design tokens (colors, fonts) + all styles
```

Brand colors are CSS variables at the top of `src/index.css` (`--brand-*`, `--gold-*`) —
change them there to re-theme the entire site.
