# Sigit & Cinta — Wedding Website

A Next.js 14 (App Router) implementation of the bespoke wedding website for Sigit & Cinta.
**Wedding date:** 21 June 2026 · **Venue:** Gedung Heroes, Bandung Barat

---

## Quick start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

---

## Stack

- **Next.js 14** App Router (TypeScript)
- **react-hook-form** + **zod** for the RSVP form
- **next/font** for self-hosted Google Fonts (Pinyon Script, Italiana, Cormorant Garamond, Inter)
- CSS-in-JS via inline `style` + a few utility classes in `app/globals.css`
- Design tokens as CSS custom properties

---

## Project structure

```
app/
  layout.tsx          # root layout — fonts + persistent <Nav>
  globals.css         # design tokens + utility classes
  page.tsx            # Home — composes all 9 sections
  venue/page.tsx
  details/page.tsx
  rsvp/page.tsx
  api/rsvp/route.ts   # POST handler — validates with zod
components/
  atoms.tsx           # Eyebrow, Script, SerifCaps, BodyItalic, Hairline, Botanical, HeartMonogram
  Nav.tsx             # Persistent top navigation
  PageHeader.tsx      # Hero header for sub-pages
  RSVPForm.tsx        # Client form, validates + submits
  sections/
    Hero.tsx
    Welcome.tsx
    Countdown.tsx     # Live-ticking, "use client"
    RSVPPreview.tsx
    LoveStory.tsx
    MemoryLane.tsx
    Gifts.tsx         # Includes copy-to-clipboard
    FAQ.tsx           # Accordion
    Footer.tsx
content/
  site.ts             # All editable content (names, dates, schedule, faq, etc.)
hooks/
  useCountdown.ts
lib/
  format.ts
```

---

## Editing content

All copy, photos, accounts, schedule entries, and FAQ items live in `content/site.ts`.
The page components read from this single config.

---

## Design tokens

```css
--cream:    #EDE8DF;   --ink:      #2C2817;   --olive: #6B7A4A;
--cream-2:  #E5DED1;   --ink-soft: #4A4235;   --gold:  #C5B99A;
--off:      #F5F2EC;
```

Typography:
- `var(--font-script)` — Pinyon Script (display names)
- `var(--font-display)` — Italiana (uppercase headings)
- `var(--font-body)` — Cormorant Garamond (body italic)
- `var(--font-ui)` — Inter (eyebrows, buttons, nav)

---

## RSVP backend

`app/api/rsvp/route.ts` validates the payload but does not persist or notify yet.
Wire it to your store of choice:

```ts
// Supabase example
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
await supabase.from("rsvps").insert(data);
```

For couple notifications, drop in Resend / Postmark / SendGrid in the same route.

---

## Deploy

Optimised for **Vercel**. `vercel --prod` works out of the box. For static export, set `output: "export"` in `next.config.mjs` and stub the RSVP route as a serverless function on a separate domain.

---

## TODOs before launch

- [ ] Replace Pexels stock photos with real photos of Sigit & Cinta
- [ ] Wire `/api/rsvp` to a real database and email service
- [ ] Add OG image at `public/og.jpg` (1200×630)
- [ ] Add favicon + apple-touch-icon featuring the heart monogram
- [ ] Confirm copy with the couple (Indonesian translation if required)
- [ ] Add Plausible/GA4
- [ ] Lighthouse pass — target ≥90 mobile
- [ ] Mobile nav menu (currently desktop-only nav)
