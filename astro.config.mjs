import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark';
import rehypeToc from './src/lib/rehype-toc.mjs';
import rehypeInlineSvg from './src/lib/rehype-inline-svg.mjs';
import remarkCitedQuotes from './src/lib/remark-cited-quotes.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    // The remark/rehype pipeline, rather than Astro 7's default Sätteri, so
    // the plugins in src/lib keep working.
    processor: unified({
      remarkPlugins: [remarkCitedQuotes],
      // rehypeToc needs heading ids, so assign them first
      rehypePlugins: [rehypeHeadingIds, rehypeToc, rehypeInlineSvg],
    }),
  },
  // Keep a single space between inline elements, as before Astro 7.
  compressHTML: true,
  site: 'https://oli.zilla.org.uk'
});
