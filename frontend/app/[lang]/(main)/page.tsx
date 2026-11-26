import Blocks from "@/components/blocks";
import HeroSceneLoader from "@/components/3d/hero-scene-loader";
import { PageLanguages } from "@/components/language-switcher";
import { fetchSanityPageBySlug } from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import MissingSanityPage from "@/components/ui/missing-sanity-page";
import { redirect } from "next/navigation";
import { DEFAULT_LANGUAGE, translationLinks } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  const page = await fetchSanityPageBySlug({ slug: "index", language: lang });

  return generatePageMetadata({ page, slug: "index" });
}

export default async function IndexPage(props: Props) {
  const { lang } = await props.params;
  const page = await fetchSanityPageBySlug({ slug: "index", language: lang });

  if (!page) {
    // A language without its own home page uses the default language's.
    if (lang !== DEFAULT_LANGUAGE) redirect("/");
    return MissingSanityPage({ document: "page", slug: "index" });
  }

  return (
    <>
      <PageLanguages links={translationLinks(page)} />
      <HeroSceneLoader />
      <Blocks blocks={page?.blocks ?? []} lang={lang} />
    </>
  );
}
