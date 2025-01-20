import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
  type: "content",
  schema: {
    title: z.string(),
    published: z.date(),
    draft: z.boolean().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    url:z.string().url().optional()
  },
});
export const collections = {
  post: postCollection,
};
