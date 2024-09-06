import { h } from "hastscript";
import { visit } from "unist-util-visit";

// This plugin is an example to turn `::note` into divs, passing arbitrary
// attributes.
export function admonishmentPlugin() {
  return (tree) => {
    /**
     * Description
     *
     * @param {string} tree
     *   Tree.
     * @returns {number}
     *   Nothing.
     */
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (node.name !== "note") return;

        const data = node.data || (node.data = {});
        const tagName = node.type === "textDirective" ? "span" : "div";

        data.hName = tagName;
        data.hProperties = h(tagName, node.attributes || {}).properties;

        if (!data.hProperties.className) {
          data.hProperties.className = ["admonition"];
        } else {
          data.hProperties.className.splice(0, 0, "admonition");
        }
      }
    });
  };
}
