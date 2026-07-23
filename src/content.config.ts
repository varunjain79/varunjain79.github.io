import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const foundersGuide = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/founders-guide' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    readingTime: z.string(),
    keyTakeaway: z.string()
  })
});

export const collections = { foundersGuide };
