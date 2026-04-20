import Blocks from "@/components/blocks";
import HeroSceneLoader from "@/components/3d/hero-scene-loader";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/sanity/lib/metadata";

function parseSegments(segments: string[]): { slug: string; parent: string } | null {
  if (segments.length === 1) return { slug: segments[0], parent: "" };
  if (segments.length === 2) return { parent: segments[0], slug: segments[1] };
  return null;
}

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams();

  return pages
    .filter((page) => page.slug?.current && page.slug.current !== "index")
    .map((page) => ({
      slug: page.parent
        ? [page.parent, page.slug!.current!]
        : [page.slug!.current!],
    }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const parsed = parseSegments(params.slug);
  if (!parsed) notFound();

  const page = await fetchSanityPageBySlug(parsed);
  if (!page) notFound();

  return generatePageMetadata({ page, slug: params.slug.join("/") });
}

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const parsed = parseSegments(params.slug);
  if (!parsed) notFound();

  const page = await fetchSanityPageBySlug(parsed);
  if (!page) notFound();

  const showHeroScene = parsed.parent === "" && parsed.slug === "about";

  return (
    <>
      {showHeroScene && <HeroSceneLoader />}
      <Blocks blocks={page?.blocks ?? []} currentSlug={parsed.slug} />
    </>
  );
}
