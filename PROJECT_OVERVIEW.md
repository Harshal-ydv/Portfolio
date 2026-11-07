# Harshal Yadav Portfolio — Project Overview

**Purpose:** A personal portfolio for the AWS Student Builder Challenge, designed to tell Harshal’s story, show evidence of his cloud work, and feature one working interactive experience.

**Current release:** The default Midnight Network portfolio and the complete Developer mood are visitor-facing. The Moods page presents the working Developer experience only. The larger plan and source data remain in the repository for later work; this overview documents the current release.

## What the site contains

The portfolio is a content-driven, responsive site with a shared header, sidebar navigation on desktop, mobile navigation, search palette, and consistent footer.

| Route | Visitor-facing content |
| --- | --- |
| `/` | About Me: profile, personal story, stats, interests, community work, and a visible link to the Developer mood. |
| `/skills/` | Skill categories and filters, technology logos, notes showing where a skill was used, and current learning topics. |
| `/projects/` | Six project cards with screenshots, category filters, project details, technologies, role, lessons learned, and available repository/demo links. |
| `/certifications/` | Six certificate, badge, and hackathon entries with their local images, issuers, descriptions, and available verification links. |
| `/experience/` | Community and cloud experience, education, and achievement timeline. |
| `/moods/` | A focused entry point to the working Developer mood, with instructions for discovering its terminal interaction. |
| `/moods/developer/` | The same portfolio presented as an interactive, VS Code-inspired workspace. |
| `/contact/` | Email, location, social links, and a validated form that opens a prefilled message in the visitor’s email app. |

The contact form does not send or store messages on a server. It uses the visitor’s configured email application.

## Creative feature: Developer mood

Developer mood is the site’s current creative feature. It is directly reachable at `/moods/developer/` and through visible links from the default portfolio and Moods page.

- The interface resembles a compact code editor, with a file explorer, code and preview views, a problems panel, and a working interactive terminal.
- Visitors can switch between the default portfolio and Developer presentation. The underlying portfolio pages and content remain navigable in the workspace.
- Terminal commands expose useful portfolio content (`help`, `whoami`, `skills`, `projects`, `certs`, `experience`, `bugs`, `debug`, `contact`), a hidden personal fact (`secret`), and a playful contact action (`sudo hire-me`).
- Additional interactions include guided debugging notes, selectable incident reports, a “find the bug” exercise, and a learning log.
- A Canvas 2D backdrop animates code rain and network nodes. Animated SVG constellations add a separate frame detail. Motion is reduced when the visitor has `prefers-reduced-motion` enabled.
- The default page includes a visible hint that points visitors toward Developer mood and tells them how to discover the terminal.

The Moods hub and static route generation use `enabledMoodIds` in `content/moods.ts`. In this release only the Developer mood is enabled, so unfinished mood choices are not presented as placeholders or generated as public routes. Their plan and source definitions remain intact for later development.

## Visual design and interaction

- **Default palette:** Midnight Network, built around deep navy backgrounds, blue and cyan accents, layered panels, and subtle network artwork.
- **Developer palette:** Phosphor green with cyan details, a full-window IDE layout, animated background canvas, and an animated SVG constellation motif.
- **Layout:** Centered desktop shell with visible side gutters and background art; responsive navigation and card layouts for smaller screens.
- **Typography:** Manrope for headings, Inter for body copy, and DM Mono for labels and code-like metadata.
- **Usability:** Semantic links and controls, visible keyboard focus, mobile layouts, and reduced-motion handling.
- **Assets:** Project screenshots, certificate images, skill logos, fonts, and decorative artwork are served locally from `public/`.

## Technology stack

| Area | Technology |
| --- | --- |
| Framework and routing | Next.js App Router (`next` 16.x), React 19, TypeScript |
| Styling | Sass, global design tokens, component-specific stylesheets |
| Fonts | Manrope, Inter, and DM Mono from Fontsource packages |
| Animation | CSS transitions/keyframes, SVG, and Canvas 2D; no background video dependency |
| Images | Local static assets; Next Image configured with `unoptimized: true` for static export |
| Hosting target | AWS Amplify Hosting with Git-connected continuous deployment |
| Rendering mode | Next.js static export (`output: "export"`) |

No runtime server or API is required for the portfolio itself. The visitor-side interactions run in the browser. Project details and all portfolio content are stored in the repository.

## Repository map

| Path | Contents |
| --- | --- |
| `src/app/` | App Router pages, root layout, and shared global styles. |
| `src/core/` | Shared portfolio shell, navigation, page components, icons, and overlays. |
| `src/moods/developer/` | Developer workspace, interactive panels, background animation, and mood-specific styles. |
| `content/` | Editable portfolio facts, projects, skills, certifications, experience, and mood configuration. |
| `public/projects/` | Project screenshots used in the project cards. |
| `public/certifications/` | Certificate and badge images. |
| `public/skill-logos/` | Technology logos used in the skill cards. |
| `public/shared/` | Shared visual assets, including the background artwork and resume. |
| `DOC1_PORTFOLIO_PLAN.md` | Full project and phased feature plan. Keep this as the roadmap for future releases. |
| `DOC2_CONTENT_DATA.md` | Owner-provided content planning reference. |

## Run and build locally

Use Node.js with npm and the committed `package-lock.json`:

```bash
npm ci
npm run dev
```

Create the production static export with:

```bash
npm run build
```

The export is written to `out/`. Since this repository has `trailingSlash: true`, generated page routes use directory-style paths such as `out/projects/index.html`.

## AWS Amplify Hosting deployment

The site is configured as a static export, so Amplify should publish the files in `out/`. This is a static website deployment: it does not need a Next.js runtime server, Lambda functions, backend environment variables, or server-side rendering. Next.js documents that `output: "export"` generates the `out` directory; use that actual build output as the Amplify artifact directory. [Next.js static export guide](https://nextjs.org/docs/app/guides/static-exports)

### Build specification

If saving the build settings in the repository, add an `amplify.yml` at the project root with:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: out
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

The repository currently has no `amplify.yml`; this file is the recommended build configuration to add when wiring up Hosting. Amplify documents repository-based build settings and notes that an `amplify.yml` takes precedence over console settings. [Amplify build settings](https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html) · [Amplify Next.js deployment settings](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html)

> **Artifact directory matters:** keep `baseDirectory: out` for this project because `next.config.ts` explicitly enables a static export. Amplify’s standard Next.js SSR/compute flow uses `.next`; that is a different deployment mode. Confirm the build log reports the `out/` artifact before relying on the hosted link.

### Suggested continuous deployment steps

1. Push the project to its public GitHub repository and ensure `package-lock.json` is included.
2. In AWS Amplify Hosting, create an app by connecting that repository and the deployment branch. Use the repository root as the app root.
3. Add the build specification above, or confirm the detected commands are `npm ci` and `npm run build` and that the published artifact directory is `out`.
4. Deploy the branch and wait for the build and deployment to complete. Amplify will provide an HTTPS `amplifyapp.com` URL.
5. Open the deployed home page and every route in the table above, including `/moods/developer/`, to verify direct links work after static export.
6. If using a custom domain, associate it with the deployed Amplify app and follow the DNS verification steps shown in Amplify. Amplify supports a managed TLS certificate for a connected domain. [Amplify custom domains](https://docs.aws.amazon.com/amplify/latest/userguide/custom-domains.html)
7. Commit and push each later portfolio update to the connected branch. Amplify’s Git-connected hosting can rebuild and publish the updated static site from that branch.

For updates to the site’s absolute Open Graph URL, set `publicUrl` in `content/site.ts` to the final public origin after deployment. It is intentionally blank before a public URL is selected.

### AWS services used by the portfolio deployment

| Service | Role |
| --- | --- |
| AWS Amplify Hosting | Git-connected build and static hosting; provides the hosted URL and deployment workflow. |
| Amazon CloudFront | Content delivery used by Amplify Hosting for the deployed site. |
| AWS Certificate Manager | Managed TLS certificate when a custom domain is connected through Amplify. |

The interactive portfolio runs in the browser; no AWS backend resources are required by this website. Other AWS services mentioned on the portfolio pages belong to Harshal’s listed projects, not this portfolio’s hosting architecture.

## Before public submission

- Confirm the public GitHub repository URL and add it to the portfolio/submission where required.
- Replace any remaining draft or unverified personal details and check all external URLs.
- Confirm every project screenshot and certificate image matches its card.
- Capture screenshots of the deployed portfolio and the AWS Amplify setup for the project write-up.
- Record the services actually configured and the deployment steps observed; keep claims aligned with the final AWS setup.

## Deployment references

- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [AWS Amplify build settings](https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html)
- [Deploying a Next.js application with Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html)
- [AWS Amplify custom domains](https://docs.aws.amazon.com/amplify/latest/userguide/custom-domains.html)
