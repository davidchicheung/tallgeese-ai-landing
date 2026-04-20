import { groq } from "next-sanity";
import { metaQuery } from "./shared/meta";
import { hero1Query } from "./hero/hero-1";
import { hero2Query } from "./hero/hero-2";
import { sectionHeaderQuery } from "./section-header";
import { companyHeroQuery } from "./company-hero";
import { companyInfoQuery } from "./company-info";
import { tallgeeseInfoQuery } from "./tallgeese-info";
import { splitRowQuery } from "./split/split-row";
import { gridRowQuery } from "./grid/grid-row";
import { carousel1Query } from "./carousel/carousel-1";
import { carousel2Query } from "./carousel/carousel-2";
import { blogCarouselQuery } from "./carousel/blog-carousel";
import { pageCarouselQuery } from "./page-carousel";
import { timelineQuery } from "./timeline";
import { cta1Query } from "./cta/cta-1";
import { logoCloud1Query } from "./logo-cloud/logo-cloud-1";
import { faqsQuery } from "./faqs";
import { formNewsletterQuery } from "./forms/newsletter";
import { formContactQuery } from "./forms/contact";
import { allPostsQuery } from "./all-posts";
import { featureCardsQuery } from "./feature-cards";
import { legalQuery } from "./legal";
import { imageBlockQuery } from "./image-block";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug && coalesce(parent, "") == $parent][0]{
    parent,
    "slug": slug.current,
    blocks[]{
      ${hero1Query},
      ${hero2Query},
      ${sectionHeaderQuery},
      ${companyHeroQuery},
      ${companyInfoQuery},
      ${tallgeeseInfoQuery},
      ${splitRowQuery},
      ${gridRowQuery},
      ${carousel1Query},
      ${carousel2Query},
      ${blogCarouselQuery},
      ${pageCarouselQuery},
      ${timelineQuery},
      ${cta1Query},
      ${logoCloud1Query},
      ${faqsQuery},
      ${formNewsletterQuery},
      ${formContactQuery},
      ${allPostsQuery},
      ${featureCardsQuery},
      ${legalQuery},
      ${imageBlockQuery},
    },
    ${metaQuery},
  }
`;

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug)]{slug, parent}`;
