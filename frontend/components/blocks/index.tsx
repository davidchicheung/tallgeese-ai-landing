import { PAGE_QUERY_RESULT } from "@/sanity.types";
import Hero1 from "@/components/blocks/hero/hero-1";
import Hero2 from "@/components/blocks/hero/hero-2";
import SectionHeader from "@/components/blocks/section-header";
import CompanyHero from "@/components/blocks/company-hero";
import CompanyInfo from "@/components/blocks/company-info";
import TallgeeseInfo from "@/components/blocks/tallgeese-info";
import SplitRow from "@/components/blocks/split/split-row";
import GridRow from "@/components/blocks/grid/grid-row";
import Carousel1 from "@/components/blocks/carousel/carousel-1";
import Carousel2 from "@/components/blocks/carousel/carousel-2";
import BlogCarousel from "@/components/blocks/carousel/blog-carousel";
import PageCarousel from "@/components/blocks/page-carousel";
import TimelineRow from "@/components/blocks/timeline/timeline-row";
import Cta1 from "@/components/blocks/cta/cta-1";
import LogoCloud1 from "@/components/blocks/logo-cloud/logo-cloud-1";
import FAQs from "@/components/blocks/faqs";
import FormNewsletter from "@/components/blocks/forms/newsletter";
import FormContact from "@/components/blocks/forms/contact";
import AllPosts from "@/components/blocks/all-posts";
import FeatureCards from "@/components/blocks/feature-cards";
import Legal from "@/components/blocks/legal";
import ImageBlock from "@/components/blocks/image-block";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];

const componentMap: {
  [K in Block["_type"]]: React.ComponentType<Extract<Block, { _type: K }>>;
} = {
  "hero-1": Hero1,
  "hero-2": Hero2,
  "section-header": SectionHeader,
  "company-hero": CompanyHero,
  "company-info": CompanyInfo,
  "tallgeese-info": TallgeeseInfo,
  "split-row": SplitRow,
  "grid-row": GridRow,
  "carousel-1": Carousel1,
  "carousel-2": Carousel2,
  "blog-carousel": BlogCarousel,
  "page-carousel": PageCarousel,
  "timeline-row": TimelineRow,
  "cta-1": Cta1,
  "logo-cloud-1": LogoCloud1,
  faqs: FAQs,
  "form-newsletter": FormNewsletter,
  "form-contact": FormContact,
  "all-posts": AllPosts,
  "feature-cards": FeatureCards,
  legal: Legal,
  "image-block": ImageBlock,
};

export default function Blocks({
  blocks,
  currentSlug,
}: {
  blocks: Block[];
  currentSlug?: string;
}) {
  return (
    <>
      {blocks?.map((block) => {
        if (block._type === "page-carousel") {
          return (
            <PageCarousel
              {...block}
              currentSlug={currentSlug}
              key={block._key}
            />
          );
        }
        const Component = componentMap[block._type];
        if (!Component) {
          // Fallback for development/debugging of new component types
          console.warn(
            `No component implemented for block type: ${block._type}`,
          );
          return <div data-type={block._type} key={block._key} />;
        }
        return <Component {...(block as any)} key={block._key} />;
      })}
    </>
  );
}
