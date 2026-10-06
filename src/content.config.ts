import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const url = z.url().refine((value) => /^https?:\/\//.test(value), 'Use an HTTP(S) URL');
const image = z.object({ src: z.string(), alt: z.string().min(1) });
const related = z.object({ writing: z.array(slug).default([]), projects: z.array(slug).default([]), videos: z.array(slug).default([]) }).default({ writing: [], projects: [], videos: [] });
const common = {
  title: z.string().min(1), slug, summary: z.string().min(1), draft: z.boolean().default(true),
  visibility: z.enum(['public', 'private']).default('public'), featured: z.boolean().default(false), related,
};
const publishing = { language: z.enum(['en', 'ml']), tags: z.array(z.string()).default([]), published: z.coerce.date().optional(), updated: z.coerce.date().optional() };
const dated = <T extends z.ZodRawShape>(shape: T) => z.object(shape).superRefine((data: any, ctx) => {
  if (!data.draft && !data.published) ctx.addIssue({ code: 'custom', path: ['published'], message: 'Published entries require an authored publication date.' });
  if (data.updated && data.published && data.updated < data.published) ctx.addIssue({ code: 'custom', path: ['updated'], message: 'Update must not precede publication.' });
});
if (process.env.NOTEBOOK_FIXTURES && process.env.VERCEL) throw new Error('Test fixtures must never be enabled on Vercel.');
const loader = (name: string) => glob({ base: process.env.NOTEBOOK_FIXTURES && ['writing', 'videos'].includes(name) ? `./tests/fixtures/${name}` : `./src/content/${name}`, pattern: '**/*.md', generateId: ({ entry }) => entry.replace(/\.md$/, '') });
export const collections = {
  writing: defineCollection({ loader: loader('writing'), schema: dated({ ...common, ...publishing,
    type: z.enum(['article', 'note', 'guide', 'research-note']), image: image.optional(),
    series: z.object({ name: z.string(), order: z.number().int().positive() }).optional(), translation: slug.optional(),
  }) }),
  projects: defineCollection({ loader: loader('projects'), schema: z.object({ ...common,
    status: z.enum(['idea', 'prototype', 'active', 'completed', 'archived']), problem: z.string(), audience: z.string(), role: z.string(),
    features: z.array(z.string()).min(1), technologies: z.array(z.string()).min(1), lessons: z.array(z.string()).default([]),
    limitations: z.array(z.string()).min(1), source: url.optional(), demo: url.optional(), screenshots: z.array(image).default([]), order: z.number().default(99),
  }) }),
  videos: defineCollection({ loader: loader('videos'), schema: dated({ ...common, ...publishing, provider: z.enum(['youtube', 'vimeo', 'other']), source: url, thumbnail: image.optional() }) }),
  now: defineCollection({ loader: loader('now'), schema: z.object({ ...common, updated: z.coerce.date() }) }),
  milestones: defineCollection({ loader: loader('milestones'), schema: z.object({ ...common, date: z.coerce.date(), role: z.string(), source: url }) }),
  external: defineCollection({ loader: loader('external'), schema: dated({ ...common, ...publishing, url, platform: z.string(), type: z.enum(['post', 'article', 'video', 'contribution']) }) }),
};
