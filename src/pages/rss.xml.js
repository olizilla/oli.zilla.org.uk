import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('posts');
  
  const rawPosts = blog.filter(post => post.data.published !== false);
  const posts = await Promise.all(
    rawPosts.map(async post => {
      const isoDateStr = post.id.slice(0, 10);
      const date = new Date(isoDateStr);
      const content = await post.render();
      const title = post.data.title ?? content.headings.at(0)?.text ?? 'Untitled';
      return { ...post, date, title };
    })
  );
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return rss({
    title: 'olizilla',
    description: 'Building software 🤖 resilience ✊ enthusiasm 🎉 and community 👯‍♀️',
    site: context.site ?? 'https://oli.zilla.org.uk',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.data.tagline ?? '',
      link: post.data.link ?? `/${post.slug}`,
      commentsUrl: 'https://bsky.app/profile/oli.zilla.org.uk'
    })),
  });
}
