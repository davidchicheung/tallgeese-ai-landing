import Blocks from "@/components/blocks";
import HeroSceneLoader from "@/components/3d/hero-scene-loader";
import { PageLanguages } from "@/components/language-switcher";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import { notFound, redirect } from "next/navigation";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import { DEFAULT_LANGUAGE, translationLinks } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string[] }> };

function parseSegments(segments: string[]): { slug: string; parent: string } | null {
  if (segments.length === 1) return { slug: segments[0], parent: "" };
  if (segments.length === 2) return { parent: segments[0], slug: segments[1] };
  return null;
}

// The page at this address, in this language. A page that has not been
// translated sends the visitor to the default language's page instead.
async function fetchPage({ lang, slug }: { lang: string; slug: string[] }) {
  const parsed = parseSegments(slug);
  if (!parsed) notFound();

  const page = await fetchSanityPageBySlug({ ...parsed, language: lang });
  if (!page) {
    if (lang !== DEFAULT_LANGUAGE) redirect(`/${slug.join("/")}`);
    notFound();
  }

  return { page, parsed };
}

// Every page in every language at once. Filtering by the layout's lang
// instead leaves a language with no pages returning an empty list, and Next
// then prerenders none of the others either.
export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams();

  return pages
    .filter((page) => page.slug?.current && page.slug.current !== "index")
    .map((page) => ({
      lang: page.language,
      slug: page.parent
        ? [page.parent, page.slug!.current!]
        : [page.slug!.current!],
    }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { page } = await fetchPage(params);

  return generatePageMetadata({ page, slug: params.slug.join("/") });
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { page, parsed } = await fetchPage(params);

  const showHeroScene = parsed.parent === "" && parsed.slug === "about";

  return (
    <>
      <PageLanguages links={translationLinks(page)} />
      {showHeroScene && <HeroSceneLoader />}
      <Blocks
        blocks={page?.blocks ?? []}
        currentSlug={parsed.slug}
        lang={params.lang}
      />
    </>
  );
}
