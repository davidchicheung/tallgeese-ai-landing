import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import SectionContainer from "@/components/ui/section-container";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type FeatureCardsProps = Extract<Block, { _type: "feature-cards" }>;

function renderTitle(title: string) {
  const parts = title.split(/(\{[^}]+\})/);
  return parts.map((part, i) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      return (
        <span
          key={i}
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
        >
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
}

export default function FeatureCards({
  padding,
  colorVariant,
  title,
  description,
  cards,
}: FeatureCardsProps) {
  return (
    <SectionContainer color={colorVariant} padding={padding}>
      {/* Header */}
      <div className="mb-12">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{renderTitle(title)}</h2>
        )}
        {description && (
          <p className="text-muted-foreground text-lg max-w-[70%]">
            {description}
          </p>
        )}
      </div>

      {/* Grid */}
      {cards && cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card._key} className="flex flex-col py-6 pr-6">
              {card.icon?.svg && (
                <span
                  className="mb-4 text-primary [&>svg]:!w-6 [&>svg]:!h-6"
                  dangerouslySetInnerHTML={{ __html: card.icon.svg }}
                />
              )}
              {card.image?.asset?._id && (
                <div className="relative h-[12rem] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={urlFor(card.image).url()}
                    alt={card.image.alt || ""}
                    fill
                    className="object-cover"
                    placeholder={
                      card.image.asset?.metadata?.lqip ? "blur" : undefined
                    }
                    blurDataURL={card.image.asset?.metadata?.lqip || ""}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    quality={100}
                  />
                </div>
              )}
              {card.title && (
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              )}
              {card.description && (
                <p className="text-muted-foreground text-sm">
                  {card.description}
                </p>
              )}
              {card.features && card.features.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
