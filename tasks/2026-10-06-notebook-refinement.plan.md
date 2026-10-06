# Open Notebook: voice and visitor experience refinement

## Confirmed direction
The author wants to help CS students adapt to AI and new technology, learn through building, think carefully as engineers, use time well, and manage social-media distraction. Intended writing/speaking topics include prompt engineering, context engineering, productivity and personal development. These are interests and intentions, not a record of published talks or expertise.
Owner confirms Founder of CosmIQ (no CEO/CGO title); Azmora work took place only June–August 2026 and involved n8n automation on AWS. No customer details or outcome metrics are authorized for publication.

## Scope and design
Keep Astro, existing routes, stable slugs and Open Notebook visual identity. Centralize profile/experience and editorial themes in site.ts. Reuse existing content catalog and templates. Avoid additional empty topic routes. Draft confidentiality behavior remains a required invariant.

## Changes
1. Home: full public name on mobile, student-focused purpose, founder identity and dated past automation work. Clear themes without implying existing publications. Short, welcoming writing empty state.
2. About: stronger first-person biography, contribution-focused experience with month-precision dates, four publishing themes and contextual tools including n8n/AWS.
3. Now: one genuinely authored 2026-10-06 update based on this conversation about building the notebook and intended learning/explanation priorities. No inferred active client work or old repository status changes.
4. Project copy: concise first-person contribution descriptions, useful implementation/context sections, remove verification-process prose. Preserve factual limitations, sources and statuses pending further evidence. Internal arrows use →; external destinations use ↗.
5. Archives: when writing is empty, do not render search/filter controls. Published archive keeps working filters/query state. Client initialization must handle missing form. Simplify Guides/Videos copy, use descriptive page titles. Improve mobile tap targets and metadata size; preserve navigation.

## Contracts
Profile configuration owns confirmed identity, experience labels and theme descriptions. Templates render public prose from it. Date ranges are displayed exactly as confirmed (month precision, no invented day).
Writing archive renders filters only for published writing; JS exits safely when no form exists. Fixture-mode build must exercise actual filters, translations and series. All public indexes continue to consume the public-only catalog.

## Verification and deployment
Run Astro check/build/output scan; site browser tests (new empty archive assertion, biography past-role context, actual Now date); publishing fixtures to ensure conditional archive doesn't break search. Check 360px mobile and desktop, light/dark axe tests and screenshots. Independent code-quality review after implementation; fix substantive findings. Inspect git status/diff/log, commit intended changes, push main, verify automatic Vercel deployment and live smoke test.

## Acceptance
Full name and useful purpose visible without About click. Azmora is explicitly past, dated June–August 2026. No empty-search UI when there is nothing to search. No audit commentary in case studies, no fabricated project/client results, posts or talks. Topic descriptions state intended coverage. Mobile no page overflow, keyboard accessibility remains intact, drafts absent everywhere. Production and fixture checks pass.
