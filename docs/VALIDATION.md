# Delivery verification — 2026-10-06

## Live destinations

- Production: https://rinshid-portfolio.vercel.app/
- Repository: https://github.com/muhammedrinshidvpr-coder/rinshid-portfolio
- Existing portfolio address: https://muhammedrinshidvpr-coder.github.io/rinshid-portfolio/ — redirect to production.
- Vercel project: `rinshid-portfolio`; framework Astro, static `dist` output, production branch `main`, GitHub repository linked, Git deployment creation enabled.
- GitHub Pages uses Actions deployment, uploading only approved redirect HTML. It does not serve the repository/content tree.

## Checks performed

| Check | Result |
| --- | --- |
| Astro type/content check | Zero errors, warnings, or hints |
| Production build | 13 HTML pages; RSS, robots and sitemap generated |
| Output integrity | 19 files scanned; 286 internal links checked |
| Draft/private exclusion | Canary strings absent throughout static output; direct URLs return 404 |
| Test fixture isolation | Separate content cache/output; fixture mode rejected on Vercel; fixture slugs rejected in production output |
| Browser suite | 8 passing tests |
| Publishing integration suite | 4 passing tests against actual fixture-generated static pages |
| Mobile accessibility | axe WCAG A/AA checks across 10 routes, light and dark, no reported violations |
| Responsive layout | No horizontal page overflow at 360px; Malayalam reader checked at 320px |
| Keyboard | Skip link, primary navigation, native theme selector |
| Themes | System preference, explicit choice, persistence after reload |
| Publishing | EN/ML language metadata, reciprocal translations, published-only guide navigation, code copy, query-state search |
| Video | No player request until interaction; titled iframe, external watch link and transcript search |
| Subdirectory build | `/notebook/` build passed link checks; RSS channel uses the subdirectory origin |
| Live smoke test | Public pages/feeds/canonicals, hidden-entry 404s, old CV redirect, mobile navigation and theme persistence passed |

Independent code review returned SHIP-WITH-FIXES. Fixed all three findings: mobile access to Guides/Videos, language annotations on related entries, and base-aware RSS channel URL. A subsequent production check and browser run passed.

The voice/UX refinement was independently reviewed as well. Fixed the remaining Videos title mismatch and ensured archive video titles are H2 headings. Updated tests cover the empty-writing state without filters, the full name on mobile, dated past Azmora work, and the authored Now snapshot. All 8 site and 4 publishing tests passed after fixes. Desktop/mobile screenshots were checked manually.

## Editorial state

Three source-reviewed public projects: BlinkBreak, CosmIQ Sync and Pragathi KEAM Portal. The owner confirmed Founder of CosmIQ and past n8n automation work on AWS for Azmora, June–August 2026. A Now snapshot authored on 2026-10-06 reflects the current notebook work and the learning/publishing direction supplied in this conversation. Writing/video pages retain intentional empty states; search controls appear only when published writing exists. No fabricated publications, talks, video dates, impact statistics or credentials. Public profile links were cross-linked from the existing portfolio/GitHub; LinkedIn and Instagram posts were not accessible. Discovery evidence and uncertainties are kept locally in ignored `.local/discovery.md`.

## Reproduce

Use the commands in [README](../README.md) for production and publishing fixture tests. For live validation:

```sh
node scripts/verify-live.mjs https://rinshid-portfolio.vercel.app
```

Automated accessibility checks complement, but do not replace, manual reading and assistive-technology testing. The site is prepared for Malayalam publishing; real editorial translations have not been supplied.
