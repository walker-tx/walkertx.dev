---
title: Saucer Imposter
description: A more prettier menu for the Flying Saucer.
date: ongoing
demo:
  available: true
  url: https://saucerimposter.com
repo:
  public: false
---

<picture>
  <source srcset="/saucer-imposter-homepage.webp" media="(prefers-color-scheme: light)"/>
  <source srcset="/saucer-imposter-homepage-dark.webp"  media="(prefers-color-scheme: dark)"/>
  <img src="/saucer-imposter-homepage.webp"/>
</picture>

:::note
**📓 NOTE 1:** For a variety of reasons, I've decided that it's prudent to keep this
repo private. If you would like a demo and a walkthrough of the code base,
please reach out to me via the [contact form](/#connect).
:::

<br />

:::note
**📓 NOTE 2:** This project has only been designed for mobile. It
doesn't look great in a full-width desktop web browser.
:::

Saucer Imposter is an enriched version of The Flying Saucer's beer menu. This
is a passion project that was born out of disastisfaction with the restaurant's
beer menu, which regularly features over 200 items. This app features:

- Blazing-fast fuzzy search and filtering,
- Menu items enriched with data from [Untappd](https://untappd.com/), and
- Integration with Flying Saucer's loyalty program.

## Technologies & Frameworks

| Service/Technology   | Usage                  |
| -------------------- | ---------------------- |
| SvelteKit            | Frontend               |
| Netlify              | Hosting + CI/CD        |
| Agolia               | Search DB              |
| Supabase             | Auth & Vector DB       |
| OpenAI API           | Embeddings             |
| Serverless Framework | Infrastructure as Code |
| AWS Step Functions   | Data ETL + Entrichment |

## Noteworthy: Data ETL + Enrichment

This automated workflow was created so data from BeerKnurd (Flying Saucer's
beer API) could be enriched with pricing information that only lived in
Untappd.

![Data Enrichment Pipeline](/stepfunctions_graph.svg)

Here is a semi-detailed breakdown of the step function.

#### Step 1: Extract

Data is extracted from two sources: BeerKnurd API, and Untappd.

The beer menus on BeerKnurd are updated regularly for each location, so Saucer
Imposter pulls every single record indiscriminently. This data is the basis for
the records served through the Algolia Search DB..

The Flying Saucer has a menu posted on Untappd for each of their locations as well.

#### Step 2 + 3: Transform + Load

Records from BeerKnurd and Untappd are both conformed to a basic schema.
Records that exist in Algolia but not the extraction are removed from the
database, and new records are stored.

Before being stored, the Untappd brews are converted to embeddings using the
OpenAI API. It's crazy how cheap this is. However, I take a bit of pride in being
efficient, so embeddings are only created for Untappd records that haven't been
embedded in previous iterations of this workflow. This costs me about a penny a
month.

#### Step 4: Enrich

Now, the data in the Algolia search DB needs to be enriched with pricing
information. In this enrichment step (see **SemanticMatchBrewsForEachLocation**),
each Alogolia record that has not already been matched to an Untappd beer is
converted to an embdedding using OpenAI, and semantically searched for using
Supabase (assisted with a vector plugin). If a match above a certain confidence
threshhold is found, then the records are matched, and the Algolia record is
updated with the beer's Untappd Page URL and price.
