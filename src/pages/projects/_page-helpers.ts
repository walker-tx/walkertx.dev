import { type CollectionEntry } from "astro:content";

export function sortProjectEntries(
  a: CollectionEntry<"projects">,
  b: CollectionEntry<"projects">,
): number {
  if (a.data.date === "ongoing" && b.data.date === "ongoing")
    return a.data.title.localeCompare(b.data.title);
  if (b.data.date === "ongoing") return 1;
  if (a.data.date === "ongoing") return -1;
  return b.data.date.valueOf() - a.data.date.valueOf();
}
