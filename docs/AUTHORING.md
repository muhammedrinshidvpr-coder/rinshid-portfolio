# Writing in Open Notebook

## Your everyday workflow

1. Copy a starter from `templates/` into the matching `src/content/` folder.
2. Name it with a short, lowercase ASCII filename, e.g. `understanding-promises.md`.
3. Give it a unique stable `slug`, e.g. `understanding-promises`. Changing the title must not change the slug. Published URL changes need redirects.
4. Write Markdown beneath the frontmatter. You can use headings, lists, quotes, tables, images and fenced code with a language such as `js` or `python`.
5. Run `npm run check`, `npm run build`, and `npm run verify`. Commit and push when ready.

GitHub’s web editor works too: open the content directory, create a Markdown file, paste a template, and commit. Vercel builds on push. A failed schema check prevents deployment; the previous production remains live.

## Publication and dates

Defaults are intentionally conservative: `draft: true`. Publication requires setting it to `false`. Use `published: YYYY-MM-DD` for the real original publication date. Dates are displayed in UTC to prevent time-zone shifts. A future publication date is withheld until a later build on/after that date; there is no scheduled service. `updated` is optional and must reflect an editorial change, never a build time. Drafts do not need invented publication dates.

Draft/private entries are absent from direct routes, archives, related entries, guides, series, RSS, sitemap and client search data. Set `visibility: private` to withhold a record independently of its draft state. Do not commit genuinely private text into a public repository; `.local/` is ignored by Git and Vercel.

## Writing

Required: `title`, `slug`, `summary`, `type`, `language`; publication date when published. Types: `article`, `note`, `guide`, `research-note`. Languages: `en`, `ml`. Optional: `tags`, `featured`, `updated`, `image: {src, alt}`, `series: {name, order}`, `translation`, and `related`.

Search matches title, summary, tags and body of published writing only. Query state is shareable with `?q=agents&language=en&type=article&topic=AI`. External posts are explicitly separate from notebook search. Reading time is an estimate using language-aware word segmentation, excluding fenced code (220 English or 160 Malayalam words/minute).

### Malayalam and translations

Save UTF-8 Markdown, use `language: ml`, and write the original Malayalam naturally. Its page has `lang="ml"`; archive excerpts also identify the language. System fallbacks include Nirmala UI and Kartika; no remote font download is required. On systems without a Malayalam font, install Noto Sans Malayalam for authoring checks.

For an actual translation, put the other entry’s slug in `translation` **on both records**. Languages must differ. Only published translations generate links and alternate-language metadata. Don’t add automatic/unreviewed translations to imply equivalence.

Mixed-language passages can be marked with HTML: `<span lang="en">World models</span>` in Malayalam prose, or `<p lang="ml">മലയാളം വാക്യം.</p>` inside English content. The surrounding navigation remains explicitly English. Long Malayalam titles wrap normally.

### Guides and series

`type: guide` automatically includes the article in `/guides/`. There is one record, not a duplicate article. For a series, set the same `series.name` and unique positive `series.order` values. Navigation stays within the same language and skips drafts/private/unpublished entries. Different subjects can use the first tag for grouping. Check current primary sources before making syllabus or admissions claims.

## Projects

Use `templates/project.md`. Supply problem, audience, exact role, implemented features, technology, limitations and status. Status: `idea`, `prototype`, `active`, `completed` (displayed as Released), or `archived`. A repository existing does not make it active. Include actual `source`/`demo` URLs only. `order` controls editorial order; `featured` selects home projects. `lessons` are design takeaways, not invented personal testimonials. Add narrative context in Markdown.

## Videos

Use a real `source` URL and `provider: youtube`, `vimeo`, or `other`. Put the transcript and references in the Markdown body. YouTube watch/shorts/short links and numeric Vimeo links get an opt-in player. Other sources always retain a descriptive watch link. Optional `thumbnail: {src, alt}`. Prefer local thumbnails so remote tracking does not happen on page load. Transcript search highlights text in place; the complete transcript remains accessible.

## Explicit relationships

Use stable slugs:

```yaml
related:
  projects: [blinkbreak]
  writing: [understanding-promises]
  videos: [my-real-demo]
```

Nonexistent references fail the build. Existing draft references are withheld from public links. Project pages also discover published writing/videos/external items that explicitly reference the project. Empty relationship groups can be omitted. Translation relationships are separate.

## Now, milestones, external posts

- `now/`: title, slug, summary, draft, authored `updated` date, Markdown body. The newest published update is shown on Now and summarized on Home. Start from the existing draft; change its date when actually writing it.
- `milestones/`: title, slug, summary, draft, `date`, exact `role`, public evidence `source`. Describe attended/volunteered/organized/spoke/built distinctly. Published records appear on About and selected Home entries.
- `external/`: title, slug, summary, draft, language, tags, original `published` date, actual `url`, `platform`, `type` (`post`, `article`, `video`, `contribution`), optional related records. These are links, not copied feeds. Use the original permalink consistently: exact URL duplicates are removed, and a video with its own local record takes precedence. Unknown dates: keep a draft until checked.

## Assets and Markdown details

Put publishable images in `public/images/` and reference `/images/name.webp`; add useful alt text and appropriate dimensions. Frontmatter image paths use the central base-path helper. Markdown raw links are authored URLs: use relative links or prefix your configured deployment base if hosting below a subdirectory. At this Vercel root domain, `/images/name.webp` works directly. No private/draft-only images in `public/`: everything there is copied, even if unused.

Use `##` for the first section heading; the page already provides the title as `h1`. Three or more level-two headings generate a table of contents. Code gets syntax highlighting and a copy button. Wide tables scroll in a labeled region. For captions use `<figure><img src="..." alt="..."><figcaption>...</figcaption></figure>`. Quotes can serve as restrained callouts. Add an authored References section when sources inform the writing.

## Profile and deployment settings

Edit `src/config/site.ts` for identity, bio, public email and links. `profile` holds education, the confirmed founder role, and month-precision past-work details; `themes` holds the notebook’s editorial direction. Each link has a platform label, URL, purpose, group, order and featured flag. No handles are guessed. Before changing the production domain, update `site.url` (or `SITE_URL`), deploy, and check canonical tags, RSS and sitemap URLs. No contact form is configured; email and profile links are functional as-is.

## Voice and topic direction

The notebook is for CS students adapting to AI and new technology. Its four recurring themes are engineering in the AI era, learning through building, time/focus/productivity, and attention/personal growth. Use these as a guide to choosing tags, not as claims of existing publications or professional expertise. Search controls appear when published writing exists.

Write clearly, as a fellow student who builds and keeps learning. Start with a concrete question, show a useful example, and distinguish observations from assumptions. Explain prompt/context engineering through practical situations. Productivity and social-media writing should offer personal reflections and useful experiments without invented results or guaranteed outcomes.

The author confirmed that Azmora work was **June–August 2026**, involving **n8n automation on AWS**. Keep it marked as past work; do not imply current employment or expose internal workflows. CosmIQ’s confirmed title is **Founder**.
