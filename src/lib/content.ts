import { getCollection } from 'astro:content';
import { entryPath } from './urls';

/** CONTRACT: every route/index/feed consumes this catalog, never raw collections.
 * Guarantees: drafts/private records and their related links never reach consumers.
 * Failure: bad references, duplicate slugs or series positions fail the build.
 * No runtime network or private-content preview is provided.
 */
export async function catalog() {
  const [writing, projects, videos, now, milestones, external] = await Promise.all([
    getCollection('writing'), getCollection('projects'), getCollection('videos'), getCollection('now'), getCollection('milestones'), getCollection('external'),
  ]);
  const all = { writing, projects, videos, now, milestones, external };
  for (const [name, entries] of Object.entries(all)) {
    const seen = new Set<string>();
    for (const entry of entries) {
      if (seen.has(entry.data.slug)) throw new Error(`Duplicate ${name} slug: ${entry.data.slug}`);
      seen.add(entry.data.slug);
      for (const collection of ['writing', 'projects', 'videos'] as const) {
        for (const id of entry.data.related[collection]) {
          if (!all[collection].some((item) => item.data.slug === id)) throw new Error(`Missing ${collection}/${id} referenced by ${name}/${entry.id}`);
        }
      }
    }
  }
  for (const entry of writing) {
    if (entry.data.translation) {
      const other = writing.find((item) => item.data.slug === entry.data.translation);
      if (!other || other.data.language === entry.data.language || other.data.translation !== entry.data.slug) throw new Error(`Translation must be reciprocal and in another language: ${entry.id}`);
    }
  }
  const visible = (entry: { data: { draft: boolean; visibility: string; published?: Date } }) => !entry.data.draft && entry.data.visibility === 'public' && (!entry.data.published || entry.data.published.getTime() <= Date.now());
  const publishedWriting = writing.filter(visible).sort((a, b) => b.data.published!.valueOf() - a.data.published!.valueOf());
  const positions = new Set<string>();
  for (const entry of publishedWriting) {
    if (!entry.data.series) continue;
    const key = `${entry.data.language}:${entry.data.series.name}:${entry.data.series.order}`;
    if (positions.has(key)) throw new Error(`Duplicate guide series position: ${key}`);
    positions.add(key);
  }
  return {
    writing: publishedWriting,
    projects: projects.filter(visible).sort((a, b) => a.data.order - b.data.order),
    videos: videos.filter(visible).sort((a, b) => b.data.published!.valueOf() - a.data.published!.valueOf()),
    now: now.filter(visible).sort((a, b) => b.data.updated.valueOf() - a.data.updated.valueOf()),
    milestones: milestones.filter(visible).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()),
    external: external.filter(visible).filter((item, index, list) => list.findIndex((other) => other.data.url === item.data.url) === index && !videos.some((video) => visible(video) && video.data.source === item.data.url)).sort((a, b) => b.data.published!.valueOf() - a.data.published!.valueOf()),
  };
}
export type Catalog = Awaited<ReturnType<typeof catalog>>;
export function relatedEntries(data: Catalog, relation: { writing: string[]; projects: string[]; videos: string[] }): { title: string; url: string; kind: string; language: 'en' | 'ml' }[] {
  return (['writing', 'projects', 'videos'] as const).flatMap((collection) => data[collection].filter((entry) => relation[collection].includes(entry.data.slug)).map((entry) => ({ title: entry.data.title, url: entryPath(collection, entry.data.slug), kind: collection, language: 'language' in entry.data ? entry.data.language : 'en' })));
}
export function readingTime(body: string, language: 'en' | 'ml') {
  const text = body.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  const words = [...new Intl.Segmenter(language, { granularity: 'word' }).segment(text)].filter((word) => word.isWordLike).length;
  return Math.max(1, Math.ceil(words / (language === 'ml' ? 160 : 220)));
}
