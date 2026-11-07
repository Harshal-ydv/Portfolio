# Harshal Yadav — Portfolio

A static, responsive portfolio for the AWS Student Builder Challenge. The default visual identity is **Midnight Network**: deep navy surfaces, electric blue and cyan accents, and locally hosted network artwork.

## Run locally

```bash
npm install
npm run dev
```

## Build the static site

```bash
npm run build
```

The production export is written to `out/`. Routes use trailing slashes, making them suitable for static hosting with a CDN and S3 origin configuration.

## Routes

- `/` — About Me
- `/skills/` — Skills and currently learning
- `/projects/` — Filterable project portfolio with detail dialogs
- `/certifications/` — Credentials
- `/experience/` — Experience, education and achievements
- `/moods/` — Mood previews (moods remain disabled in Phase 1)
- `/contact/` — Contact details and an email-app fallback form

## Content and assets

Owner-specific content lives in `content/`. Shared visual assets live in `public/shared/`. Replace `avatar-placeholder.svg` with a portrait. Project thumbnails and live links are only shown when supplied and confirmed.

After deployment, set `publicUrl` in `content/site.ts` to the public site origin so Open Graph metadata can emit an absolute social-preview image URL.

## Stack

- Next.js App Router, React and TypeScript
- Sass modules / global Sass tokens
- Self-hosted Manrope, Inter and DM Mono font files from Fontsource packages
- Static export (`output: "export"`)

Phase 1 builds the default portfolio and a disabled mood hub. The first complete interactive mood belongs to Phase 2.
