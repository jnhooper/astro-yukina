import { getCollection } from "astro:content";
import { SlugToRealSlug } from "./hash";

export interface Archive {
  title: string;
  id: string;
  date: Date;
  tags: string[];
}

export interface Tag {
  name: string;
  slug: string;
  posts: Archive[];
}

export interface Category {
  name: string;
  slug: string;
  posts: Archive[];
}

export async function GetSortedPosts() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  const sorted = allBlogPosts.sort((a, b) => {
    const dateA = new Date(a.data.published);
    const dateB = new Date(b.data.published);
    return dateA > dateB ? -1 : 1;
  });

  //for (let i = 1; i < sorted.length; i++) {
  //  sorted[i].data.nextSlug = sorted[i - 1].id;
  //  sorted[i].data.nextTitle = sorted[i - 1].data.title;
  //}
  //for (let i = 0; i < sorted.length - 1; i++) {
  //  sorted[i].data.prevSlug = sorted[i + 1].id;
  //  sorted[i].data.prevTitle = sorted[i + 1].data.title;
  //}

  return sorted;
}

export async function GetArchives() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const archives = new Map<number, Archive[]>();

  for (const post of allBlogPosts) {
    const date = new Date(post.data.published);
    const year = date.getFullYear();
    if (!archives.has(year)) {
      archives.set(year, []);
    }
    archives.get(year)!.push({
      title: post.data.title,
      id: `/posts/${SlugToRealSlug(post.id)}`,
      date: date,
      tags: post.data.tags || [],
    });
  }

  const sortedArchives = new Map(
    [...archives.entries()].sort((a, b) => b[0] - a[0]),
  );
  sortedArchives.forEach((value) => {
    value.sort((a, b) => (a.date > b.date ? -1 : 1));
  });

  return sortedArchives;
}

export async function GetTags() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const tags = new Map<string, Tag>();
  allBlogPosts.forEach((post) => {
    if(post.data.tags){
      post.data.tags.forEach((tag: string) => {
        const tagSlug = SlugToRealSlug(tag);
        if (!tags.has(tagSlug)) {
          tags.set(tagSlug, {
            name: tag,
            slug: `/tags/${tagSlug}`,
            posts: [],
          });
        }
        tags.get(tagSlug)!.posts.push({
          title: post.data.title,
          id: `/posts/${SlugToRealSlug(post.id)}`,
          date: new Date(post.data.published),
          tags: post.data.tags|| [],
        });
      });
    }
  });

  return tags;
}

export async function GetCategories() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const categories = new Map<string, Category>();

  allBlogPosts.forEach((post) => {
    const categorySlug = SlugToRealSlug(post.data.category);

    if (!categories.has(categorySlug)) {
      categories.set(categorySlug, {
        name: post.data.category,
        slug: `/categories/${categorySlug}`,
        posts: [],
      });
    }
    categories.get(categorySlug)!.posts.push({
      title: post.data.title,
      id: `/posts/${SlugToRealSlug(post.id)}`,
      date: new Date(post.data.published),
      tags: post.data.tags||[],
    });
  });

  return categories;
}
