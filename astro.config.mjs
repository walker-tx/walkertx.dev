import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig, envField } from "astro/config";
import remarkDirective from "remark-directive";
import { admonishmentPlugin } from "./src/lib/remark-plugins/admonitions.mjs";
import { setDefaultLayout } from "./src/lib/remark-plugins/default-layout.mjs";

export default defineConfig({
  site: process.env.URL,
  markdown: {
    remarkPlugins: [remarkDirective, admonishmentPlugin, setDefaultLayout],
  },
  integrations: [mdx(), sitemap(), tailwind()],
  experimental: {
    env: {
      schema: {
        /**
         * @see https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
         * */
        URL: envField.string({
          context: "server",
          access: "public",
          optional: true,
        }),
      },
    },
  },
});
