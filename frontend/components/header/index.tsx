import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { buttonVariants } from "@/components/ui/button";
import { fetchSanitySettings, fetchSanityNavigation } from "@/sanity/lib/fetch";
import { LanguageSwitcher } from "@/components/language-switcher";
import { DEFAULT_LANGUAGE, localePath } from "@/lib/i18n";
import { dictionary } from "@/lib/dictionary";

export default async function Header({
  lang = DEFAULT_LANGUAGE,
}: {
  lang?: string;
}) {
  const settings = await fetchSanitySettings();
  const navigation = await fetchSanityNavigation(lang);
  const text = dictionary(lang);
  return (
    <header className="sticky top-0 w-full border-border/40 bg-background/95 z-50">
      <div className="container hidden lg:grid grid-cols-[auto_1fr_auto] items-center h-14">
        <Link href={localePath(lang, "/")} aria-label={text.homePage}>
          <Logo settings={settings} />
        </Link>
        <DesktopNav navigation={navigation} />
        <div className="flex items-center gap-4">
          <LanguageSwitcher lang={lang} />
          <Link
            href={localePath(lang, "/contact")}
            className={buttonVariants({ variant: "default" })}
          >
            {text.contactUs}
          </Link>
        </div>
      </div>
      <div className="container flex items-center justify-between h-14 lg:hidden">
        <Link href={localePath(lang, "/")} aria-label={text.homePage}>
          <Logo settings={settings} />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} />
          <MobileNav navigation={navigation} settings={settings} lang={lang} />
        </div>
      </div>
    </header>
  );
}
