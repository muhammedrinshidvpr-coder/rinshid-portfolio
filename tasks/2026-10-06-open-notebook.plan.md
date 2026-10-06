# Open Notebook implementation plan

## Problem and audience
Students, peers and potential collaborators need a truthful introduction, concrete work and a comfortable bilingual publishing archive. Editorial content changes independently of layout. Public output must exclude drafts everywhere.

## Discovery and assumptions
Current repo is static HTML, no build tool. Public name: Muhammed Rinshid V P. Profile links come from current GitHub/portfolio; social posts inaccessible. Three representative public projects are sufficient. No published writing/video/Now update exists for import. Local private evidence report lives in ignored .local/discovery.md. Existing root assets and CV remain recoverable; no invented resume download.

## Architecture choice
Candidates: retain manual HTML pages (simplest runtime but duplicates metadata, validation and indexes); React SPA (more client JS, weaker static publishing); layer-first Astro static content pipeline (chosen: schema validation and static routes with little JS). Migration from one-page HTML is justified by Markdown publishing, feeds and cross-record relationships. npm, Astro 7, TypeScript, ordinary CSS; no React runtime, MDX, database or CMS.

Layer stack: Markdown/JSON and profile configuration → validated collections → public-content catalog → layouts/routes/RSS/search/sitemap. Tiny progressive client scripts own theme, archive filtering, code copying and opt-in embeds. No live GitHub/social API dependency in rendering.

## Sitemap and visual system
/, /projects/, /projects/[slug]/, /writing/, /writing/[slug]/, /guides/, /videos/, /videos/[slug]/, /about/, /now/, /links/, /contact/, /404.html, /rss.xml, sitemap. Legacy CV URL resolves to About until a current download is approved. Preserve homepage section anchors where useful.
Warm #FCF8F2 paper, #3B3028 ink, #746253 secondary, #8C5035 accent; warm dark counterpart. 1080px shell, 190px rail, 48px gap. Georgia headings, system sans body, Malayalam system fallbacks, 18px body and 68ch articles. Compact wrapping mobile navigation; no collapsed menu needed. Entries separated by fine rules.

## Models and contracts
- Profile: name, bio, site origin, navigation, email and ordered links {platform,url,purpose,order,featured,group} in one configuration.
- Writing: stable slug, title, summary, article/note/guide/research-note, en/ml, tags, draft, featured, publication date required only when published, optional update, image+alt, series+order, translation slug, explicit related slugs.
- Projects: stable slug/title/summary, status (idea/prototype/active/completed/archived), public/private visibility, role/problem/audience, features, technologies, lessons, limitations, optional source/demo/screenshots and order.
- Videos: publication rules, language/tags, source URL/provider, optional image, Markdown transcript and related slugs.
- Now, milestones and external publications: validated records, draft/visibility, authored dates (never build timestamps), external original URL/platform/date and explicit relationships.
- Public catalog guarantees published/public records only for every consumer. Invalid metadata, duplicate slugs, missing related references and invalid translation language fail build. References to existing drafts resolve to no public link. No draft preview routes.
- URL helpers normalize base paths and canonical origin for all site-generated paths; author-written Markdown links documented separately.
- Reader rendering guarantees semantic lang, visible dates, estimated language-aware reading time, optional TOC, published series links, related entries, code-copy feedback and share fallback. Unsupported video providers always have external watch link.

## Implementation sequence
1. Discovery + schema/configuration, then content and public catalog.
2. Shared shell/theme/CSS and core routes, representative project detail pages.
3. Reader, archives/filter URL state, guides, video transcripts, feeds and metadata.
4. Templates and author documentation. Draft fixtures stay in source; confidential notes stay ignored.
5. Type checking + build; output crawl and canary leak scan; integration fixture build tests published EN/ML readers, series, translations, search, draft direct 404. Browser check mobile/desktop, themes, keyboard and contrast.
6. Preview Vercel, verify; inspect git status/diff/log, commit/push main; Git-connect Vercel and deploy production. Update repository homepage and GitHub Pages bridge only after live validation. Document exact URLs/commands.

## Failure policy and acceptance
Malformed content fails build with file context; empty collections render intentional empty states. Clipboard denial offers selectable text. Missing player support falls back to source link. Third-party outages cannot break primary content. Canonical origin uses actual production deployment. Draft canaries must be absent from every dist file including JS/search/RSS/sitemap; direct draft URLs 404. Mobile has no page-level horizontal overflow. Every navigation route and internal link resolves. npm check/build/verify must pass before production.

## Migration and rollback
Original static portfolio preserved in git history and original files; deploy only dist. Revert implementation commit and redeploy previous Vercel deployment for rollback. Root index becomes a simple bridge for existing GitHub Pages visitors after production works. Unrelated local repositories are untouched.
