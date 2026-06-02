import { z, defineCollection } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    layout: z.string(),
    publishDate: z.date(),
    title: z.string(),
    tagline: z.string(),
    author: z.string().default('Oli Evans'),
    link: z.string().url().optional(),
    image: z.string().url().optional(),
    draft: z.boolean().default(false),
    emoji: z.string().optional(),
    atUri: z.string().optional(),
    mainClass: z.string().optional(),
  }),
})

export const collections = {
  posts
}