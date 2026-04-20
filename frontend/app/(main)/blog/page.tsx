import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "@/components/ui/post-card";
import FeaturedPost from "@/components/blog/featured-post";
import CategoryTabs from "@/components/blog/category-tabs";
import Pagination from "@/components/blog/pagination";
import {
  fetchSanityBlogPosts,
  fetchSanityBlogPostsCount,
  fetchSanityFeaturedPost,
  fetchSanityCategories,
  BLOG_PAGE_SIZE,
} from "@/sanity/lib/fetch";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const metadata: Metadata = {
  title: "TallgeeseAI Blog",
  description:
    "Articles, insights, and announcements from the TallgeeseAI team.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  },
  robots: !isProduction ? "noindex, nofollow" : "index, follow",
};

export default async function BlogIndex(props: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page } = await props.searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const [categories, featuredRaw] = await Promise.all([
    fetchSanityCategories(),
    category ? Promise.resolve(null) : fetchSanityFeaturedPost(),
  ]);

  const featured = featuredRaw ?? null;
  const showFeatured = !category && !!featured;
  const excludeSlug = !category ? (featured?.slug?.current ?? undefined) : undefined;

  const [posts, total] = await Promise.all([
    fetchSanityBlogPosts({ category, page: currentPage, excludeSlug }),
    fetchSanityBlogPostsCount({ category, excludeSlug }),
  ]);

  const totalPages = Math.max(1, Math.ceil((total ?? 0) / BLOG_PAGE_SIZE));

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10">
          TallgeeseAI Blog
        </h1>

        {showFeatured && featured && <FeaturedPost {...featured} />}

        <CategoryTabs categories={categories} activeSlug={category} />

        {posts.length === 0 ? (
          <p className="text-muted-foreground py-12 text-center">
            No posts found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post?.slug?.current}
                href={`/blog/${post?.slug?.current}`}
                className="rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <PostCard
                  title={post?.title ?? ""}
                  image={post?.image ?? null}
                  category={post?.categories?.[0]?.title ?? null}
                  publishedAt={post?.publishedAt ?? null}
                />
              </Link>
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          category={category}
        />
      </div>
    </section>
  );
}
