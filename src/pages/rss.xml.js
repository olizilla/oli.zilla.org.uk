import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({
  html: true,
});

const images = import.meta.glob('/src/content/posts/**/*.{png,jpg,jpeg,webp,gif}', { eager: true });

function makeUrlsAbsolute(html, postUrl, siteUrl, postId) {
  const normalizedSiteUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  const normalizedPostUrl = postUrl.endsWith('/') ? postUrl.slice(0, -1) : postUrl;

  const lastSlashIndex = postId.lastIndexOf('/');
  const postFileDir = lastSlashIndex !== -1 ? postId.substring(0, lastSlashIndex) : '';

  return html.replace(/(src|href)="([^"]+)"/g, (match, attr, val) => {
    if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('mailto:') || val.startsWith('#')) {
      return match;
    }
    let absoluteUrl = val;
    if (val.startsWith('/')) {
      absoluteUrl = normalizedSiteUrl + val;
    } else {
      const resolvedRelPath = val.startsWith('./') ? val.slice(2) : val;
      const projectPath = `/src/content/posts/${postFileDir ? postFileDir + '/' : ''}${resolvedRelPath}`;
      const importedImage = images[projectPath];
      
      if (importedImage && importedImage.default && importedImage.default.src) {
        absoluteUrl = normalizedSiteUrl + importedImage.default.src;
      } else {
        absoluteUrl = normalizedPostUrl + '/' + resolvedRelPath;
      }
    }
    return `${attr}="${absoluteUrl}"`;
  });
}

export async function GET(context) {
  const blog = await getCollection('posts');
  
  const rawPosts = blog.filter(post => post.data.published !== false);
  let posts = await Promise.all(
    rawPosts.map(async post => {
      const isoDateStr = post.id.slice(0, 10);
      const date = new Date(isoDateStr);
      const content = await post.render();
      const title = post.data.title ?? content.headings.at(0)?.text ?? 'Untitled';
      return { ...post, date, title };
    })
  );
  posts = posts.filter(p => p.date > new Date('2025-01-01'))
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  const siteUrl = context.site ?? 'https://oli.zilla.org.uk';

  return rss({
    title: 'olizilla',
    description: 'Building software 🤖 resilience ✊ enthusiasm 🎉 and community 👯‍♀️',
    site: siteUrl,
    items: posts.map((post) => {
      const postPath = post.data.link ?? `/${post.slug}`;
      const postUrl = postPath.startsWith('http') 
        ? postPath 
        : `${siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl}/${postPath.startsWith('/') ? postPath.slice(1) : postPath}`;
      
      const rawHtml = parser.render(post.body);
      const absoluteHtml = makeUrlsAbsolute(rawHtml, postUrl, siteUrl, post.id);
      const sanitizedHtml = sanitizeHtml(absoluteHtml, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption', 'ul', 'li', 'ol']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
          abbr: ['title'],
          a: ['href', 'name', 'target', 'rel'],
        }
      });

      return {
        title: post.title,
        pubDate: post.date,
        description: post.data.tagline ?? '',
        link: postPath,
        commentsUrl: 'https://bsky.app/profile/oli.zilla.org.uk',
        content: sanitizedHtml,
      };
    }),
  });
}
