import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "walkertx.dev",
  EMAIL: "walker@walkertx.dev",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Walker Lockard's development portfolio homepage.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PERSONALITY_TESTS: Metadata = {
  TITLE: "Personality Tests",
  DESCRIPTION:
    "A collection of results for personality tests and assesments that I have taken.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "github",
    HREF: "https://github.com/wlockiv",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/walker-lockard",
  },
];
