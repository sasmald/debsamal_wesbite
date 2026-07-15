# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio website for Debashish Sasmal — product/venture builder targeting Director/GM roles, with a secondary read for Principal/Lead PM roles. Positioning: "I build and exit products in the markets most people avoid: regulated, AI-enabled, expert-heavy." Builder-founder energy, GM buyer as primary audience.

## Development

Static HTML/CSS/JS site — no build step, no package manager, no test suite. To preview locally (required for header/footer injection to work; `file://` URLs block the component scripts in some browsers):

```
npx serve ds_website
```

or use VS Code's Live Server extension pointed at `ds_website/`. Then open `index.html` (or any other page) at the root of `ds_website/`.

## Deployment

Live at debashishsasmal.com (dsasmal.com redirects to it via a Namecheap domain forward, not hosted). `.github/workflows/deploy.yml` publishes `ds_website/` to GitHub Pages on every push to `main` (no build step, just a static-file publish). DNS (A records for the apex domain to GitHub Pages' IPs) lives in Namecheap, not in this repo. `ds_website/CNAME` pins the custom domain.

## Repository layout

```
Planning/
  website-copy-v1.md                      — original content strategy draft (superseded in places by star_stories/ detail)
  Homepage (standalone).html              — design prototype v1 (self-contained bundle)
  Homepage v2 Hybrid (standalone).html    — design prototype v2
  Homepage v2 Hybrid (standalone) 2.html  — design prototype v2b (base for build)

star_stories/                             — source material: detailed STAR-format career narratives (.docx)
  Safar_Complete_STAR_Suite.docx              — source for the Acute-Care Virtual Platform case study
  BrainCheck_ADRD_Complete_Suite.docx         — source for the Cognitive Screening Platform case study
  Glimmer_Complete_STAR_Suite_FINAL.docx      — source for the Chronic-Pain Care Venture case study
  Glimmer+Safar_KPIs.docx                     — supplementary KPI/figures doc for the above two
  ⚠️ These contain real company/product/acquirer/partner names (e.g. "Safar," "BrainCheck," "Glimmer,"
  specific EHR/acquirer/partner names). Never quote these names directly in site copy — describe
  everything by function ("a tele-critical-care platform," "a cognitive/ADRD screening product," "a
  strategic acquirer," "the market-leading EHR"). See Redaction policy below.

ds_website/                               — active build (start here); published as-is to GitHub Pages
  index.html      — Home / hero hub
  work.html       — Case studies (accordion) + experience timeline
  ai.html         — AI point of view + personal builds
  about.html      — Through-line + Signal (podcast/speaking/advisory) + experience
  contact.html    — Contact CTA page
  CNAME           — Pins the custom domain (debashishsasmal.com) for GitHub Pages
  resumes/        — PDF résumé(s) linked from contact.html's "Download résumé" CTA
  components/
    header.js       — Shared nav (injected via data-include="header"); also renders a mobile
                       hamburger toggle (.nav-toggle / .nav-menu) below the 780px breakpoint
    footer.js       — Shared footer (injected via data-include="footer")
  styles/
    tokens.css      — CSS custom properties + Google Fonts import; --pad-x drops 44px → 20px
                       under 780px so every section's side padding shrinks together
    base.css        — Reset, global, .container utility
    components.css  — Reusable atoms: buttons, badges, portrait frame, footer
    nav.css         — Sticky frosted-glass header, active state, mobile hamburger menu
    hero.css        — Home hero: 2-col grid with portrait (stacks under 780px)
    proof.css       — Path strip + dark "3 case studies" teaser grid, each card links to
                       work.html#<case-id> and auto-expands that accordion item
    about.css       — Through-line section (shared by index.html and about.html)
    method.css      — 4-step 2×2 grid (signature section, lives on home; 1-col under 780px)
    ai.css          — Dark 2-col AI POV section (stacks under 780px)
    buildlog.css    — Horizontal build log cards (Pic-to-Plate, Keystone AI) + .ptp-hero, a
                       live-type brand card for Pic-to-Plate using its own Fraunces/JetBrains
                       Mono type (loaded in ai.html's <head>), intentionally outside the site's
                       4-font system since it's presenting an external product's own brand
    signal.css      — Podcast + credibility grid (stacks under 900px)
    contact.css     — Contact CTA section + site footer
    accordion.css   — Expand/collapse case studies on work.html (only one item open at a time,
                       opening one closes any other); 3-col Bet/Call/What-Happened layout on
                       desktop (stacks under 900px, further tightens under 780px); also styles
                       the Role/Scope/Teams scan strip under each collapsed case summary and the
                       .metrics-key provenance note in the page-hero
    page-hero.css   — Inner-page hero banner (used on work/ai/about/contact)
    hub-cards.css   — Home page 4-card navigation grid linking to sub-pages (1-col under 780px,
                       2-col tablet step 781–980px)
    timeline.css    — Shared experience-timeline row component (date/org/role/body), used by
                       work.html (full, baseline) and about.html (brief variant, no body copy)
    modal.css       — Generic overlay ("Learn more" build-detail modals on ai.html), driven by
                       data-modal-open/data-modal-close attributes wired up in ai.html's inline
                       script; written reusable, not Pic-to-Plate/Keystone-specific
  imgs/
    DS1.png              — Portrait photo (used in hero, object-position: 40% center)
    ptp/                 — Pic-to-Plate product screenshots, shown inside its "Learn more" modal
                            on ai.html (not on the main page, to keep that card short)
```

## Design system

**Base:** v2b prototype + v1's dark proof stats section ported in.

**Typography:**
- Display / headings: `Newsreader` serif (400/500 italic)
- UI / buttons / card titles: `Space Grotesk` (600/700)
- Body: `Libre Franklin` (400)
- Labels / mono / section markers: `IBM Plex Mono` (400/500/600)

**Color tokens (tokens.css):** mineral teal / brass palette (switched off an earlier warm-cream/terracotta scheme to avoid looking Anthropic-like)
- `--paper: #F4F1EA` — page background
- `--ink: #20272D` — primary text
- `--accent: #2F6B62` — mineral teal (CTAs, eyebrows, hover states)
- `--accent-2: #C3A66B` — brass (dark section accents)
- `--dark: #172126` — dark section backgrounds
- `--cobalt: #2E6FB7` — podcast card accent

**Section eyebrow pattern:** `// SECTION NAME` using `.eyebrow` class (IBM Plex Mono, 12px, letter-spacing .16em, `--accent` color)

**Responsive breakpoints:** standard breakpoint is `780px` (mobile), used consistently across nav, hero, hub cards, method grid, proof cards, page hero, contact, about, signal, and buildlog. A few grids that hold 3+ items add an earlier collapse step to avoid an empty-cell layout bug when an odd number of items hits a fixed multi-column grid (signal-grid collapses at 900px, accordion-content at 900px, hub-grid gets a 2-col tablet step at 781–980px). When adding a new multi-column layout, always add a breakpoint at build time — don't defer it, it's been a repeat source of bugs on this site.

## Component injection pattern

Header and footer are injected by JS components — not hardcoded in each page:

```html
<div data-include="header"></div>
<!-- page content -->
<div data-include="footer"></div>
<script src="components/header.js"></script>
<script src="components/footer.js"></script>
```

`header.js` auto-highlights the active nav link by matching `window.location.pathname` filename to `data-page` attributes on nav links, and wires up the mobile hamburger toggle (`.nav-toggle` shows/hides `.nav-menu` below 780px).

**Note:** Component injection requires a local server (VS Code Live Server, `npx serve`, etc.). Raw `file://` URLs may block the scripts in some browsers.

## Page structure

**Home (index.html):** Hero (headline now paired with a `.hero-role` positioning pill, e.g. "Product & Venture Leader · Enterprise AI · Complex B2B", above the H1) → Path strip → Dark "3 case studies" teaser grid (each card links to `work.html#<id>`) → Method (signature section) → Through-line → 4 hub cards

**Work (work.html):** Page hero (includes a small `.metrics-key` note explaining the observed/est./system-outcome convention used in the stats below) → Accordion case studies (Chronic-Pain Care Venture / Cognitive Screening Platform / Acute-Care Virtual Platform, click + to expand, only one open at a time; each collapsed row also shows a Role/Scope/Teams scan strip above the fold, then expands into Bet → Call → What Happened → Stats → Proves) → Experience timeline. Deep-linking a case (`work.html#venture-origination`, `#workflow-investment`, `#platform-exit`) auto-expands and scrolls to it via the inline script at the bottom of the file.

**AI (ai.html):** Page hero → Dark POV section (real POV, no longer a strawman) → Build cards: Pic-to-Plate (shipped, live on the App Store) + Keystone AI (in progress, on GitHub, uses its own brand mark, imgs/keystone-ai-icon.svg) + a "Next up" placeholder for Trendshelf. Both build cards pair their primary CTA with a "Learn more →" button that opens a modal (see Build-detail modals below) rather than lengthening the main card.

**About (about.html):** Page hero → Through-line narrative → Signal section (podcast/CMU-BPUT education/speaking-advisory) → Brief experience timeline

**Contact (contact.html):** Centred CTA (résumé download is the primary pill CTA, ahead of email/LinkedIn/GitHub) + cross-links to other pages

## Build-detail modals (ai.html)

Pic-to-Plate and Keystone AI each have a "Learn more" button that opens an overlay with deeper, curated content, kept out of the main scrollable page so the build cards stay short. Pattern:
- Markup: `<div class="modal" id="...">` with a `.modal__backdrop` and `.modal__panel`; trigger buttons use `data-modal-open="<modal id>"`, close controls use `data-modal-close`.
- Behavior: one small inline script at the bottom of ai.html wires up all `[data-modal-open]`/`[data-modal-close]` elements generically (open/close/Escape/backdrop-click, body-scroll lock); no per-modal JS needed for a new one.
- Styling: `styles/modal.css`, written reusable, not specific to either build.
- Content policy: curated from the source project's own docs (`picturetoplate/portfolio_documents/`, `keystone/README.md` + `CLAUDE.md`), not reproduced wholesale. Keep it conceptual enough to be legible as evidence of judgment, not detailed enough to hand someone a blueprint to copy (true for Keystone in particular: describe the six stages, the skills concept, and the gate/decision-log discipline in plain language, but don't list actual internal skill filenames, prompt text, or schema). Also drop any "what this demonstrates for a Director/PM role" self-assessment framing from the source docs, since stating your own qualifications back to the reader reads as a victory lap rather than showing it (see Voice below) — let the facts (the scope table, the specific decision, the honest limitations) carry it instead.
- Pic-to-Plate's modal includes its 4 product screenshots (`imgs/ptp/`); Keystone's does not, since the product doesn't have a UI yet, a schematic diagram would misrepresent progress that hasn't happened.

## Content strategy

**Target buyer:** Director / VP (strategy + venture ownership) as the primary read. Secondary nod to Principal / Lead PM — copy should also read as credible to a deep IC/technical-leadership buyer, not just a P&L owner.

**Voice:** Builder-founder — opinionated, outcome-anchored, short sentences, first person, every claim backed by an exhibit. **Tone must stay warm, senior, and credible — never salesy, pitchy, flamboyant, or smug**, even when the underlying fact is impressive. State the fact and the insight plainly; avoid framing that makes the writer sound like they're declaring a victory lap (e.g. avoid constructions like "I can tell the difference between a market being right about me and wrong about me" — prefer "I can take a real objection seriously without accepting the whole verdict"). **Never use em dashes anywhere in page copy** (comments in CSS are fine); use commas, periods, or "including"/"and" constructions instead.

**Positioning spine:** Domain-learning as the through-line across healthcare, CRM, real estate. Not four claimed masteries — one method applied across markets.

**Redaction policy:** No proprietary/company-identifying names. Ventures, acquirers, and integration partners are referred to by function/description, not by name, even though employer names (UPMC Enterprises, PayPal, InsideView, Oracle, Infosys) stay. This applies to any new case-study or work copy added in future, including anything sourced from `star_stories/`, which contains real names that must never appear on the site.

**Founder-status accuracy (a real error made once, don't repeat it):** the Chronic-Pain Care Venture was **architected inside UPMC Enterprises** — Debashish is the intrapreneur/architect and led product on it, not a co-founder of an external company. Never describe this (or any UPMC-originated venture) as something he "co-founded" — that implies founding an outside company, which is factually wrong. If a STAR doc mentions "the venture's co-founder," that refers to a different colleague at UPMC Enterprises, not Debashish.

**Employment status:** Debashish is no longer employed at UPMC Enterprises (tenure was 2020–2026). All site copy must use past tense for UPMC-era work ("architected," "led," "meant") — never present tense ("leads," "today," "currently") that implies ongoing employment there. The Chronic-Pain Care Venture's date range on work.html should read "2024–2026," not "2024–Present."

**Case studies (in narrative order on work.html):**
1. **Chronic-Pain Care Venture** — 0→1 venture architected inside UPMC Enterprises, chronic-pain care model (dates: "2024–2026"), lead story. Structured as Bet (decade of clinical validation trapped by delivery/capacity constraints) → Call (designed the full venture thesis and business architecture: clinical model, enterprise distribution, unit economics, data strategy, roadmap, milestone financing) → What Happened (UPMC Enterprises and an external venture-building partner formed the company and recruited a founding team; role shifted from architect to strategic advisor). Key figures: 100+ practices via single-signature enterprise access, 67% fewer hospitalizations (one cohort; source doc has a second cohort at 59%/31% if more precision is ever needed).
2. **Cognitive Screening Platform** — constraint was workflow, not science; invested, integrated into the market-leading EHR, advised as a board observer. Key figures: 90% onboarding improvement, ~2% denial rate, $400K+ early revenue generated, $3-6M/yr (est.) recoverable reimbursement (existing revenue recovered by fixing the workflow, not new revenue, keep that distinction in any copy — the accordion stat label must say "recoverable reimbursement/yr," not "missed reimbursement opportunity," to avoid contradicting that framing). Figures are deliberately banded, not exact, since precise revenue/patient-volume/practice-count numbers could be reverse-engineered into UPMC's or BrainCheck's proprietary business metrics; the company's overall scale ("hundreds of practices and 100K+ annual assessments") is likewise rounded rather than exact.
3. **Acute-Care Virtual Platform** — internal tele-critical-care tool → acquisition by a strategic acquirer (never named; redact to "the acquirer" / "a strategic acquirer," same policy as the venture-building partner in case study 1). Narrative now includes the commercialization-strategy arc (focused on highest-value service lines, deferred non-core capabilities) and the post-acquisition arc (role moved from product/commercialization leadership into deal architecture, then governance and escalation, an 18-month co-development relationship). Key figures: ≈92% response-time reduction (specialist connection time ~29 min → under 2 min), ≈3× provider capacity, $6-9M/yr estimated cost-savings to the health system. The exit multiple/value figure is covered by an NDA and must never appear on the site, even in redacted/relative form (e.g. "≈3×") — that class of deal-economics figure is more sensitive than the acquirer's name alone.

Index.html's teaser cards and work.html's accordion must stay numerically consistent (same figures, same case order/numbering 01→02→03 top to bottom) — a prior bug had the two pages showing contradicting numbers and reversed tag numbering; watch for this class of regression whenever one page's copy changes without the other.

## Outstanding TODOs before launch

- [ ] Verify all case study figures (including the newer STAR-sourced ones: $6-9M/yr (est.), $3-6M (est.), 67% hospitalizations, etc.) are publicly attributable before launch
- [ ] "Next up: Trendshelf" placeholder on ai.html — fill when next project ships
- [ ] Do a real-device mobile QA pass (hamburger menu, all breakpoints) before launch — the responsive pass was done in-browser/devtools, not verified on physical devices yet
