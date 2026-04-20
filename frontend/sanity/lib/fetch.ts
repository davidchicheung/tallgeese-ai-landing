import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/sanity/queries/page";
import { PAGES_BY_PARENT_QUERY } from "@/sanity/queries/pages-by-parent";
import { NAVIGATION_QUERY } from "@/sanity/queries/navigation";
import { SETTINGS_QUERY } from "@/sanity/queries/settings";
import {
  POST_QUERY,
  POSTS_QUERY,
  POSTS_SLUGS_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_POSTS_COUNT_QUERY,
  FEATURED_POST_QUERY,
} from "@/sanity/queries/post";
import { CATEGORIES_QUERY } from "@/sanity/queries/category";
import {
  PAGE_QUERY_RESULT,
  PAGES_BY_PARENT_QUERY_RESULT,
  PAGES_SLUGS_QUERY_RESULT,
  POST_QUERY_RESULT,
  POSTS_QUERY_RESULT,
  POSTS_SLUGS_QUERY_RESULT,
  BLOG_POSTS_QUERY_RESULT,
  BLOG_POSTS_COUNT_QUERY_RESULT,
  FEATURED_POST_QUERY_RESULT,
  CATEGORIES_QUERY_RESULT,
  NAVIGATION_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
} from "@/sanity.types";

export const BLOG_PAGE_SIZE = 9;

export const fetchSanityPageBySlug = async ({
  slug,
  parent = "",
}: {
  slug: string;
  parent?: string;
}): Promise<PAGE_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug, parent },
  });

  return data;
};

export const fetchSanityPagesStaticParams =
  async (): Promise<PAGES_SLUGS_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: PAGES_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data;
  };

export const fetchSanityPagesByParent = async ({
  parent,
  excludeSlug = "",
}: {
  parent: string;
  excludeSlug?: string;
}): Promise<PAGES_BY_PARENT_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: PAGES_BY_PARENT_QUERY,
    params: { parent, excludeSlug },
  });

  return data;
};

export const fetchSanityPosts = async (): Promise<POSTS_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: POSTS_QUERY,
  });

  return data;
};

export const fetchSanityPostBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<POST_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityPostsStaticParams =
  async (): Promise<POSTS_SLUGS_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: POSTS_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data;
  };

export const fetchSanityNavigation =
  async (): Promise<NAVIGATION_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: NAVIGATION_QUERY,
    });

    return data;
  };

export const fetchSanitySettings = async (): Promise<SETTINGS_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return data;
};

export const fetchSanityBlogPosts = async ({
  category,
  page,
  excludeSlug,
}: {
  category?: string;
  page: number;
  excludeSlug?: string;
}): Promise<BLOG_POSTS_QUERY_RESULT> => {
  const start = (page - 1) * BLOG_PAGE_SIZE;
  const end = start + BLOG_PAGE_SIZE;
  const { data } = await sanityFetch({
    query: BLOG_POSTS_QUERY,
    params: {
      category: category ?? null,
      start,
      end,
      excludeSlug: excludeSlug ?? null,
    },
  });

  return data;
};

export const fetchSanityBlogPostsCount = async ({
  category,
  excludeSlug,
}: {
  category?: string;
  excludeSlug?: string;
}): Promise<BLOG_POSTS_COUNT_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: BLOG_POSTS_COUNT_QUERY,
    params: {
      category: category ?? null,
      excludeSlug: excludeSlug ?? null,
    },
  });

  return data;
};

export const fetchSanityFeaturedPost =
  async (): Promise<FEATURED_POST_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: FEATURED_POST_QUERY,
    });

    return data;
  };

export const fetchSanityCategories =
  async (): Promise<CATEGORIES_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: CATEGORIES_QUERY,
    });

    return data;
  };
