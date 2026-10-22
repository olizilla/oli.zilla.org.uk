import { getCollection } from 'astro:content'

/** Published posts, newest first, with `href` resolved to the external link or the post page. */
export async function getPosts() {
  const posts = await getCollection('posts', post => !post.data.draft)
  return posts
    .map(post => ({ ...post, href: post.data.link ?? `/${post.slug}` }))
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
}
