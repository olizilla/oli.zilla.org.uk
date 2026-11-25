import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeToc from './src/lib/rehype-toc.mjs';
import rehypeInlineSvg from './src/lib/rehype-inline-svg.mjs';
import remarkCitedQuotes from './src/lib/remark-cited-quotes.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false
  }), mdx()],
  markdown: {
    remarkPlugins: [remarkCitedQuotes],
    // rehypeToc needs heading ids, so assign them first
    rehypePlugins: [rehypeHeadingIds, rehypeToc, rehypeInlineSvg],
  },
  site: 'https://oli.zilla.org.uk'
});
