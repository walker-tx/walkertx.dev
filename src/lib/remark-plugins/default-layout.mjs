const DEFAULT_LAYOUT = "@layouts/MarkdownLayout.astro";

export function setDefaultLayout() {
  return function (_, file) {
    const { frontmatter } = file.data.astro;
    if (!frontmatter.layout) frontmatter.layout = DEFAULT_LAYOUT;
  };
}
