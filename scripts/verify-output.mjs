import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join, relative } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(process.argv[2] || 'dist');
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
async function walk(dir) { const items = await readdir(dir, { withFileTypes: true }); return (await Promise.all(items.map((item) => item.isDirectory() ? walk(join(dir, item.name)) : join(dir, item.name)))).flat(); }
const files = await walk(root);
let links = 0;
for (const file of files) {
  const content = await readFile(file, 'utf8');
  assert(!/CANARY_[A-Z0-9]+_DO_NOT_PUBLISH|draft-canary|draft-only-topic|private-project-canary|example\.com\/unpublished/.test(content), `Draft/private material leaked into ${file}`);
  assert(!relative(root, file).includes('.local'), 'Editorial notes leaked');
  if (!process.env.NOTEBOOK_FIXTURES) assert(!/fixture-guide|fixture-video|fixture-next|fixture-malayalam/.test(content), `Test fixture leaked into ${file}`);
  if (!file.endsWith('.html')) continue;
  assert(/<html[^>]+lang="(en|ml)"/.test(content), `Missing language in ${file}`);
  assert(/<link[^>]+rel="canonical"/.test(content), `Missing canonical in ${file}`);
  for (const match of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const url = new URL(href, 'https://local.invalid');
    assert(!base || url.pathname.startsWith(`${base}/`), `Link ignores base path: ${href}`);
    const relative = decodeURIComponent(url.pathname.slice(base.length)).replace(/^\//, '');
    let target = resolve(root, relative);
    assert(target.startsWith(root), `Path escapes output: ${href}`);
    const info = await stat(target).catch(() => null);
    assert(info, `Broken internal link ${href} in ${file}`);
    if (info.isDirectory()) target = join(target, 'index.html');
    await stat(target); links++;
    if (url.hash && target.endsWith('.html')) { const destination = await readFile(target, 'utf8'); assert(destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor ${href}`); }
  }
}
for (const page of ['index.html', 'projects/index.html', 'writing/index.html', 'videos/index.html', 'guides/index.html', 'about/index.html', 'now/index.html', 'links/index.html', 'contact/index.html', '404.html', 'rss.xml', 'sitemap-index.xml']) await stat(join(root, page));
console.log(`Verified ${files.length} output files and ${links} internal links. Draft/private canaries absent; required routes, language and canonical metadata present.`);
