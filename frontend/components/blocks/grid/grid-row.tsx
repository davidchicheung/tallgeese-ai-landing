import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import GridCard from "./grid-card";
import PricingCard from "./pricing-card";
import GridPost from "./grid-post";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type GridRow = Extract<Block, { _type: "grid-row" }>;
type GridColumn = NonNullable<NonNullable<GridRow["columns"]>[number]>;

const componentMap: {
  [K in GridColumn["_type"]]: React.ComponentType<
    Extract<GridColumn, { _type: K }>
  >;
} = {
  "grid-card": GridCard,
  "pricing-card": PricingCard,
  "grid-post": GridPost,
};

const GRID_COLS_CLASSES: Record<string, string> = {
  "grid-cols-2": "md:grid-cols-2 lg:grid-cols-2",
  "grid-cols-3": "md:grid-cols-2 lg:grid-cols-3",
  "grid-cols-4": "md:grid-cols-2 lg:grid-cols-4",
};

export default function GridRow({
  padding,
  colorVariant,
  title,
  gridColumns,
  columns,
}: GridRow) {
  return (
    <SectionContainer color={colorVariant} padding={padding}>
      {title && (
        <p
          className={cn(
            "text-muted-foreground mb-5",
            colorVariant === "primary" ? "text-background" : undefined,
          )}
        >
          {title}
        </p>
      )}
      {columns && columns?.length > 0 && (
        <div
          className={cn(
            "grid grid-cols-1 gap-6",
            gridColumns ? GRID_COLS_CLASSES[gridColumns] : "md:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {columns.map((column) => {
            const Component = componentMap[column._type];
            if (!Component) {
              // Fallback for development/debugging of new component types
              console.warn(
                `No component implemented for grid column type: ${column._type}`,
              );
              return <div data-type={column._type} key={column._key} />;
            }
            return (
              <Component
                {...(column as any)}
                color={colorVariant}
                key={column._key}
              />
            );
          })}
        </div>
      )}
    </SectionContainer>
  );
}
