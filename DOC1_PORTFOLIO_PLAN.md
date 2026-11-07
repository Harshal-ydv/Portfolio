# DOC 1 — Portfolio Plan: "Moods"
**AWS Student Builder Challenge · Individual portfolio website**
Version 1.0 · Written 6 Nov 2026 · Audited for feasibility, conflicts and scope

---

## 0. How the AI agent must use this document

1. **This document is the single source of truth.** Build exactly what is written. Do not add features, pages, libraries or visual ideas that are not listed. If something is unclear, choose the **simplest option that matches this document** and record the choice in a file called `DECISIONS.md` (one line per decision). Do not stop to ask.
2. **Build one phase at a time** (Section 6). Never start a later phase early. Never rewrite a finished phase unless a bug requires it.
3. **Never invent personal content.** Every fact about the owner (story, ratings, reviews, bugs, memories, links, numbers) comes only from the `content/` folder, which is filled from **Doc 2**. Until Doc 2 data exists, use clearly fake sample data marked `TODO_REPLACE` so it is obvious and easy to find. No lorem ipsum, no made-up achievements.
4. **Priority tags** are used throughout: **[MUST]** is required for the phase to count as done, **[SHOULD]** is built if time allows inside the phase, **[COULD]** is built only after every MUST and SHOULD of all phases is finished.
5. **Every phase must end in a working, deployable site.** If time runs out, the site ships with the phases that are complete. An unfinished mood is hidden by a feature flag, never shown half-built.
6. This document describes *what* and *how it should look and behave*. It does **not** contain a deployment or cloud architecture plan. It only contains constraints (Section 5) so that deployment later is easy.

---

## 1. Project summary

**What it is:** A personal portfolio for an engineering (B.Tech) student, built for the AWS Student Builder Challenge.

**The big idea:** The site has a calm, premium **dark default theme**. The owner's personality changes with mood, so the site has **three "moods"**. Choosing a mood **re-skins the entire website** (colors, fonts, shapes, background visuals, motion, page headings) and unlocks a mood-exclusive story page with one signature interaction.

| Mood | Theme | Signature interaction | Story it tells |
|---|---|---|---|
| **Developer** | Hacker-green code editor (IDE) | Interactive terminal | How the owner debugs and thinks |
| **Anime Watcher** | Manga / shonen collage | "Which anime should you watch?" quiz | Taste, recommendations, lessons from anime |
| **Festival (Diwali Nights)** | Purple night with gold | "Light the Diyas" | Diwali stories and holiday skill-up |

**Why this wins (judging rubric):**

| Rubric item | Weight | How this plan serves it |
|---|---|---|
| Creativity and memorability | 30% | A mood system where each skin has its own story, content and interaction, not a color toggle |
| Working AWS implementation | 25% | Static, fast site that loads reliably; plan keeps deployment simple (Section 5) |
| Communication quality | 25% | The site itself tells a clear story; the mood pages make the write-up easy |
| Completeness and usability | 20% | All three required sections plus extras, plain navigation in every mood, mobile-first behavior |

**Challenge requirements this plan must satisfy** (verify in final QA):
- Three core sections: **About Me, Skills, Projects** — present and easy to find.
- **One creative feature** that is interactive, works, and has a **visible hint**: the mood switcher.
- The creative feature must **not get in the way of navigation**.
- Works on desktop **and** mobile.
- Original design (structure inspired by a design-system-style dev portfolio; the visual identity, moods and content are the owner's own).

---

## 2. Audit results (decisions already made — do not reverse)

The plan was audited for feasibility, conflicts and unnecessary work. These are the outcomes.

### 2.1 Conflicts found and how they were resolved

| # | Conflict / risk | Resolution |
|---|---|---|
| 1 | "Shell never changes" vs the Developer mood needing an IDE layout (activity bar, bottom panel, status bar) | The shell has **named slots** (Section 7). Every mood fills the same slots. Extra IDE parts are *slot content* that exist only in the Developer skin. |
| 2 | Smooth-scroll libraries (Locomotive, Lenis) vs a sticky-sidebar app-style layout | **Both dropped.** Native scrolling is used. Animations use GSAP ScrollTrigger on the normal page scroll. |
| 3 | Two animation systems (GSAP + Framer Motion) | **GSAP only.** Simple transitions use CSS. |
| 4 | Three.js on every device vs fast loading | **One shared WebGL canvas**, loaded *after first paint*, only on capable desktop devices. Phones and reduced-motion users get static visuals. |
| 5 | Scattered anime art across the whole site vs readability, speed and copyright | Limited to **6–8 cut-outs on desktop, 2–3 on mobile**, placed only in the stage margins (never over text), WebP, lazy-loaded after the mood transition. Credits shown in the footer. |
| 6 | Light/dark toggle in default vs the mood system | **Light theme removed.** Default is dark only. The mood switcher is the only theme control. |
| 7 | Language toggle, Design System page, Blog, Journey page | **Removed.** Story lives inside About. |
| 8 | Contact form needs a backend, but the plan must stay deploy-simple | The form UI is built in Phase 1 with a **safe fallback** (opens the visitor's email app). A real delivery endpoint is connected at deployment time (Section 10.9). The form must never fake a success message. |
| 9 | Mood Meter and diya counter need a backend | **Moved out of the core plan.** Mood Meter is an optional stretch (Section 14). Diya counter is a future add-on. |
| 10 | Auto-restoring the last mood on revisit would hide the default design from judges | **A new visit always starts in the default theme.** The mood is remembered only within the current session (refresh/navigation). |
| 11 | Navigation labels changing per mood could confuse visitors | **Navigation labels stay plain and recognizable.** Only page headings (H1) and intro lines change voice per mood. In Developer mood, file names are shown with a plain-name tooltip. |
| 12 | Developer mood "Code view" for every page doubles the work | Code view is **generated automatically from the same content data** by small formatter functions. **Preview view** (normal re-skinned page) is always available and is the default on mobile. |
| 13 | Sound effects | **Removed.** No audio anywhere. |
| 14 | Drag-and-drop tier list, countdown reveal, rangoli maker | **Removed / future add-ons.** Tier list is display-only. |

### 2.2 Things deliberately kept small
- One signature interaction per mood, polished, instead of many.
- One WebGL scene shared by all moods (materials and shaders swap per mood).
- Content in plain typed data files, not a CMS.
- No user accounts, no database, no server code in the core plan.

---

## 3. Recommended tech stack

| Layer | Choice | Role | Notes |
|---|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Pages, routing, component structure | Configured for **static export** (`output: 'export'`) so the site is plain HTML/CSS/JS. Next.js officially lists static export as deployable to hosts such as AWS S3. |
| Styling | **SCSS** (modules + global token files) | All styling, theming | Themes are **CSS custom properties (design tokens)** switched by a `data-mood` attribute on `<html>`. |
| Animation | **GSAP** (+ `@gsap/react` `useGSAP`, ScrollTrigger; SplitText allowed) | Mood transitions, entrance animations, typing/reveal effects, scroll effects | GSAP and all its plugins are free, including commercial use. |
| 3D | **Three.js** (plain, no React wrapper) | The "Mood Crystal" and background particle layer | Loaded with dynamic import, one canvas, one WebGL context. |
| Shaders | **GLSL** (custom `ShaderMaterial` / full-screen shader) | Code rain (Developer), embers and petals (Anime), gold dust / bokeh (Festival), crystal materials | Small, hand-written shaders. |
| 2D effects | **Canvas 2D** | Fireworks finale (Festival) | Short, low-brightness. |
| State | React Context (small store) | Current mood, transition state, palette open/closed | No heavy state library. |
| Icons / logos | **Local SVG files** | Tech logos, UI icons | No external icon CDN. |
| Fonts | **Self-hosted** (resolved at build time) | See Section 8 | Max 3 families per theme, 2 weights each, `font-display: swap`. |

**Deliberately NOT used:** Tailwind CSS (explicitly excluded), Framer Motion (GSAP covers it), Locomotive Scroll and Lenis (conflict with the layout, add weight), React Three Fiber / drei (heavier than needed for one scene), UI kits (MUI, etc.), any server-side feature.

---

## 4. Non-negotiable quality rules

**Performance (latency is a top concern):**
- Default route first-load JavaScript target: **≤ 180 KB gzipped**, excluding the lazy WebGL chunk.
- Largest Contentful Paint target: **≤ 2.5 s** on a simulated mid-range phone on 4G.
- **No WebGL or heavy asset loads before first paint.** The default stage shows a static CSS/SVG crystal first; the WebGL canvas replaces it after idle.
- **Each mood's code, images and shaders load only when that mood is first activated** (dynamic import). Total image weight per mood **≤ 2 MB**.
- All images: WebP (or AVIF), correctly sized, `width`/`height` set, lazy-loaded below the fold. Poster/cut-out images ≤ 150 KB each.
- Pause all animation loops when the tab is hidden or the canvas is off-screen. Cap device pixel ratio at 1.5. Dispose all GPU resources when leaving a mood.
- No layout shift above 0.1.

**Accessibility:**
- Text contrast ≥ 4.5:1 in every theme. Animated backgrounds never sit directly behind text; text sits on solid or dimmed surfaces.
- Everything interactive works by **keyboard and by tap**, with a visible focus ring in every theme. Every hover effect has a tap/click equivalent.
- `prefers-reduced-motion`: no mood transition animation (instant swap with a short fade), no code rain, no particles, no parallax, no typing effects, static crystal image. Everything still works.
- No flashing faster than 3 times per second anywhere (fireworks, glitch, transitions).
- Tabs, dialogs, drawers and accordions use correct ARIA roles and focus handling. Escape closes overlays.

**Responsive:** Designed for 360 px to 1920 px wide. Breakpoints: ≤ 640 (phone), ≤ 1024 (tablet / compact), > 1024 (desktop).

**Browsers:** latest Chrome, Edge, Firefox, Safari, and iOS Safari 16+. If WebGL is unavailable or fails, silently use the static fallback visuals.

**Resilience:** If a mood fails to load (network or script error), show a small message ("That mood couldn't load — back to default") and return to the default theme. The site must never become unusable.

---

## 5. Delivery constraints (so deployment is easy later)

These are constraints, **not** a deployment plan.

- **Static export only.** No server-side rendering at runtime, no API routes, no middleware, no server actions, no cookies-based logic, no runtime image optimization (images are pre-optimized files; use unoptimized image mode).
- Use **trailing-slash routes** so every page exports as `/route/index.html`. Provide a styled **`404` page**.
- **All assets are local files** in the project (fonts, images, SVG logos, shaders). No third-party CDNs, trackers or embeds at runtime. (This avoids blocked requests and extra latency.)
- **No environment-secret dependencies.** Any optional endpoint (contact form, Mood Meter) is read from a single public config value; if it is empty, the feature uses its safe fallback.
- Static assets use **content-hashed file names** (default build behavior) so they can be cached for a long time.
- The build must be one command that produces one output folder.
- Direct links to any page, and to any mood page, must work on a fresh load (Section 9.4).
- A good `README.md` (what it is, how to run, how to build, folder map, screenshots placeholder) is part of the deliverable.

---

## 6. Phases and build order

Build order: **Developer → Anime → Festival** (priority order).

| Phase | Name | Contains | Done when |
|---|---|---|---|
| **1** | Foundation + Default site | Project setup, design tokens, shell, mood **engine** (without any mood), all 7 default pages, command palette, loader, SEO/404, content data layer, responsive behavior | Full default portfolio works on desktop and mobile; a Moods hub page exists with the three moods shown as **"coming soon" (disabled)**; site builds statically |
| **2** | Developer mood | Developer skin, IDE layout, boot sequence, terminal, Problems/Bug Diary, Output/Build log, Find the Bug, How I Debug, Git log, Code/Preview toggle, code rain, wireframe crystal | Developer mood fully works and exits cleanly to default; all other moods still disabled |
| **3** | Anime mood | Anime skin, scattered cut-outs, Anime Shelf (Top 10 cards, filters, tier list, quiz, lessons, queue), manga transition | Anime mood fully works; previous phases untouched |
| **4** | Festival mood + final polish | Festival skin, Diwali Diaries (diyas, finale, skill-up log, Halloween egg), then cross-mood QA, performance pass, accessibility pass, final README | All three moods work; final checklist (Section 15) passes |

**Rules for phases:**
- After each phase, the site must build and run with **no console errors**.
- A mood that is not built yet is **disabled by a feature flag** in a single config file (`moods enabled` list). The hub shows disabled moods as "Coming soon"; the picker, chip and command palette do not offer them. **Before final submission, the owner may hide a disabled mood completely.**
- Phase work must stay inside that phase's folders (Section 7). Touching `core/` after Phase 1 is allowed only for bug fixes or to add a documented, generic extension point.
- Within each phase, build all **[MUST]** items before any **[SHOULD]**.

**If time runs short (cut order):** drop [COULD] items → drop [SHOULD] items of Phase 4 → hide Festival → hide Anime. Phases 1 and 2 are the minimum competitive submission.

---

## 7. Project structure (independent folders)

The structure is designed so each mood is a **self-contained module**: removing or changing one cannot break another.

```
project-root/
├─ content/                      ← ALL owner-specific content (filled from Doc 2). No UI code.
│  ├─ site.ts                    (name, role line, availability, social links, CV path, SEO text)
│  ├─ about.ts  skills.ts  projects.ts  certifications.ts  experience.ts  contact.ts
│  └─ moods/ developer.ts  anime.ts  festival.ts
├─ public/
│  ├─ shared/                    (avatar, OG image, CV file, tech-logo SVGs, favicons)
│  └─ moods/
│     ├─ developer/              (assets used ONLY by the developer mood)
│     ├─ anime/                  (processed WebP cut-outs, posters)
│     └─ festival/
├─ src/
│  ├─ app/                       ← Routes only (thin files). One file per route.
│  ├─ core/                      ← Phase 1. Shared by everything.
│  │  ├─ shell/                  (header card, nav/sidebar, content card, footer bar, bottom dock, slot system)
│  │  ├─ tokens/                 (default theme tokens, spacing, radius, type scale)
│  │  ├─ mood-engine/            (registry, state, transition runner, chip, picker, hub cards, deep-link logic)
│  │  ├─ stage/                  (static fallback crystal, shared WebGL canvas host, shader loader)
│  │  ├─ palette/                (Ctrl/Cmd+K command palette)
│  │  ├─ pages/                  (default views of the 7 pages)
│  │  └─ ui/                     (buttons, pills, tabs, cards, drawer, dialog, tag chips)
│  └─ moods/
│     ├─ developer/              ← Phase 2 (self-contained)
│     ├─ anime/                  ← Phase 3 (self-contained)
│     └─ festival/               ← Phase 4 (self-contained)
│        each mood folder contains: index (mood definition), theme (tokens + skin styles),
│        skin components, features, transition, stage layer/shaders, its own data helpers
├─ DECISIONS.md
└─ README.md
```

**Dependency rules (strict):**
1. `moods/*` may import from `core/` and `content/` only. **A mood must never import another mood.**
2. `core/` never imports mood internals. It reaches moods **only through the registry using dynamic import**.
3. Page components in `core/pages/` read content from `content/` and may offer **override hooks** that a mood can replace (used by the Developer Code view and heading voices).
4. Shared visual components needed by two or more moods go into `core/ui/`, not into a mood.
5. Styles: each mood's styles apply only under its own `data-mood="..."` scope so they cannot leak into other moods or the default.
6. Assets for a mood live only under `public/moods/<mood>/` and load only after that mood activates.

**The Mood Contract.** Every mood exports one definition object with:
`id`, `label`, `tagline`, `enabled flag`, `theme class/tokens`, `slot skins` (optional components for header, nav, content chrome, footer bar, bottom panel, stage layer), `transition` (an `enter` and an `exit` GSAP timeline, max 1.6 s enter and 0.6 s exit), `page headings and intro lines` (Section 9.3), `extra routes/nav items` (its story page), `page view overrides` (Developer only), and `preload list` (assets to fetch on activation).

---

## 8. Design system

### 8.1 Default theme — "Midnight Graphite"
Original identity (do not copy the reference site's blue-and-copper look). Calm and neutral so each mood feels like a real transformation.

| Token | Value (starting point) | Use |
|---|---|---|
| `--bg` | `#0C0B12` | Page/stage background (graphite with violet undertone) |
| `--surface` | `#14131C` | Cards, header, sidebar |
| `--surface-2` | `#1B1A26` | Raised/hover surfaces |
| `--border` | `#2A2838` | Thin borders |
| `--text` | `#ECE9F5` | Headings and main text |
| `--text-muted` | `#A29FB5` | Body secondary |
| `--accent` | `#8F6BFF` (ion violet) | Primary accent, active states, links |
| `--accent-soft` | `rgba(143,107,255,.15)` | Backgrounds for active/hover |
| `--hint-gradient` | `#FF5FA2 → #FFC857 → #3DDC84` | **Only** on the mood hint/chip (pink, gold, green) |
| `--success / --warning / --danger` | green / amber / red | Status only |

- **Shapes:** soft rounded cards (radius 12–16 px), thin 1 px borders, subtle shadow, gentle glow on active items.
- **Typography:** geometric sans for headings and body (recommended: *Sora* or *Space Grotesk* for headings, *Inter* for body) + monospace (*JetBrains Mono*) for small uppercase labels, tags and dates. Page titles end with a small accent-colored dot ("About Me.") with a short accent underline.
- **Corner art:** the **Mood Crystal** — one translucent, slowly rotating crystal (octahedron/icosahedron look) in the bottom-right of the stage, partly behind the content card, with a soft violet glow. Static SVG/CSS version first; WebGL version after idle on desktop only.
- **Stage:** a dark background with very faint grain. No busy patterns.

### 8.2 Mood themes (summary; full specs in Section 10)

| | Developer | Anime | Festival |
|---|---|---|---|
| Base | `#000000` / panels `#04100A` | Ink `#0D0D0F`; content paper `#F6F1E7` | Night plum `#1A0B2E` → indigo `#2B1055` |
| Accent | Neon green `#19FF7A`, cyan `#29D9FF` for links | Red `#E63946`, sakura `#FF9EC7`; per-anime accent takeover | Gold `#F5C04A`, saffron `#FF9933` |
| Decoration colors | Syntax: purple, orange, yellow, red (code only) | Dusk gradient pink→teal behind art | Magenta `#E91E8C`, kandil green `#2BB673`, yellow (decor only) |
| Shapes | **Cut-corner (chamfered)** cards, thin glowing borders, sharp radius (≤ 2 px) | Thick black outlines, panel borders, sticker white outlines | Arch-style ornate borders, gold line art, soft glow |
| Display font (recommended) | A wide techno display font (e.g. Orbitron) for titles; JetBrains Mono for everything else | A bold comic/brush display font (e.g. Bangers or Anton); clean sans for body | A gold script (e.g. Great Vibes) for greetings; elegant serif (e.g. Cormorant Garamond / Playfair Display) for headings; clean sans for body |

The agent may substitute similar free fonts but must self-host them and respect the font limits in Section 3.

---

## 9. Core behavior (applies to the whole site)

### 9.1 The Shell (fixed layout in every mood)
Desktop layout (max content width ≈ 1400 px, centered, with visible stage margins on both sides):

```
┌──────────────────────── HEADER CARD ─────────────────────────┐
├───────── NAV (sidebar) ─────┬──────── CONTENT CARD ───────────┤
│                             │  page title + page content      │
│                             │                                 │
├─────────────────────────────┴──── FOOTER BAR (slot) ──────────┤
```

Named **slots** (every mood skins the same slots):
1. **Stage** (behind everything): background, corner crystal, decorative layer.
2. **Header card:** avatar, name, role line, availability status, Download CV, email, social icons, **mood chip**, command-palette button.
3. **Nav:** sidebar (desktop), bottom dock + drawer (mobile).
4. **Content card:** page title (H1 + accent), page content, in-page footer (© and back-to-top).
5. **Footer bar slot:** empty/thin in default; used as the **status bar** in the Developer skin.
6. **Bottom panel slot:** hidden by default; used by the Developer skin for Terminal/Problems/Output.

**Rules:**
- Slot positions, page order and navigation items **never change** between moods; skins only change appearance and slot content.
- Exception: the Developer skin on desktop may fix the shell to the viewport height (IDE style) with the editor pane scrolling internally. On mobile all moods use normal page scrolling.
- Sidebar is sticky on desktop. On ≤ 1024 px the sidebar becomes a **bottom dock** with five items — **About, Skills, Projects, Moods, Menu** — where **Menu** opens a drawer listing all pages (including Certifications, Experience, Contact). The header compacts (avatar + name + chip + palette button; the rest moves into the drawer).

### 9.2 Pages and navigation (all moods)
Navigation order (plain labels in every mood): **About · Skills · Projects · Certifications · Experience · Moods · Contact**. Routes: `/` (About), `/skills`, `/projects`, `/certifications`, `/experience`, `/moods`, `/contact`, plus mood story routes `/moods/developer`, `/moods/anime`, `/moods/festival`.

When a mood is active, a **mood story item** appears directly under "Moods" in the nav (Developer: "Dev Console", Anime: "Anime Shelf", Festival: "Diwali Diaries"). A **"Back to default"** control is always reachable (mood chip menu, and the Moods page).

### 9.3 Page headings per mood (only the H1 and a one-line intro change; content stays identical)

| Page | Default | Anime | Festival | Developer |
|---|---|---|---|---|
| About | About Me. | Chapter 1: Origin Arc | My Story, by Lamplight | `whoami` |
| Skills | Skills. | Power Levels | Sparks of Skill | `skills.ts` |
| Projects | Projects. | Story Arcs | Projects in Light | `projects.tsx` |
| Certifications | Certifications. | Achievements Unlocked | Lights Earned | `certs.yml` |
| Experience | Experience. | Training Arc | Seasons of Learning | `experience.json` |
| Moods | Moods. | Moods | Moods | Moods |
| Contact | Contact. | Send a Message | Send Your Wishes | `./contact.sh` |

Intro lines (one short sentence per page per mood) are stored in `content/moods/<mood>.ts`. The agent may draft them in the mood's tone, **without personal claims**.

### 9.4 Mood engine behavior

**Entry points** (all use the same engine):
1. **Hero mood banner** on the About page (first screen, visible without scrolling on desktop and mobile): text "**My mood changes… tap to see 🎭**" with the three-color hint gradient and a gentle pulse. Opens the **Mood Picker**.
2. **Mood chip** in the header card (always visible; shows current mood name and icon; opens a compact menu: other moods + "Back to default").
3. **Moods** page (hub): three large preview cards.
4. **Command palette** entries ("Switch to Anime mood", etc.).
5. **Direct links:** opening `/moods/developer`, `/moods/anime` or `/moods/festival` on a fresh load activates that mood.

**Mood Picker** (overlay opened from the hero banner): a dialog with three large mood cards (same component as the Moods hub), a close button and Escape to close. Selecting a card starts the transition.

**Moods hub page** — three preview cards. Each card: mood name, one-line tagline, a **static mini-preview** (color swatches + sample heading in that mood's font + a small decorative shape; no live rendering), and an "Enter this mood" button. A disabled mood shows "Coming soon" and is not clickable.

**Transition lifecycle:**
1. User picks a mood → engine locks input (other mood clicks ignored until done).
2. Start `enter` transition: a full-screen overlay (mood-specific animation, ≤ 1.6 s).
3. At the overlay's midpoint (screen fully covered), the engine: sets `data-mood`, swaps shell skin slots, starts loading the mood's lazy chunk and preload list.
4. If assets are not ready by the end, show a minimal "loading" state on the overlay (max 3 s); on failure, run the **resilience fallback** (Section 4).
5. Overlay reveals the new skin; navigate to the mood's story page on first entry (afterwards, stay on the current page).
6. Unlock input.
- **Exit** to default: short 0.6 s fade/swipe, remove `data-mood`, unmount the mood's stage layer and dispose GPU resources.
- **Mood to mood** switch: exit current then enter next (do not stack).
- Reduced-motion users get an instant swap with a 150 ms fade.

**Persistence:** the current mood is stored for the **current browser session only** (refresh-safe). A new visit/tab starts in **default**. Mood story pages store their own interaction state (e.g. lit diyas) in session storage only.

### 9.5 Command palette (all themes) — [MUST]
Opens with **Ctrl/Cmd + K** or the header search button. Lists: all pages, enabled moods, "Back to default", Download CV, copy email, social links. Type to filter; arrow keys + Enter; Escape closes; focus trap; works on mobile via the button. Styled per mood by tokens only.

### 9.6 Other global features
- **Loader [SHOULD]:** a ≤ 1.2 s name-reveal on the first visit of a session; skipped for reduced-motion and on later pages.
- **Back-to-top button** [MUST], bottom-right, appears after scrolling.
- **Entrance animation** per page (GSAP, subtle fade/slide, ≤ 500 ms).
- **SEO/meta [MUST]:** title, description, Open Graph image, favicon (all from `content/site.ts`).
- **Footer credit line:** "© year Name" and, when the Anime mood is enabled, an "Art credits" link that opens a small dialog listing the art sources provided in content.

---

## 10. Page specifications (default content structure)

All content comes from `content/`. Fields for Doc 2 are named in **`code style`**.

### 10.1 Header card [MUST]
Avatar (`site.avatar`), name (`site.name`), role line (`site.roleLine`, e.g. "B.Tech Student · Aspiring Cloud Engineer"), availability badge with pulsing dot (`site.availability` text, e.g. "Open to internships"), **Download CV** button (`site.cvFile`), email with copy button (`site.email`), social icons (`site.socials[]`: LinkedIn, GitHub, others), **mood chip**, palette button. Link icons have accessible labels.

### 10.2 About (landing page `/`) [MUST]
Sections in order:
1. **Hero strip:** greeting line, large name, typed tagline (rotates 3 phrases from `about.taglines[]`; typing disabled under reduced motion), photo, buttons **View Projects** and **Download CV**. Contains the **mood banner** (Section 9.4) — visible without scrolling.
2. **Profile facts** (left column on desktop): `about.facts[]` as label/value pairs (e.g. Role, College, Degree and year, Location, Graduation year, Focus).
3. **Lead story paragraph:** `about.lead` (the owner's real, personal introduction, 80–140 words).
4. **Tabs [Stats | Focus | My Story]:**
   - **Stats:** 3–4 count-up tiles (`about.stats[]`, number + label; count-up when scrolled into view).
   - **Focus:** `about.focus[]` — what the owner is exploring now (short items).
   - **My Story:** a vertical origin timeline (`about.story[]`: year/period, title, 1–3 sentence text) — how they got into tech and where they're heading. This replaces any separate Journey page.
5. **Areas of Interest:** numbered list (01, 02, …) with icon tile (`about.interests[]`: title, tag, description, icon).
6. **Communities & Hackathons** row (`about.communities[]`: name, logo optional). Hidden if empty.

### 10.3 Skills `/skills` [MUST]
- **Category cards:** Cloud/AWS, Languages, Frontend, Backend, Databases, Tools/DevOps, CS Fundamentals (`skills.categories[]` each with `name` and `items[]` of `{name, logo, note}`).
- Each item = tile with local SVG logo + name. **Tap or hover reveals** the `note` (where it was used) in a small tooltip/popover (tap toggles on mobile).
- **Category filter pills** at the top.
- **"Currently learning"** chips (`skills.learning[]`).
- Optional marquee strip of logos [COULD].

### 10.4 Projects `/projects` [MUST]
- **Filter pills with counts** (All, Web, Cloud, Learning, Hackathon, …) from `projects[].category`.
- **Card grid** (2 columns desktop, 1 mobile). Card fields: `thumbnail`, mono category label, `title`, `summary` (clamped to 2 lines), `tags[]`, `status` (Live / Learning / Archived), links (`live`, `github`, `article` — show only those provided).
- **One featured project** spans full width (`featured: true`).
- **Detail drawer** (no extra route): opens on card click; contains `problem`, `solution`, `techStack[]`, `role`, `learned`, `screenshots[]` (optional), links. Escape/close button; focus returns to the card.

### 10.5 Certifications `/certifications` [MUST]
Same card style as projects. Fields: `image`, `title`, `issuer`, `date`, `credentialUrl` ("Verify" link), optional `description`. Filter pills by issuer/type. Learning-platform certificates and badges are allowed.

### 10.6 Experience `/experience` [MUST]
Tabs: **Experience | Education | Achievements**. Each entry: left date column (`period`), role/title, organization (accent color), up to 4 bullets (with "Show more" if longer), tag chips. Covers internships, club roles, hackathons, open source, courses, and education (`institution`, `degree`, `years`, `score optional`). Empty tabs are hidden.

### 10.7 Moods `/moods` [MUST]
The hub (Section 9.4): short intro paragraph (`moods.intro`), three preview cards, and a line explaining "Pick a mood to re-skin the whole site."

### 10.8 Contact `/contact` [MUST]
Two columns: **info** (email, location, availability, social links) and **form** (name, email, message, honeypot anti-spam field, send button). Form states: idle, validating (inline errors), sending, success, error (with retry). **Honesty rule:** show success **only** when delivery really succeeded. If no delivery endpoint is configured, the button opens the visitor's email app with a prefilled message and shows "Opened your email app." Also include "Copy email" and a LinkedIn link.

### 10.9 Contact delivery (note for later)
The real delivery method is connected after deployment is planned. The form component reads **one public config value** for the endpoint and works in both modes (endpoint present / absent).

---

## 11. Mood 2 (Phase 2) — Developer · "Dev Console"

**Feeling:** the owner's real workspace at 2 AM, mid-debug. Functional, not decorative. Hacker green.

### 11.1 Look and theme — "Phosphor Hacker"
- **Colors:** true black background, very dark green panels, **neon green** primary, **cyan** only for links/selection, syntax colors only inside code and tags (purple keywords, orange strings, yellow warnings, red errors). **Long paragraphs use soft gray-green text, not neon** (readability).
- **Shapes:** **cut-corner (chamfered) cards** via clipped corners, thin green borders with a soft glow, sharp radius.
- **Typography:** wide techno display font for page titles and the boot hero; monospace for all other text.
- **Details:** small HUD-style labels ("SYSTEM ONLINE", "USER: <name>"), faint circuit-line patterns at the edges, glowing angled buttons, blinking block cursor after titles, subtle scanline overlay (≤ 4% opacity).
- **Stage:** faint **code rain** shader (low opacity, behind solid panels; strongest in the boot hero and a green glow rising in the footer area). Corner crystal becomes a **green wireframe polyhedron**.
- **Transition (enter):** short glitch (≈ 400 ms, no strobing) → a **boot log** types out line by line (e.g. "loading mood: developer… mounting skills… ready") → editor fades in. Skippable by click/Escape.
- **Reduced motion:** no rain, no glitch, boot log shown as static text for 600 ms.

### 11.2 Shell skin (same slots, IDE appearance) [MUST]
| Slot | Developer skin |
|---|---|
| Header card | **Title bar:** three window dots, path `user@portfolio: <current-file>`, ⌘K box, availability status, mood chip, **"Back to default"** button |
| Nav | **Activity bar** (icons: Explorer, Search/⌘K, Source Control, Run & Debug, Moods) + **Explorer tree** (file list below) |
| Content card | **Editor pane:** open-file **tabs** (closable), **breadcrumbs** (shows plain page name, e.g. `About`), **line-number gutter**, **Code/Preview toggle** |
| Footer bar slot | **Status bar:** branch `main`, current mood, bug count (from Bug Diary), "build passing", line/column, UTF-8, LIVE dot, **mood switcher** |
| Bottom panel slot | Collapsible panel with tabs **TERMINAL · PROBLEMS · OUTPUT** |

### 11.3 Navigation: every page is a file [MUST]
| File (Explorer) | Opens page | Code-view format |
|---|---|---|
| `about.md` | About | Markdown (headings, quote lines, status comment) |
| `skills.ts` | Skills | TypeScript object by category |
| `projects.tsx` | Projects | TSX-style cards/array |
| `certs.yml` | Certifications | YAML list |
| `experience.json` | Experience + education | JSON entries |
| `contact.sh` | Contact | Shell script lines with real links (clickable) |
| `moods/` folder | Switch moods | `anime.theme`, `festival.theme`, `default.theme` (click to switch) |
| `dev-console/` folder | Developer-only features (see 11.5) | — |

Each file has a plain-name **tooltip** (e.g. hovering `skills.ts` shows "Skills"). Other navigation: open tabs, breadcrumbs, next/previous file arrows, **Ctrl/Cmd+K**. On mobile: Explorer is a slide-in drawer; bottom dock stays; a single scrollable tab strip; Preview view is the default.

**Code / Preview toggle** (every file) [MUST]:
- **Preview** = the normal page content in the Developer skin (chamfered cards, green theme). Always available; **default on mobile**.
- **Code view** = the same content shown as code with line numbers and syntax colors, **generated by formatter functions from the content data** (never hand-written duplicates). **Default on desktop** for the first visit to a file. In Code view, URLs are clickable and the contact form is **not** included (it lives in Preview; `contact.sh` shows a link "open form").
- Toggle is always visible; the choice is remembered for the session.

### 11.4 Boot hero and `whoami` [MUST]
First time the mood opens, the editor shows `about.md` preceded by a short boot sequence ending in a `whoami` readout (name, role, current focus, setup from `developer.setup`). Blinking cursor.

### 11.5 Developer features

**A. Interactive terminal [MUST] — bottom panel, TERMINAL tab (signature interaction)**
- Prompt: `user@portfolio ~ %` with blinking cursor. Panel can be collapsed/expanded; on mobile it opens as a full-width sheet.
- **Commands:** `help`, `whoami`, `skills`, `projects`, `certs`, `experience`, `bugs`, `debug`, `contact`, `theme <default|anime|festival>` (switches mood), `clear`, `secret`, `sudo hire-me`.
- **Output** is built from the content files (never hard-coded text). `bugs` lists the Bug Diary titles; `debug` prints the "How I Debug" steps; `secret` prints `developer.secretFact`; `sudo hire-me` prints a playful line plus contact details (`developer.hireMeLine`).
- **Tappable command chips** above the input list the main commands (essential for mobile).
- **Comfort:** command history (↑/↓), Tab autocomplete, `command not found: x — try 'help'` for unknown input.
- The terminal is a bonus: everything it shows also exists in the files.

**B. Bug Diary — bottom panel, PROBLEMS tab [MUST]**
- Each bug appears as a Problems-panel row with a **severity icon** (error/warning/info), title, source project and file-like location.
- Clicking opens an **incident report** (in the editor as a tab named e.g. `bug-001.log`) with four labeled parts: **Symptom, Root Cause, Fix, Lesson**, plus `timeToFix` and `project`.
- Status bar shows the total bug count; clicking it opens the PROBLEMS tab.
- Source: `developer.bugs[]` (3–4 real bugs).

**C. Output panel — "Build log of this site" [SHOULD]**
- OUTPUT tab shows lines from `developer.buildLog[]` (timestamp-style prefix + message), typed in once when first opened. **Use only the entries in the content file** (the owner fills them after the site is built). Do not invent technologies or services.

**D. Find the Bug — Run & Debug area [MUST for 2 snippets, COULD for the 3rd]**
- A short code file with 1 faulty line. Visitor taps/clicks the line they think is wrong. Wrong → red squiggle + gentle message; **Hint** button reveals a hint (`hint` field); correct → green check + short explanation (`explanation`).
- Counter "bugs squashed X/N". Snippets from `developer.findTheBug[]` (`language`, `code`, `bugLine`, `hint`, `explanation`). Each snippet ≤ 15 lines.

**E. How I Debug — Run & Debug area [MUST]**
- A 5-step stepper: **Reproduce → Isolate → Hypothesize → Fix → Verify**. Each step shows the owner's real example text from `developer.debugFlow[]` (title + 1–2 sentences). Next/Back buttons and clickable step dots.

**F. Git log of my learning — Source Control area [SHOULD]**
- Commit-style list from `developer.gitLog[]`: short hash-like id, message in the owner's voice (e.g. `feat: learned my first loop`), date, optional 1-line detail revealed on click. 5–8 entries.

**G. Easter eggs [COULD]:** Konami code toggles a brief "matrix surge" (no strobe); `secret` and `sudo hire-me` already cover the main ones.

### 11.6 Developer acceptance criteria
- Entering and leaving the mood works from the picker, chip, hub, palette and a direct link.
- Every default page is reachable as a file; Code and Preview views both render real content.
- Terminal works by typing **and** by tapping chips; Bug Diary opens full reports; Find the Bug and How I Debug work on touch.
- No text sits directly on the code rain; contrast passes.
- Leaving the mood fully removes its canvas, listeners and styles.

---

## 12. Mood 3 (Phase 3) — Anime Watcher · "Anime Shelf"

**Feeling:** a manga volume that comes alive. **Rule: the interface is ink and paper; the characters supply the color.**

### 12.1 Look and theme — "Shonen Chronicle"
- **Shell skin:** header card and nav are **ink-black panels with thick white outlines** (sticker/panel-border look); nav items look like panel tabs with a small speech-bubble label on hover/focus. The **content card is a manga paper surface** (off-white `#F6F1E7`, subtle halftone dots, panel gutters) so body text is dark and highly readable. Section headings use the comic/brush display font.
- **Stage:** slowly drifting **dusk gradient** (soft pink → teal) that can shift toward an **ember-lit night** tone, plus floating **embers and sakura petals** (shader/particles, low density).
- **Corner crystal:** becomes a **sakura-and-halftone burst** (static image fallback on mobile).
- **Decorations:** speed lines on hover, halftone corners, panel borders, brush-stroke underlines on headings.
- **Transition (enter):** manga **panels slam across** the screen (GSAP clip-path/transform), then reveal the new skin. Reduced motion: instant swap.

### 12.2 Scattered character cut-outs (stage decoration) [MUST]
- Source images are **provided by the owner** in `public/moods/anime/source/` (the reference wallpapers/art). They are processed once into **cut-out WebP files with a white sticker outline** (and optional duotone/halftone treatment), each ≤ 150 KB, stored in `public/moods/anime/`.
- **Count:** 6–8 on desktop, 2–3 on mobile.
- **Placement:** only in the **stage margins and gutters** around the shell (never above text or controls). Use **3 predefined layouts** (positions, sizes, rotation, depth); each page change switches to the next layout so it feels fresh and never overlaps content.
- **Motion:** each cut-out sits at a different depth with very gentle parallax drift; subtle tilt follows the pointer on desktop only.
- **Loading:** only after the transition ends; lazy and decoded asynchronously.
- **Credits:** a credits list (`anime.credits[]`) shown in the footer "Art credits" dialog.
- No image is ever used as a full-bleed background behind text.

### 12.3 Color takeover [SHOULD]
Each anime in the content has an `accent` color pair. When a card is hovered/focused/opened, the page accent (underlines, glows, card borders) shifts to that anime's color with a short transition. The base ink/paper never changes. Example accents: Naruto orange, Demon Slayer green-checker/orange fire, One Piece red/yellow (Luffy) or teal/gold (Zoro), Attack on Titan ember/olive, Death Note crimson/black, Jujutsu Kaisen ice blue, Dragon Ball blue/gold. (Actual list = owner's Top 10 in Doc 2.)

### 12.4 Anime Shelf page `/moods/anime` [MUST]
Sections in order:

1. **Cover hero:** manga-volume cover titled "Volume 1: The Watcher Arc"; shows `anime.totalWatched`, `anime.topGenre`, a one-line `anime.watcherLine`, and the top 3 posters as cut-outs.
2. **Top 10 wall:** ranked **poster cards** (1–10) in a responsive grid (5 columns desktop → 2 mobile). Poster image = owner-provided (edited/cut-out/duotone), rank badge, title, rating.
3. **Card behavior — flip on tap/click (and Enter/Space); on desktop hover only lifts and tilts:**
   - **Front:** poster, title, rating, genre chips.
   - **Back:** title, year, studio, episodes (researched facts), **my rating**, **my review**, **my experience watching it**, **recommend it to**, **watch it if you like** (2–3 titles), favourite character/moment.
   - **Spoiler shield toggle** on the back: "Spoiler-free" (default) shows `reviewSpoilerFree`; "Full thoughts" shows `reviewFull`.
   - A close/flip-back control; keyboard accessible (cards are buttons; back content is readable by screen readers).
4. **Filters and sort:** genre pills; sort by **My rating** or **Watch first** (`watchOrder`). Filtering animates cards with GSAP; the count updates.
5. **Tier list:** rows **S, A, B, C** filled from each anime's `tier`. **Display-only** (not draggable). Selecting a tier item opens its card.
6. **Signature interaction — "Which anime should you watch?" [MUST]:**
   - 3 questions, each with 3–4 option buttons: **Mood** (hyped / emotional / chill / mind-bending), **Time** (short / medium / long), **Taste** (action / story / comedy / dark).
   - Each anime in content carries `tags` for these answers. **Scoring is deterministic:** +1 per matching tag; highest score wins; ties broken by the owner's rating, then rank.
   - Result screen: the matched poster, the owner's personal reason (`quizReason`), "Watch it if you like…", and **Try again**. Progress dots and Back button between questions. Fully keyboard/touch accessible.
7. **"Lessons from anime" [SHOULD]:** 3–4 cards linking an anime idea to the owner's engineering mindset (`anime.lessons[]`: anime, lesson title, 1–2 sentences).
8. **Currently watching / Next in queue [COULD]:** two small lists (`anime.watching[]`, `anime.queue[]`).

### 12.4a Facts versus personal content
- **Researched by the agent (verify from reliable sources):** year, studio, number of episodes, genres, spoiler-free premise.
- **Provided only by the owner (never invented):** rating, review, experience, recommend-to, favourite moment, tier, quiz reason, lessons.

### 12.5 Other pages in the Anime skin
Same content as default, paper-card styling, comic headings (Section 9.3). Project/cert cards get panel borders; skill tiles get sticker outlines.

### 12.6 Anime acceptance criteria
- Mood enters/exits cleanly; no cut-out overlaps text at any width from 360 to 1920 px.
- Cards flip by tap and keyboard; the quiz always returns a valid result.
- Text contrast on paper passes; performance budget (≤ 2 MB images) holds.
- Leaving the mood disposes the particle layer and unloads nothing needed by other moods.

---

## 13. Mood 4 (Phase 4) — Festival · "Diwali Nights" → "Diwali Diaries"

**Feeling:** a warm, glowing night at home. Quiet, elegant, festive.

### 13.1 Look and theme — "Royal Diwali Night"
- **Balance rule:** a deep **purple night** base; **gold carries the structure** (thin line art, borders, headings, mandalas); **jewel colors** (magenta, pink, yellow, green) appear **only in decoration** (kandils, fireworks, lotus), never in body text or buttons.
- **Stage:** purple night gradient with drifting **gold dust and soft bokeh**; a faint **city-skyline silhouette** at the bottom with a warm glow behind it.
- **Header card:** ornate **arch-style gold border** with a **string-light garland** along the top that twinkles softly.
- **Nav:** each item has a small **hanging diya on a thin chain**. Inactive = unlit; **active item = lit with a flickering flame**.
- **Content card:** deep plum, slightly translucent, thin gold border, **mandala line-art in the corners** and as a very faint watermark; body text on a solid-enough surface.
- **Hanging decorations:** gold **lotus ornaments** and **hanging diyas** drop from the top edge and sway gently. Paper **kandil lanterns** (pink/yellow/green with tassels) float at different depths in the stage margins, **never over text**. Built from original **SVG/CSS/shader art** (reference images are style references only; do not use them directly).
- **Corner crystal:** becomes a **glowing diya** with a flickering flame.
- **Typography:** gold script for greetings and the mood's main title; elegant serif for headings; clean sans for body.
- **Transition (enter):** a single **diya flame** appears, grows and floods the screen with warm light; ornaments and garland lights then drop in. Reduced motion: instant swap.
- **Motion safety:** fireworks and flickers are soft, slow and low-brightness; nothing flashes more than 3 times per second.

### 13.2 Diwali Diaries page `/moods/festival` [MUST]
1. **Welcome hero:** gold script "Happy Diwali" greeting + `festival.greeting` (the owner's 1–2 sentence line) + a row of **five unlit diyas** on a ground line. Visible hint: **"Tap a diya to light it 🪔"**.
2. **Signature interaction — "Light the Diyas" [MUST]:**
   - Tapping/clicking (or Enter/Space on) a diya **lights it** (flame animation) and slides up a **story card** with that diya's story. Diyas are buttons with labels.
   - Five stories from `festival.stories[]` (`title`, `text` 60–120 words, `takeaway`, optional `photo`). Suggested themes: Getting ready · Home and rangoli · Food and sweets · Family, friends and fireworks · What Diwali means to me (the owner's final titles override).
   - **Progress counter** "3/5 lit". State kept for the session; a **"Relight"** button resets.
   - **Finale:** when all five are lit, a short **fireworks show** over the skyline (Canvas 2D, max ≈ 6 s, low brightness, no strobing) and a final card with `festival.finaleMessage` ("My Diwali wish for you"). A **Replay** button is available.
3. **Diwali Break Skill-Up Log [MUST]:** a board of `festival.skillUp[]` items: `topic`, `status` (**Planned / In progress / Done**), `learned` (short text), optional `link`. Items are grouped or colored by status; a **progress ring** shows Done/total. Empty state hides the section.
4. **Halloween easter egg [SHOULD]:** one small, **hidden pumpkin** among the floating lanterns (no hint). Tapping it turns the lit diyas into **glowing jack-o'-lanterns for ≈ 4 seconds** and shows a "treat" card with `festival.halloweenTreat` (a fun fact). Stays small; Diwali remains the star.

### 13.3 Other pages in the Festival skin
Same content as default, gold-line card styling, festive headings (Section 9.3). Skills tiles and project cards get gold borders and a soft glow.

### 13.4 Festival acceptance criteria
- All five diyas, the finale, replay/relight and the skill-up log work by touch and keyboard.
- Ornaments and kandils never cover text; contrast passes on plum surfaces.
- Fireworks respect the motion-safety rules and reduced-motion (static finale card instead).
- Leaving the mood disposes the canvas and animation timers.

---

## 14. Optional stretch (only after all MUST and SHOULD are complete)

- **Mood Meter [COULD]:** a small widget in the header or Moods page showing which mood visitors choose most (counts per mood). Requires a tiny backend later. In the code it must be wired to the same single public config value approach (Section 5): **if no endpoint is configured, the widget is not rendered.** Do not build any backend in Phases 1–4.
- **Font/visual extras [COULD]:** logo marquee on Skills; Konami code in Developer mood.

**Future add-ons (explicitly out of scope):** diya counter, rangoli maker, sound, extra moods, light theme, language toggle, blog, CMS, accounts, comment system, analytics, drag-and-drop tier list, countdown reveal.

---

## 15. Final QA checklist (Phase 4 exit; also run lightly after each phase)

**Challenge requirements**
- [ ] About, Skills and Projects sections exist and are easy to find.
- [ ] The mood switcher has a **visible hint** on the first screen (desktop and mobile).
- [ ] Switching moods works from all entry points and never blocks navigation; "Back to default" always works.
- [ ] All links work (header, footer, project/cert links, social, CV download).
- [ ] The contact form either truly delivers or honestly falls back to email.

**Quality**
- [ ] Looks correct at 360, 768, 1280 and 1920 px in all themes; no horizontal scroll.
- [ ] Keyboard-only run-through of every interactive element succeeds; focus ring visible in all themes.
- [ ] Reduced-motion mode disables transitions, particles, code rain and typing, and everything still works.
- [ ] No console errors. Static build succeeds. Direct URL to every route (including each `/moods/...`) loads correctly.
- [ ] Performance budgets in Section 4 are met on the default route; each mood loads only on activation.
- [ ] No placeholder (`TODO_REPLACE`) text remains.
- [ ] Disabled/unfinished moods are hidden or marked "Coming soon".
- [ ] README is complete.

**Content**
- [ ] Every personal fact comes from `content/` (Doc 2); nothing invented.
- [ ] Anime facts are verified; art credits listed.

---

## 16. Content field reference (what Doc 2 must supply)

Doc 2 will fill these `content/` files. Field names are the contract between the two documents.

- `site`: `name, roleLine, availability, email, location, avatar, cvFile, socials[], seoTitle, seoDescription, ogImage`
- `about`: `taglines[], facts[], lead, stats[], focus[], story[], interests[], communities[]`
- `skills`: `categories[{name, items[{name, logo, note}]}], learning[]`
- `projects[]`: `title, category, thumbnail, summary, tags[], status, featured, links{live, github, article}, problem, solution, techStack[], role, learned, screenshots[]`
- `certifications[]`: `title, issuer, date, image, credentialUrl, description`
- `experience`: `experience[], education[], achievements[]` (each: `period, title, organization, bullets[], tags[]`)
- `contact`: `intro, formEndpoint (optional), calendarLink (optional)`
- `moods/developer`: `setup, secretFact, hireMeLine, bugs[{title, project, severity, symptom, rootCause, fix, lesson, timeToFix}], debugFlow[5], findTheBug[2–3], gitLog[5–8], buildLog[]`
- `moods/anime`: `totalWatched, topGenre, watcherLine, credits[], anime[10] {rank, title, poster, accent{a,b}, year, studio, episodes, genres[], premise, rating, reviewSpoilerFree, reviewFull, experience, recommendTo, watchIfYouLike[], favouriteMoment, tier, tags{mood[], time, taste[]}, watchOrder, quizReason}, lessons[3–4], watching[], queue[]`
- `moods/festival`: `greeting, stories[5], finaleMessage, skillUp[3–6], halloweenTreat, photos (optional)`
- Per-mood `intro lines` for each page: drafted by the agent (no personal claims).

---

*End of Doc 1.*
