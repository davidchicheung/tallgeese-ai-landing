import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import SectionContainer from "@/components/ui/section-container";

import { PAGE_QUERY_RESULT } from "@/sanity.types";

type ImageBlockProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "image-block" }
>;

export default function ImageBlock({
  padding,
  colorVariant,
  sectionWidth = "default",
  image,
}: ImageBlockProps) {
  if (!image?.asset?._id) return null;

  const isNarrow = sectionWidth === "narrow";
  const width = image.asset?.metadata?.dimensions?.width ?? 1920;
  const height = image.asset?.metadata?.dimensions?.height ?? 1280;

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div
        className={cn(
          "mx-auto",
          isNarrow ? "max-w-[48rem]" : "max-w-[64rem]",
        )}
      >
        <Image
          src={urlFor(image).url()}
          alt={image.alt || ""}
          width={width}
          height={height}
          placeholder={image.asset?.metadata?.lqip ? "blur" : undefined}
          blurDataURL={image.asset?.metadata?.lqip || ""}
          className="w-full h-auto max-h-[650px] object-cover rounded-xl"
          quality={100}
        />
      </div>
    </SectionContainer>
  );
}
