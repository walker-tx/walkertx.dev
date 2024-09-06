import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import { admonishmentPlugin } from "./src/lib/remark-plugins/admonitions.mjs";
import { setDefaultLayout } from "./src/lib/remark-plugins/default-layout.mjs";

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkDirective, admonishmentPlugin, setDefaultLayout],
  },
  site: "https://astro-nano-demo.vercel.app",
  integrations: [mdx(), sitemap(), tailwind()],
});
