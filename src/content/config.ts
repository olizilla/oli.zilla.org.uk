import { z, defineCollection } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    layout: z.string(),
    published: z.boolean().optional().default(true)
  }),
})

export const collections = {
  posts
}