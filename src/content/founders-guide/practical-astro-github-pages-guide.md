---
title: "A Practical Guide to Astro on GitHub Pages"
description: "How I converted a hand-written personal site into an Astro publication with Markdown content, SEO metadata, RSS, sitemaps and GitHub Actions deployment."
publishedDate: 2026-07-23
updatedDate: 2026-07-23
category: "Build Guide"
tags: ["Astro", "GitHub Pages", "static site", "SEO", "GitHub Actions", "technical guide"]
featured: false
draft: false
readingTime: "11 min read"
keyTakeaway: "Astro and GitHub Pages are enough for a fast, scalable personal publication. Store articles as Markdown, generate static HTML, deploy through the official Astro GitHub Action and keep dynamic features external until they justify a backend."
---

My personal site started as hand-written HTML and CSS hosted on GitHub Pages.

That was the right decision for a profile. It became the wrong architecture for a publication.

Once I planned to publish guides, research, experiences and regularly updated articles, manually duplicating HTML pages would create inconsistent metadata, fragile navigation and unnecessary work.

I moved the site to Astro while keeping GitHub Pages as the host.

This guide explains the architecture and the exact implementation pattern.

## Why Astro

Astro generates static HTML by default. That matters for a content-heavy personal site because pages are:

- fast;
- crawlable without client-side rendering;
- inexpensive to host;
- straightforward to cache; and
- portable between hosting providers.

Astro also provides content collections for structured Markdown. A schema can require every article to include a title, description, dates, category, tags and other metadata.

## The architecture

```text
Markdown articles
      ↓
Astro content collection
      ↓
Layouts + schema metadata
      ↓
Static HTML in /dist
      ↓
GitHub Actions
      ↓
GitHub Pages + custom domain
```

GitHub stores the source. GitHub Actions builds the site. GitHub Pages serves the generated files.

## 1. Create the Astro project

For a new project:

```bash
npm create astro@latest
```

For an existing repository, install Astro and initialise these core files:

```bash
npm install astro @astrojs/rss @astrojs/sitemap
```

A minimal `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/rss": "^4",
    "@astrojs/sitemap": "^3",
    "astro": "^7"
  }
}
```

Commit the generated lockfile. The official Astro deployment action uses it to detect the package manager.

## 2. Configure the custom domain

Set the canonical site URL in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://varunjain.info',
  integrations: [sitemap()],
  output: 'static',
  trailingSlash: 'always'
});
```

Because this repository uses a custom domain, no repository-name `base` path is required.

Create `public/CNAME`:

```text
varunjain.info
```

Astro copies files from `public/` into the final build without processing them.

## 3. Define a content collection

Create `src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const foundersGuide = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/founders-guide'
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false)
  })
});

export const collections = { foundersGuide };
```

The schema prevents incomplete articles from silently reaching production.

## 4. Write articles in Markdown

Create a file such as:

```text
src/content/founders-guide/own-your-personal-brand.md
```

Add frontmatter:

```yaml
---
title: "How to Own Your Personal Brand"
description: "A practical system for building an independent professional asset."
publishedDate: 2026-07-23
category: "Personal Brand"
tags: ["personal brand", "owned media"]
draft: false
---
```

Everything below the frontmatter is regular Markdown.

## 5. Generate one route for every article

Create `src/pages/founders-guide/[...id].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import PostLayout from '../../layouts/PostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection(
    'foundersGuide',
    ({ data }) => !data.draft
  );

  return posts.map((post) => ({
    params: { id: post.id },
    props: { post }
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<PostLayout {...post.data} slug={post.id}>
  <Content />
</PostLayout>
```

Astro generates a static page for every published entry during the build.

## 6. Add SEO once, in the layout

The layout should generate:

- title and meta description;
- canonical URL;
- Open Graph metadata;
- X card metadata;
- author information;
- publication and update dates;
- `BlogPosting` structured data; and
- breadcrumb structured data.

Do this centrally. Do not manually copy metadata into every page template.

The article frontmatter supplies the page-specific values.

## 7. Generate an RSS feed

Install `@astrojs/rss`, then create `src/pages/rss.xml.js`.

The endpoint loads all non-draft articles and returns their titles, descriptions, publication dates and URLs. Readers and other systems can then follow new articles without depending on a social platform.

## 8. Generate a sitemap

The `@astrojs/sitemap` integration generates sitemap files during the production build using the `site` value from `astro.config.mjs`.

Reference it from `public/robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://varunjain.info/sitemap-index.xml
```

Submit the sitemap in Google Search Console and Bing Webmaster Tools after deployment.

## 9. Deploy with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Astro to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: withastro/action@v5

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

In the repository settings, change **Pages → Build and deployment → Source** to **GitHub Actions**.

The official [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/) recommends this deployment model.

## 10. Validate before merging

Run:

```bash
npm install
npm run build
```

The build should validate the content schema, type-check Astro components and generate every route.

Inspect the `dist/` directory or run:

```bash
npm run preview
```

Then test:

- homepage;
- article index;
- individual articles;
- RSS feed;
- sitemap;
- canonical URLs;
- mobile layout; and
- the custom-domain CNAME.

## What not to add yet

A static publication does not need a backend simply because dynamic features are possible.

Avoid adding:

- a user database;
- custom authentication;
- your own comments service;
- server-side rendering;
- an EC2 instance; or
- a complex headless CMS

until the content workflow genuinely requires them.

Comments, analytics, forms and search can initially use lightweight client-side or external services. The permanent assets remain the domain, URLs and Markdown source.

## The operating workflow

My publishing workflow is now:

1. Write or edit one Markdown file.
2. Open a pull request.
3. Validate the production build.
4. Merge to `master`.
5. Let GitHub Actions deploy.
6. Submit or notify search systems.
7. Distribute the article through social posts.
8. Add useful reader questions back into the canonical page.

The result is not merely a prettier website. It is a publishing system that can accumulate hundreds of articles without turning maintenance into the main job.
