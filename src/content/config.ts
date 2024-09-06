import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

const personalityTests = defineCollection({
  type: "content",
  schema: z.object({
    testName: z.string(),
    description: z.string(),
    link: z.union([z.string().url(), z.string().startsWith("/")]),
  }),
});

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.union([z.coerce.date(), z.literal("ongoing")]),
    draft: z.boolean().optional(),
    demo: z.discriminatedUnion("available", [
      z.object({
        available: z.literal(true),
        url: z.string().url(),
      }),
      z.object({
        available: z.literal(false),
      }),
    ]),
    repo: z.discriminatedUnion("public", [
      z.object({ public: z.literal(true), url: z.string().url() }),
      z.object({ public: z.literal(false) }),
    ]),
  }),
});

export const collections = {
  blog,
  work,
  projects,
  "personality-tests": personalityTests,
};
