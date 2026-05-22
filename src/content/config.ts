import { z, defineCollection } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(), 
    link: z.string().url().optional(),
    image: z.string().url().optional(),
    layout: z.string(),
    published: z.boolean().optional().default(true),
    tagline: z.string().optional(),
    emoji: z.string().optional()
  }),
})

export const collections = {
  posts
}