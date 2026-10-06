import { site } from '../config/site';
/** All generated internal links and canonical URLs share this base-path boundary. */
export function pathFor(path = '/') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`;
}
export function absoluteUrl(path = '/') { return new URL(pathFor(path), site.url).href; }
export function entryPath(collection: string, slug: string) { return pathFor(`/${collection}/${slug}/`); }
export function assetUrl(path: string) { return /^https?:\/\//.test(path) ? path : pathFor(path); }
export function formatDate(date?: Date, language = 'en') {
  return date ? new Intl.DateTimeFormat(language === 'ml' ? 'ml-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date) : '';
}
