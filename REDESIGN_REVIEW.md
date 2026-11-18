# Website redesign review

Implemented locally on November 18, 2026. No commit, push, deployment, hosting change or workflow change was performed.

## Source and implementation

Read `Codex_Website_Redesign_Handoff.md` in full and extracted both pages of `Resume_40U40_v10.pdf`. Rendered and visually reviewed both PDF pages using macOS PDFKit. The new handoff supersedes the older positioning, font system and blanket anonymization policy in `CLAUDE.md`.

The existing stack remains buildless HTML/CSS/JavaScript. GitHub Pages publishes `ds_website/` on a push to main. There is no package manager, build command or pre-existing test suite. Do not push these changes to main until publication is requested and the outstanding review items below are resolved.

## Changed files

- `ds_website/index.html`: exact requested headline and descriptor; current Hashed Health studio/venture mandate; Juliana, VigilAI and anonymized data opportunity; differentiated UPMC evidence; practical approach; perspectives and contact sections.
- `ds_website/work.html`: substantial, always-readable stories grouped into Hashed Health and UPMC Enterprises. Each includes opportunity, role/decisions, changes, progress/outcome and a takeaway. Preserves `/work.html#venture-origination`, `#workflow-investment` and `#platform-exit`. Replaces the accordion with ordinary article anchors, so cases are accessible without JavaScript. Removes unsupported financial and clinical metrics and sole-investment/sole-outcome language.
- `ds_website/ai.html`: remains at its original URL but is labeled Perspectives. Adds on-page working viewpoints on Implementation-Market Fit, venture creation and AI governance. Does not claim these are externally published articles. Retains Pic-to-Plate and Keystone narratives, external links and four screenshots inside native keyboard-accessible disclosures, replacing modal overlays. Removes the expired Keystone release target and speculative Trendshelf placeholder.
- `ds_website/about.html`: engineering-to-studio leadership narrative; exact CMU degree/school naming; Glimmer advisory role, board-observer experience, NFMA, mentoring and The Product Signal; concise career chronology.
- `ds_website/contact.html`: collaboration-focused email and social links. Replaces the old résumé download CTA with a request-by-email note; the old asset itself remains unchanged pending a publication decision.
- `ds_website/components/header.js`: shared five-page navigation, active-page semantics, mobile toggle, Escape/focus return and resize reset.
- `ds_website/components/footer.js`: current descriptor and shared contact links; removes outdated relocation positioning.
- `ds_website/styles/tokens.css`: resume navy, teal, ink, muted and divider colors; self-hosted Inter and Inter Display.
- `ds_website/styles/editorial.css`: shared editorial layout, typography, rules, responsive grids, visible focus, skip link, reduced-motion support and native disclosure styling. Layout rules cover desktop, tablet and mobile, including 390px. Legacy CSS files remain on disk but are no longer loaded by the five pages.
- `ds_website/fonts/InterVariable.woff2`, `InterDisplay-Medium.woff2`, `LICENSE.txt`: official Inter 4.1 files and SIL Open Font License, downloaded from the Inter project. No third-party runtime font request.
- `ds_website/imgs/debashish-sasmal.jpg`: optimized derivative retained on disk but unused. At the owner’s request, Home and About now reference the original `imgs/DS3.png` directly.
- `ds_website/favicon.svg`: navy/white treatment with Inter fallback.
- `scripts/check_site.py`: dependency-free structural, link, asset, landmark, metadata, anchor and copy-guardrail checks.
- `scripts/check_navigation.cjs`: DOM-simulated checks of active route and menu behavior.
- `REDESIGN_REVIEW.md`: this implementation and approval record.

All five HTML pages have updated titles/descriptions/Open Graph metadata and canonical URLs. Removed references to the old social-share graphic to avoid sharing obsolete positioning; no new graphic was invented. Existing social/contact, App Store, GitHub and podcast destinations are retained. External destinations were not independently audited for availability.

## Validation completed

- `python3 scripts/check_site.py`: PASS, five pages and 97 local references, shared component links, CSS font assets, matching tag nesting, unique IDs, one H1/main per page, metadata, original case anchors, exact positioning and specified HTML confidentiality checks.
- `node scripts/check_navigation.cjs`: PASS, active route, menu opening/closing, Escape with focus return, link-click close and desktop resize reset. This is a simulated DOM test, not a browser test.
- `node --check ds_website/components/header.js` and `node --check ds_website/components/footer.js`: PASS.
- `git diff --check`: PASS.
- Local HTTP server: all five page routes returned HTTP 200.
- Visually inspected both resume pages and the existing portrait.

## Verification limits

No browser connector was available. A native Safari attempt returned “Computer Use was not approved to use Safari.” Consequently, no rendered website screenshots, browser interaction checks or 1440/768/390 viewport inspection were completed. Responsive behavior is implemented but requires visual QA before publication. Check headline wrapping, portrait crop, all section boundaries, Work reading columns, open experiment disclosures, mobile menu, keyboard focus and footer at those widths. No build step exists to run.

For a local preview:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory ds_website
```

Open `http://127.0.0.1:8765`.

## Content and publication decisions

1. **Legacy résumé is a publication blocker.** `ds_website/resumes/Debashish_Sasmal_Resume.pdf` was already in the deploy directory and contains outdated positioning, unsupported financial claims and transaction-value language excluded by the handoff. Its CTA is removed, but the direct URL remains functional to avoid silently breaking an existing URL. Before any deployment, approve a public-safe replacement at that path or retire the asset. Do not substitute the unredacted v10 nomination résumé: it contains restricted partner details. Neither source PDF was copied into new public content.
2. **Current venture progress counts are withheld.** Juliana’s commercial-discussion counts and VigilAI’s design-partner counts are not in HTML. Confirm permanent-publication permission and freshness before adding them. No commercial discussion is represented as a signed customer. No synthetic demonstration is represented as clinical deployment.
3. **Restricted partner and consortium details are withheld.** No VigilAI design-partner names, consortium partner count, internal initiative name, collaborator categories, revenue-sharing mechanics or unpublished strategic detail appear in the new copy. Vanderbilt is mentioned only as the research-technology origin permitted by the handoff, not as a claimed customer endorsement.
4. **Prospective CMU appointment is withheld.** Guest teaching, curriculum contributions and capstone advising are used; a finalized certificate-teaching or formal industry-adviser appointment is not claimed. Confirm formal status before adding it.
5. **Editorial signoff.** Review the newly written first-person perspectives and the current venture descriptions before public posting. They are locally drafted site copy, not claims of prior publication. Reconfirm the preserved personal-project status before launch.
6. **Attribution.** Safar's 40,000+ consultations and reported 92% specialist-connection-time reduction are explicitly collective platform outcomes. Glimmer is presented as incubation/product leadership and subsequent CEO advising, not co-founder ownership. BrainCheck underwriting is a contribution to investment decisions, not sole authorization.
7. **Deployment remains unauthorized.** Resolve the résumé and visual QA items, review the copy, and request deployment separately. The GitHub Pages workflow remains unchanged.

## Approved positioning refinement

At the owner’s request, Home, Work, About and Perspectives now emphasize the decisions connecting healthcare product management and venture incubation. Home introduces three complementary dimensions: across the studio, within ventures and with health systems. Copy describes opportunity assessment, strategic challenge, product/platform choices and concrete adoption requirements. Juliana and BrainCheck provide grounded examples. The exact primary headline and professional descriptor remain unchanged; Home and About continue to use DS3.png. No team-size, budget, P&L or sole-decision-authority claims were added. Existing publication restrictions remain in force. Structural checks and navigation simulations pass; this copy/layout refinement has not received browser visual QA or been deployed.

## UI/UX and personal-brand refinement

The visual direction supports a credible, approachable healthcare executive: restrained navy/teal, editorial typography and the original portrait. The source audit found that very small supporting text, repeated hero explanation, narrow intermediate-width columns and weak navigation through long content undermined that positioning.

Implemented fixes:
- Shortened the hero's supporting introduction while retaining the exact headline, descriptor and dual Hashed mandate. Detailed positioning remains in the leadership dimensions below.
- Increased small labels, captions, body copy and footer text; darkened muted text to maintain readable contrast on the pale section backgrounds.
- Rebalanced hero spacing and responsive heading sizes. Display the square DS3.png without cropping and corrected its intrinsic dimensions to the current 741×741 source. The owner's image file was not edited.
- Removed arbitrary vertical offsets from section introductions and added minimum-width safeguards to content grids.
- Added tablet-specific reading-column and footer adjustments, more generous interactive targets, and a two-column mobile menu with a distinct active-page background.
- Fixed mobile headings whose hidden line breaks could join adjacent words. Added a focusable main landmark for skip navigation.
- Added grouped links to all six Work cases, return-to-index links, and desktop sticky case titles. Added Perspectives topic navigation.
- Gave experiment disclosures distinct accessible labels; enlarged comparison-table text and stacked product screenshots on narrow screens.
- Preserved source claims, confidentiality restrictions, original case anchors, original portrait and existing deployment configuration.

Validation: five pages and 113 local references pass structural/link checks; navigation simulation and both JavaScript syntax checks pass; `git diff --check` passes. Calculated contrast for navy, teal, body and muted text against white and wash backgrounds ranges from 5.00:1 to 15.01:1, exceeding 4.5:1 for these pairs. Inspected the current portrait asset directly.

Browser review was attempted again. Browser inventory was empty and native Chrome returned “Computer Use permissions are not granted.” This is a source-based UI audit with asset inspection, not rendered website visual QA. Desktop/tablet/mobile screenshots, real wrapping and interaction verification remain outstanding; no claim that all possible visual issues have been eliminated is made. No deployment was performed.
