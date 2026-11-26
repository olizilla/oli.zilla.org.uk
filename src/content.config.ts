import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// Each post's id is its `slug` frontmatter, which is also its URL.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    layout: z.string(),
    publishDate: z.date(),
    title: z.string(),
    // Shown as the page's h1 instead of the title. Inline markdown, e.g. *italics*.
    heading: z.string().optional(),
    tagline: z.string(),
    author: z.string().default('Oli Evans'),
    link: z.string().url().optional(),
    image: z.string().url().optional(),
    draft: z.boolean().default(false),
    emoji: z.string().optional(),
    atUri: z.string().optional(),
    mainClass: z.string().optional(),
    toc: z.boolean().default(false),
  }),
})

// Versions of /nhs-data-strategy. Each file is one frozen version: the
// intro and starting position, with what changed and what it cites.
const strategy = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/strategy' }),
  schema: z.object({
    version: z.number(),
    // Labelled "Draft N" while true, "vN" after; the number keeps counting.
    draft: z.boolean().default(true),
    publishDate: z.date(),
    // One line on what changed. Inline markdown.
    changes: z.string(),
    // Harvard references. Inline markdown; bare URLs become links.
    references: z.array(z.string()).default([]),
  }),
})

export const collections = {
  posts,
  strategy,
}