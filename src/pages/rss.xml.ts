import rss from '@astrojs/rss';
import { catalog } from '../lib/content';
import { site } from '../config/site';
import { absoluteUrl } from '../lib/urls';
export async function GET() {
  const data = await catalog();
  return rss({ title: site.title, description: site.bio, site: absoluteUrl('/'),
    items: [...data.writing.map((entry) => ({ title: entry.data.title, description: entry.data.summary, pubDate: entry.data.published!, link: absoluteUrl(`/writing/${entry.data.slug}/`) })), ...data.videos.map((entry) => ({ title: `[Video] ${entry.data.title}`, description: entry.data.summary, pubDate: entry.data.published!, link: absoluteUrl(`/videos/${entry.data.slug}/`) }))].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()),
  });
}
