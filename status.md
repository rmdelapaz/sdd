# SDD Project — Modernization Status

## Project
- **Folder:** `\\wsl$\Ubuntu\home\practicalace\projects\sdd`
- **Reference template:** `\\wsl$\Ubuntu\home\practicalace\projects\course_template`
- **Goal:** Update all pages to match course_template structure/format with full light/dark toggle, theme-aware Mermaid/SVG/Canvas, consistent nav/footer, content enhancements.

---

## Infrastructure (✅ COMPLETE)

### `styles/main.css` — Consolidated CSS
- Merged old `main.css`, `index.css`, and `agnostic.css` into a single file
- Full CSS custom properties for light/dark themes
- **Canvas theme variables** (`--canvas-bg`, `--canvas-text`, `--canvas-accent-1` through `--canvas-accent-5`, `--canvas-highlight`, `--canvas-danger`, `--canvas-muted`, `--canvas-card`, `--canvas-border`, `--canvas-sky`, `--canvas-grass`, `--canvas-road`) — these are read by JS to draw canvases in the correct theme colors
- Dark values defined in `:root[data-theme="dark"]` and `@media (prefers-color-scheme: dark)`
- Module accent colors: `--foundation-color`, `--core-color`, `--technical-color`, `--quality-color`
- Cards: `.card`, `.card-success`, `.card-warning`, `.card-info`, `.card-danger`, `.card-accent`, `.card-output`
- Lesson cards: `.lesson-card`, `.lesson-card.foundation`, `.lesson-card.core`, `.lesson-card.technical`, `.lesson-card.quality`
- Full nav, breadcrumb, TOC, quiz, footer, lesson-nav, progress bar, search results, keyboard shortcuts modal, print styles, accessibility, scrollbar
- Responsive breakpoints at 768px and 1024px with mobile menu

### `js/clipboard.js` — Copy-to-clipboard for code blocks
- Wraps `<pre><code>` blocks with copy button
- Uses CSS variables for theming

### `js/course-enhancements.js` — Main enhancement script
- **Theme toggle** with `localStorage` persistence, `data-theme` attribute on `<html>`
- **Mermaid re-initialization** on theme change via `window.__mermaid` pattern
- **Canvas redraw system:**
  - `window.registerCanvas(canvasId, drawFunction)` — pages register their canvas draw functions
  - `window.getCanvasColors()` — reads CSS custom properties and returns a palette object
  - `window.redrawAllCanvases()` — called on theme change and initial load
  - Draw functions receive `(ctx, width, height, colors)` where `colors` is the resolved palette
- Progress indicator (scroll), smooth scrolling, interactive TOC, search, keyboard shortcuts
- Lesson progress tracking (`localStorage` key: `sddLessonProgress`)
- Quiz interactivity, mobile menu, accessibility, print, local analytics
- `localStorage` keys use `sdd` prefix to avoid collision with other courses

---

## Housekeeping TODO
- [ ] **Delete** `styles/index.css` — no longer used, replaced by consolidated `main.css`
- [ ] **Delete** `styles/agnostic.css` — no longer used, replaced by consolidated `main.css`

---

## Pages Status

### ✅ index.html — COMPLETE
- Full template structure: nav, breadcrumb, footer, progress bar, skip-to-main
- Theme toggle in nav
- Mermaid roadmap diagram (theme-aware)
- `welcomeCanvas` and `tipsCanvas` use `registerCanvas()` with theme colors
- Lesson cards with `.lesson-link` class for progress tracking
- Module-colored left borders (foundation=green, core=blue, technical=amber, quality=purple)
- Learning paths section, search bar, accent CTA card
- Relative paths (`styles/main.css`, not `/styles/main.css`)

### ✅ software_design_intro.html (Lesson 1) — COMPLETE
- Full template: nav, breadcrumb (Home > Foundation > Lesson 1), footer
- Learning objectives card, sticky TOC with 8 sections
- `chaosCanvas` — theme-aware, shows divergent team vs. aligned team in one visual
- `orchestraCanvas` — theme-aware, conductor + 5 musician sections
- 2 Mermaid diagrams (theme-aware)
- Content enhanced: added cost-of-skipping warning card, "Opinionated" as 5th SDD quality, deeper analogies
- Prev/next nav: no previous (first lesson), next → sdd_anatomy.html

### ✅ sdd_anatomy.html (Lesson 2) — COMPLETE
- Full template: nav, breadcrumb (Home > Foundation > Lesson 2), footer
- Learning objectives card, sticky TOC with 8 sections
- `elevatorCanvas` — theme-aware, elevator pitch scene with two people + floor indicator
- `architectureCanvas` — theme-aware, 3-tier architecture with rounded boxes and arrow labels
- `interfaceCanvas` — theme-aware, mobile phone → API layer → external services with dashed connectors
- 4 Mermaid diagrams (theme-aware): SDD structure tree, system overview, ER diagram, living document cycle
- Content enhanced: added book analogy card, common pitfalls warning, actor identification tip, architecture decisions checklist, interface design questions, non-relational data warning
- Inline styles replaced with card classes
- Prev: software_design_intro.html | Next: system_overview_guide.html

### ✅ system_overview_guide.html (Lesson 3) — COMPLETE
- Full template: nav, breadcrumb (Home > Foundation > Lesson 3), footer
- Learning objectives card, sticky TOC with 8 sections
- `museumCanvas` — theme-aware, museum floor with entrance arch, 3 numbered exhibit stops, tour guide with speech bubble, dashed tour path
- `pyramidCanvas` — theme-aware, clarity pyramid with 3 tiers, side annotation lines with examples
- `trailerCanvas` — theme-aware, film strip with 4 colored frames, sprocket holes, timeline arrow
- 3 Mermaid diagrams (theme-aware): storytelling mindmap, pitfalls flowchart, zoom lens progression
- Content enhanced: dinner party test card, "Why This Works" callout on example, inverted pyramid trap warning, acronym soup anti-pattern danger card, scope boundaries addition to checklist, grandmother test card, key takeaway
- Inline styles replaced with card classes; bullet HTML replaced with proper `<ul>` lists
- Prev: sdd_anatomy.html | Next: architecture_diagrams_guide.html

### ✅ architecture_diagrams_guide.html (Lesson 4) — COMPLETE
- Full template: nav, breadcrumb (Home > Core > Lesson 4), footer
- Learning objectives card, sticky TOC with 8 sections
- `shapesCanvas` — theme-aware, 6-shape vocabulary grid (rectangle, cylinder, cloud, diamond, circle, queue) with legend box
- `containerCanvas` — theme-aware, C4 Level-2 diagram with rounded boxes, cylinder DB, directional arrows via Math.atan2, dashed system boundary, external user icon
- `storyCanvas` — theme-aware, 4-panel comic strip with numbered panels, inter-panel arrows
- `comparisonCanvas` — theme-aware, split Before/After with tinted backgrounds, spaghetti lines vs clean fan-out, question marks vs checkmark
- 3 Mermaid diagrams (theme-aware): C4 zoom levels, anti-patterns flowchart, tools mindmap
- Content enhanced: C4 Level-4 warning, "Everything" diagram danger card, new hire test info card, tool recommendation card, exercise improvements checklist, key takeaway
- Inline styles replaced with card classes
- Prev: system_overview_guide.html | Next: data_design_modeling.html

### ✅ data_design_modeling.html (Lesson 5) — COMPLETE
- Full template: nav, breadcrumb (Home > Core > Lesson 5), footer
- Learning objectives card, sticky TOC with 8 sections
- `libraryCanvas` — theme-aware, bookshelf sections (Users/Orders/Products/Reviews) with index card and dashed lookup arrow
- `normalizationCanvas` — theme-aware, split Before/After with redundant data highlighted in red vs clean normalized tables with relationship lines
- `databaseTypesCanvas` — theme-aware, 4-column comparison (Relational/Document/Key-Value/Graph) with decision guide box
- 4 Mermaid diagrams (theme-aware): social media ER diagram, order data flow DFD, migration flowchart, healthcare ER diagram
- Content enhanced: crow's foot notation explainer, denormalized counter warning, normal forms card, over-normalization warning, DFD levels info card, DFD vs flowchart danger card, polyglot persistence warning, migration safety checklist, "fix it later" trap danger card, design decisions documentation card, key takeaway
- Inline styles replaced with card classes
- Prev: architecture_diagrams_guide.html | Next: api_interface_design.html

### ✅ api_interface_design.html (Lesson 6) — COMPLETE
- Full template: nav, breadcrumb (Home > Technical > Lesson 6), footer
- Learning objectives card, sticky TOC with 8 sections
- `restaurantCanvas` — theme-aware, restaurant building with menu board (GET/POST/PUT/DELETE), client stick figure, speech bubble, request/response arrows, JSON response box
- `versioningCanvas` — theme-aware, timeline with 4 version circles, deprecation markers, active versions dashed boundary, URL examples
- `errorCanvas` — theme-aware, 4 color-coded HTTP error blocks (400/401/404/500) with detail cards and monospace error field text
- `comparisonCanvas` — theme-aware, REST vs GraphQL split with pros/cons and code examples, VS divider
- 3 Mermaid diagrams (theme-aware): REST principles tree, JWT auth sequence diagram, API docs requirements
- Content enhanced: menu-as-contract card, REST style vs standard warning, verb idempotency cheat sheet, good endpoint patterns card, versioning approaches card, "just don't break anything" danger card, JWT pitfalls warning, error contract template with code, status code groups reference, REST vs GraphQL decision guide, rate limiting strategies warning, "internal API" trap danger card, key takeaway
- Inline styles replaced with card classes; code samples wrapped in pre/code for clipboard support
- Prev: data_design_modeling.html | Next: security_considerations.html

### ✅ security_considerations.html (Lesson 7) — COMPLETE
- Full template: nav, breadcrumb (Home > Technical > Lesson 7), footer
- Learning objectives card, sticky TOC with 8 sections
- `castleCanvas` — theme-aware, defense-in-depth castle with 4 labeled layers (moat/outer wall/inner wall/keep), guard dots, attacker figure, layer labels on right
- `authCanvas` — theme-aware, split layout: Authentication (user→bouncer→checkmark with ID card) vs Authorization (4 color-coded room boxes with lock icons), method lists below
- `encryptionCanvas` — theme-aware, 3-panel layout: Data at Rest (DB cylinder with lock) → TLS tunnel arrows → Client App (computer icon), bullet lists per section, danger warning bar
- `pipelineCanvas` — theme-aware, 5-stage CI/CD pipeline with colored circles, connecting arrows, test labels (SAST/Dep Scan/DAST/Config Scan/Runtime)
- 4 Mermaid diagrams (theme-aware): STRIDE threat model, banking zone architecture (fixed broken </graph> tag), OWASP Top 10 mitigations, Zero Trust principles
- Content enhanced: four defense layers card, threat modeling isn't one-and-done warning, zone architecture explanation card, admin flag anti-pattern danger card, common auth patterns card, injection isn't just SQL warning, OWASP #4 insecure design info card, encryption specification guide, never roll your own crypto danger card, security testing stage descriptions, zero trust in practice card, SDD security checklist, security through obscurity danger card, key takeaway
- Inline styles replaced with card classes; fixed broken Mermaid `</graph>` tag
- Prev: api_interface_design.html | Next: performance_scalability.html

### ✅ performance_scalability.html (Lesson 8) — COMPLETE
- Full template: nav, breadcrumb (Home > Quality > Lesson 8), footer
- Learning objectives card, sticky TOC with 8 sections
- `highwayCanvas` — theme-aware, split view: single-lane traffic jam (sequential) vs multi-lane highway (parallel) with car icons, VS divider, throughput labels
- `metricsCanvas` — theme-aware, 3×2 KPI card grid (Response Time / Throughput / Error Rate / CPU / Memory / Uptime) with color-coded headers, value display, performance equation
- `dbOptCanvas` — theme-aware, Before/After split: unoptimized SELECT * with full table scan vs optimized parameterized query with index scan, 100× speedup badge, problem/fix bullet lists
- `patternsCanvas` — theme-aware, 3-column layout: Microservices (stacked service boxes), Event-Driven (central bus with pub/sub nodes), CQRS (split command/query box with separate DB icons), dashed arrow with scaling note
- 3 Mermaid diagrams (theme-aware): vertical vs horizontal scaling, caching flow with cache layers, load testing strategy tree
- Fixed broken `</graph>` tag in streaming architecture Mermaid diagram
- Content enhanced: concurrency vs parallelism warning, percentiles vs averages warning, Four Golden Signals card, cache invalidation patterns (TTL/write-through/write-behind/event-driven), "cache everything" anti-pattern, streaming platform strategies, database optimization checklist, read replica trap warning, "optimize later" fallacy, load test type explanations, tool recommendations card, budget enforcement danger card, pattern selection guide, over-architecture warning, performance commandments, key takeaway
- Inline styles replaced with card classes; table uses semantic HTML instead of inline styles
- Prev: security_considerations.html | Next: testing_quality_assurance.html

### ✅ testing_quality_assurance.html (Lesson 9) — COMPLETE
- Full template: nav, breadcrumb (Home > Quality > Lesson 9), footer
- Learning objectives card, sticky TOC with 8 sections
- `pyramidCanvas` — theme-aware, three-layer pyramid (Unit/Integration/E2E) with distinct colors, percentage labels, detail boxes on right, cost/speed arrow on left, bottom examples
- `tddCanvas` — theme-aware, Red-Green-Refactor cycle with three connected circles, directional arrows using atan2, center TDD label, step descriptions
- `gatesCanvas` — theme-aware, CI/CD pipeline track with 5 gate posts, sign boxes with criteria, pass/fail/pending status indicators, blocked X at Security gate, alert message
- `perfTestCanvas` — theme-aware, load test chart with proper axes, tick marks, exponential response time curve, acceptable threshold dashed line, breaking point vertical marker, green/red zone tinting
- 4 Mermaid diagrams (theme-aware): testing types mindmap, e-commerce checkout test strategy, bug lifecycle stateDiagram-v2, continuous quality team graph
- Fixed both broken `</graph>` tags (checkout strategy diagram and quality team diagram)
- Content enhanced: pyramid shape rationale, ice cream cone anti-pattern warning, regression/smoke/exploratory testing descriptions, "no time for tests" danger card, TDD three-step detail, TDD isn't all-or-nothing warning, edge cases warning, quality gate definitions with pass criteria, "skip CI" escape hatch danger card, priority vs severity distinction, good bug report template, load test result interpretation, realistic test data warning, testing commandments (expanded with explanations), "green tests" fallacy danger card, key takeaway
- Inline styles replaced with card classes; code sample wrapped in pre/code for clipboard support
- No next lesson (final lesson); Prev: performance_scalability.html

---

## Pattern for Updating Each Lesson

Each remaining lesson file needs:

1. **HTML structure** — wrap content in the full template:
   - `<a class="skip-to-main">`, progress indicator, `<nav class="main-nav">` with theme toggle
   - Breadcrumb: `Home > Module Name > Lesson X: Title`
   - `<main id="main-content"><div class="container">` wrapper
   - Learning objectives card (`card card-info`)
   - Sticky TOC (`details.toc-card`)
   - Content sections with `id` attributes for TOC linking
   - Lesson nav at bottom (prev/next)
   - Footer
   - JS includes: `js/clipboard.js` + `js/course-enhancements.js`

2. **Mermaid** — theme-aware initialization:
   ```html
   <script type="module">
       import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
       window.__mermaid = mermaid;
       const isDark = localStorage.getItem('theme') === 'dark' ||
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
       mermaid.initialize({
           startOnLoad: true,
           theme: isDark ? 'dark' : 'default',
           themeVariables: isDark
               ? { primaryColor: '#334155', primaryTextColor: '#e2e8f0', primaryBorderColor: '#6366f1', lineColor: '#94a3b8', secondaryColor: '#1e293b', tertiaryColor: '#0f172a' }
               : { primaryColor: '#eff6ff', primaryTextColor: '#1e293b', primaryBorderColor: '#3b82f6', lineColor: '#64748b', secondaryColor: '#f8fafc', tertiaryColor: '#f1f5f9' }
       });
   </script>
   ```

3. **Canvas elements** — convert to `registerCanvas()`:
   - Replace all hardcoded colors with palette properties from the `colors` parameter
   - Common palette keys: `C.bg`, `C.text`, `C.textLight`, `C.accent1`–`C.accent5`, `C.highlight`, `C.danger`, `C.muted`, `C.card`, `C.border`, `C.sky`, `C.grass`, `C.road`, `C.primary`
   - Remember to reset `ctx.textAlign` to `'start'` at end of draw functions that change it

4. **Inline styles** → CSS classes:
   - `background-color: #f5f5f5; padding: 20px; border-radius: 8px;` → `class="card"` or `class="card card-info"` etc.
   - `background: #263238; color: #aed581;` (dark code blocks) — these can stay as inline since they represent intentionally dark-on-dark code samples, but wrap in `<pre><code>` for copy button support

5. **Paths** — use relative:
   - `styles/main.css` (not `/styles/main.css`)
   - `favicon.png` (not `/favicon.png`)

6. **Content review** — enhance as appropriate:
   - Add depth to explanations
   - Improve analogies
   - Add warning/tip/success cards where helpful
   - Fix any broken Mermaid syntax (`</graph>` → proper closing)

7. **Fix known Mermaid bugs** in Lessons 7, 8, 9:
   - Several diagrams have `</graph>` instead of proper closing — these need to be removed (Mermaid uses `</div>` container, not self-closing graph tags)

---

## Key File References

| File | Purpose |
|------|---------|
| `styles/main.css` | Single consolidated CSS with light/dark custom properties |
| `js/course-enhancements.js` | Theme toggle, Mermaid reinit, canvas redraw system, all interactive features |
| `js/clipboard.js` | Copy-to-clipboard buttons on code blocks |
| `course_template/` | Reference project for structure/patterns (read-only) |

---

*Last updated after completing: index.html + Lessons 1–9 (all lessons complete). Only housekeeping remains: delete styles/index.css and styles/agnostic.css.*