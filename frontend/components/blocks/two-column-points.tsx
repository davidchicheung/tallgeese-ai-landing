import SectionContainer from "@/components/ui/section-container";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type TwoColumnPointsProps = Extract<Block, { _type: "two-column-points" }>;

export default function TwoColumnPoints({
  padding,
  colorVariant,
  columns,
}: TwoColumnPointsProps) {
  if (!columns || columns.length === 0) {
    return null;
  }

  const maxPoints = columns.reduce(
    (max, col) => Math.max(max, col.points?.length ?? 0),
    0,
  );
  const totalRows = 2 + maxPoints;

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-10 md:gap-y-0"
        style={{ gridTemplateRows: `repeat(${totalRows}, auto)` }}
      >
        {columns.map((column) => (
          <div
            key={column._key}
            className="flex flex-col md:grid md:grid-rows-subgrid"
            style={{ gridRow: `span ${totalRows}` }}
          >
            {column.title ? (
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 md:self-end">
                {column.title}
              </h2>
            ) : (
              <div className="hidden md:block" aria-hidden />
            )}
            {column.description ? (
              <p className="text-muted-foreground text-base mb-6 md:mb-0 md:pt-4 md:pb-6">
                {column.description}
              </p>
            ) : (
              <div className="hidden md:block" aria-hidden />
            )}
            {Array.from({ length: maxPoints }).map((_, i) => {
              const point = column.points?.[i];
              if (!point) {
                return (
                  <div key={i} className="hidden md:block" aria-hidden />
                );
              }
              return (
                <div
                  key={i}
                  className="py-4 border-b border-border text-foreground"
                >
                  {point}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
