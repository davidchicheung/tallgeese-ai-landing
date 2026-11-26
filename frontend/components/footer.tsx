import Logo from "@/components/logo";
import Link from "next/link";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { ModeToggle } from "@/components/menu-toggle";
import { fetchSanitySettings, fetchSanityNavigation } from "@/sanity/lib/fetch";
import { DEFAULT_LANGUAGE, localePath } from "@/lib/i18n";
import { dictionary } from "@/lib/dictionary";

export default async function Footer({
  lang = DEFAULT_LANGUAGE,
}: {
  lang?: string;
}) {
  const settings = await fetchSanitySettings();
  const navigation = await fetchSanityNavigation(lang);
  const text = dictionary(lang);

  const items = navigation[0]?.items;

  // Only dropdown items become footer columns
  const dropdownItems = items?.filter(
    (item) =>
      item.itemType === "dropdown" && "children" in item && item.children,
  );

  return (
    <footer>
      <div className="dark:bg-background py-12 xl:py-16 dark:text-gray-300">
        <div className="container">
          {dropdownItems && dropdownItems.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <Link href={localePath(lang, "/")} aria-label={text.homePage}>
                  <Logo settings={settings} />
                </Link>
              </div>
              {dropdownItems.map((navItem) => {
                const title =
                  "title" in navItem ? (navItem.title as string) : "";
                const children =
                  "children" in navItem ? navItem.children : null;

                const legalLinks =
                  title === text.legalColumn
                    ? [
                        { title: text.privacy, href: localePath(lang, "/privacy") },
                        { title: text.terms, href: localePath(lang, "/terms") },
                        { title: text.license, href: localePath(lang, "/license") },
                      ]
                    : [];

                return (
                  <div key={navItem._key}>
                    <h3 className="text-sm font-semibold text-foreground mb-4">
                      {title}
                    </h3>
                    <ul className="list-none space-y-3">
                      {children?.map((child) => (
                        <li key={child._key}>
                          <Link
                            href={child.href || "#"}
                            target={
                              child.target === "blank" ? "_blank" : undefined
                            }
                            rel={
                              child.target === "blank"
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                      {legalLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-10 flex items-center justify-between text-xs border-t pt-8">
            <div className="flex items-center gap-2 text-foreground/60">
              <span>&copy; {new Date().getFullYear()}</span>
              {settings?.copyright && (
                <span className="[&>p]:!m-0">
                  <PortableTextRenderer value={settings.copyright} />
                </span>
              )}
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
