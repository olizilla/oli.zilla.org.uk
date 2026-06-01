import { z, defineCollection } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(), 
    link: z.string().url().optional(),
    image: z.string().url().optional(),
    layout: z.string(),
    draft: z.boolean().optional().default(false),
    publishDate: z.date().optional(),
    tagline: z.string().optional(),
    emoji: z.string().optional(),
    atUri: z.string().optional(),
    mainClass: z.string().optional(),
  }),
})

export const collections = {
  posts
}