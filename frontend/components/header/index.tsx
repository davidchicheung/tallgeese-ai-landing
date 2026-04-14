import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { buttonVariants } from "@/components/ui/button";
import { fetchSanitySettings, fetchSanityNavigation } from "@/sanity/lib/fetch";

export default async function Header() {
  const settings = await fetchSanitySettings();
  const navigation = await fetchSanityNavigation();
  return (
    <header className="sticky top-0 w-full border-border/40 bg-background/95 z-50">
      <div className="container hidden lg:grid grid-cols-[auto_1fr_auto] items-center h-14">
        <Link href="/" aria-label="Home page">
          <Logo settings={settings} />
        </Link>
        <DesktopNav navigation={navigation} />
        <Link href="/contact" className={buttonVariants({ variant: "default" })}>
          Contact Us
        </Link>
      </div>
      <div className="container flex items-center justify-between h-14 lg:hidden">
        <Link href="/" aria-label="Home page">
          <Logo settings={settings} />
        </Link>
        <MobileNav navigation={navigation} settings={settings} />
      </div>
    </header>
  );
}
