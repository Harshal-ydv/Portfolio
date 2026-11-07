# Implementation decisions

- Use Next.js App Router with TypeScript and static export because the portfolio is content-led, route-based, and intended for static AWS hosting.
- Keep all owner-specific copy in typed files under `content/`; render missing documents and links as unavailable instead of creating fabricated assets or broken destinations.
- Use the supplied network image as a locally hosted, low-opacity stage decoration; keep it clear of text and use a static fallback only during Phase 1.
- Keep the document's Midnight Graphite mood concept ready for future mood phases, while applying the newer Midnight Network palette as the Phase 1 default identity.
- Phase 1 mood cards are disabled and clearly marked Coming soon; no later mood implementation is included here.
- The contact form uses a validated mailto fallback until a real delivery endpoint is configured.
- Use native CSS for Phase 1 micro-interactions and count-up; defer GSAP and WebGL until a later mood needs the choreography, keeping the default route light.
- Phase 2 activates only Developer; keep the mood switch in session storage and scope its skin to `html[data-mood="developer"]` so the default theme stays isolated.
- Keep Developer's Canvas 2D backdrop and animated SVG constellations at viewport level behind the workspace so they span the page and stay visible; strengthen contrast, cap canvas resolution, pause while hidden, and respect reduced-motion preferences.
- Treat DOC2's `DRAFT_VERIFY` incident and setup details as draft content in the interface, describe the Git items as a learning log rather than real commits, and keep the build log empty until real deployment notes exist.
- Hide Next.js's development route badge in the local preview; compilation and runtime errors remain enabled.
- Match Developer mood outer gutters to the default shell so the canvas and wireframe stage remain visible around the workspace.
- Fit the desktop Developer IDE to the viewport height so the terminal panel is visible without page scrolling; keep the code editor independently scrollable and let mobile return to natural page flow.
