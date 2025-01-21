import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postCollection = defineCollection({
  // For content layer you no longer define a `type`
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    //base: "./src/data/blog",
    base: "./src/content/posts",
  }),
  schema: z.object({
    title: z.string(),
    published: z.date(),
    draft: z.boolean().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    url:z.string().url().optional()
    //title: z.string(),
    //description: z.string(),
    //pubDate: z.coerce.date(),
    //updatedDate: z.coerce.date().optional(),
  }),
});

const specCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    //base: "./src/data/blog",
    base: "./src/content/spec",
  })
})

export const collections = {
  posts: postCollection,
  spec: specCollection
};
