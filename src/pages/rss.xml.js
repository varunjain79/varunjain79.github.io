import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('foundersGuide', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());

  return rss({
    title: 'Varun Jain — Founder’s Guide',
    description: 'First-hand writing on building, hiring, careers and AI.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedDate,
      link: `/founders-guide/${post.id}/`
    })),
    customData: '<language>en-IN</language>'
  });
}
