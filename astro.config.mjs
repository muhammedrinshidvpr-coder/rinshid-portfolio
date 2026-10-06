import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site.ts';

export default defineConfig({
  site: site.url,
  base: process.env.BASE_PATH || '/',
  output: 'static',
  cacheDir: process.env.NOTEBOOK_FIXTURES ? './.local/fixture-cache/' : './node_modules/.astro/',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false } },
});
