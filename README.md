# Open Notebook — Muhammed Rinshid V P

A warm, static portfolio and publishing home. Built with Astro 7, TypeScript, Markdown content collections, and ordinary CSS. No database, CMS, tracking scripts, or client-side framework runtime.

**Live:** https://rinshid-portfolio.vercel.app/ · **Source:** https://github.com/muhammedrinshidvpr-coder/rinshid-portfolio

See [delivery validation](docs/VALIDATION.md) for the completed checks and deployment details.

## Develop

Node 22.12+ (24 recommended), npm:

```sh
npm ci
npm run dev
npm run check
npm run build
npm run verify
npm test
```

`npm test` uses installed Google Chrome and starts its own local preview. Install Chrome or change the Playwright channel to an installed Chromium browser. Tests cover navigation, mobile overflow, light/dark accessibility, theme persistence, URL search state and draft direct-URL protection.

## Publish

See [the author guide](docs/AUTHORING.md) for filenames, fields, translations, series, assets, project records and templates. Start with a file from `templates/`, copy it into the appropriate `src/content/` directory, and edit it. Content is validated at build time. Set `draft: false` only when ready; published writing/videos/external items require an actual publication date.

All profile text, email, navigation and social links live in `src/config/site.ts`. Link records carry platform, purpose, group, order and featured state. Published project case studies live in `src/content/projects/`.

## Structure

```text
src/config/site.ts       Identity, navigation, public links, canonical site origin
src/content.config.ts    Central content schemas
src/content/             Writing, projects, videos, now, milestones, external
src/lib/content.ts       Public-only catalog, relationships, reading time
src/lib/urls.ts          Base-path and canonical helpers
src/layouts/             Shared document, rail and footer
src/components/          Entries, related links and reader tools
src/pages/               Static pages, content routes, RSS and robots
src/styles/              Warm light/dark design system
public/                  Intentionally public assets only
templates/               Draft authoring starters (not deployed)
tests/fixtures/          Synthetic publishing fixtures (not production content)
tasks/                   Implementation plan
.local/                  Ignored discovery notes and test artifacts
```

Original portfolio HTML remains in Git history; original CSS, JavaScript, images and CV remain in the repository for reference. Vercel serves **only `dist/`**. The old CV URL redirects to About; no current resume is asserted. The GitHub Pages workflow uploads only the root redirect `index.html`, never the source/content directories.

## Deployment

Vercel framework: Astro. Install: `npm ci`. Build: `npm run check && npm run build && npm run verify`. Output: `dist`. Static Astro needs no server adapter.

The production origin is configured in `src/config/site.ts`; use `SITE_URL` for a custom domain and redeploy. Use `BASE_PATH=/subdirectory/` only when hosting in a subdirectory; helpers apply it to generated links/assets/feeds. Author-written Markdown links must account for the chosen base path (see author guide).

`muhammedrinshidvpr-coder/rinshid-portfolio` is connected to the Vercel project `rinshid-portfolio`, with `main` as production branch. Normal pushes build production, and other branches receive previews. Preview deployments should use Vercel’s preview noindex behavior. Test production after changing domains, including canonicals, RSS and sitemap: `node scripts/verify-live.mjs https://rinshid-portfolio.vercel.app`.

## Publishing integration tests

PowerShell:

```powershell
$env:NOTEBOOK_FIXTURES = '1'
npm run build -- --outDir .local/fixture-dist
node scripts/verify-output.mjs .local/fixture-dist
npm test
Remove-Item Env:NOTEBOOK_FIXTURES
npm run check
npm run build
npm run verify
```

The fixture build exercises actual EN/ML publishing, translation links, series that skip drafts, code copying, archive results, video consent, transcripts, RSS and related projects. Fixture mode is explicitly rejected on Vercel. Never publish `.local/fixture-dist`. The normal build contains no fake published articles or videos.

Draft canaries in source test exclusion from every `dist` file, including client scripts, metadata, feeds and sitemaps. **A public repository is public:** `draft: true` hides website output, not GitHub source. Keep confidential notes in ignored `.local/` or outside the repository; never put them in `public/`.

## Rollback

Promote the previous deployment in Vercel, or revert the portfolio implementation commit and deploy the desired version. Original single-page site starts at commit `592a7ea`.
