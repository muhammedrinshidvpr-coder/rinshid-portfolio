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
| Output integrity | 19 files scanned; 284 internal links checked |
| Draft/private exclusion | Canary strings absent throughout static output; direct URLs return 404 |
| Test fixture isolation | Separate content cache/output; fixture mode rejected on Vercel; fixture slugs rejected in production output |
| Browser suite | 7 passing tests |
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

## Editorial state

Three source-reviewed public projects: BlinkBreak, CosmIQ Sync and Pragathi KEAM Portal. No fabricated publications, video dates, Now activity, impact statistics or credentials. Writing/video/Now pages have intentional empty states. Public profile links were cross-linked from the existing portfolio/GitHub; LinkedIn and Instagram posts were not accessible. Discovery evidence and uncertainties are kept locally in ignored `.local/discovery.md`.

## Reproduce

Use the commands in [README](../README.md) for production and publishing fixture tests. For live validation:

```sh
node scripts/verify-live.mjs https://rinshid-portfolio.vercel.app
```

Automated accessibility checks complement, but do not replace, manual reading and assistive-technology testing. The site is prepared for Malayalam publishing; real editorial translations have not been supplied.
