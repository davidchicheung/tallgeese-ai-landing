import { Button } from "@/components/ui/button";
import Link from "next/link";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type Hero2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "hero-2" }
>;

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

export default function Hero2({ tagLine, title, body, links }: Hero2Props) {
  return (
    <div className="container dark:bg-background pt-[80px] pb-20 text-center">
      {tagLine && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium animate-fade-up [animation-delay:100ms] opacity-0 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {tagLine}
        </div>
      )}
      {title && (
        <h2 className="mt-6 font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl animate-fade-up [animation-delay:200ms] opacity-0">
          {renderTitle(title)}
        </h2>
      )}
      {body && (
        <div className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground mt-6 max-w-2xl mx-auto animate-fade-up [animation-delay:300ms] opacity-0 [&_strong]:text-foreground [&_strong]:font-medium [&_strong]:text-[1.05em]">
          <PortableTextRenderer value={body} />
        </div>
      )}
      {links && links.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-up [animation-delay:400ms] opacity-0">
          {links.map((link) => (
            <Button key={link.title} variant={link?.buttonVariant} asChild>
              <Link
                href={link.href || "#"}
                target={link.target ? "_blank" : undefined}
                rel={link.target ? "noopener" : undefined}
              >
                {link.title}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
