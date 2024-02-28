import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [tailwind({
    applyBaseStyles: false
  })],
  adapter: cloudflare()
});