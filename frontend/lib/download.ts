// Sends a visitor to the newest published installer of TgsAgent for a brand and
// platform: the one its stable update feed offers, so a page's download button
// (e.g. /download/asus, /download/asus/linux-arm64) never needs changing after
// a release.
const FEEDS = "https://updates.tallgeese.ai/feeds";
const RELEASES = "https://updates.tallgeese.ai/releases/";
const BRANDS = ["default", "asus"];

// Each platform's feed (its variant) and the manifest entry its installer is under.
const PLATFORMS: Record<string, { variant: string; keys: string[] }> = {
  "windows-x64": { variant: "std", keys: ["windows-x86_64-nsis", "windows-x86_64"] },
  "linux-arm64": { variant: "cuda", keys: ["linux-aarch64-deb"] },
};

type Manifest = {
  brand?: string;
  platforms?: Record<string, { url?: string }>;
};

async function installerUrl(brand: string, platform: string): Promise<string | null> {
  const { variant, keys } = PLATFORMS[platform];
  try {
    const res = await fetch(`${FEEDS}/${brand}/stable/${variant}/latest.json`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const manifest: Manifest = await res.json();
    if (manifest.brand && manifest.brand !== brand) return null;
    const url = keys.map((key) => manifest.platforms?.[key]?.url).find(Boolean);
    return url?.startsWith(RELEASES) ? url : null;
  } catch {
    return null;
  }
}

export async function downloadResponse(brand: string, platform: string) {
  if (!BRANDS.includes(brand) || !Object.hasOwn(PLATFORMS, platform)) {
    return new Response("Not found", { status: 404 });
  }

  const url = await installerUrl(brand, platform);
  if (!url) {
    return new Response(
      "This download isn't available right now. Please try again later.",
      {
        status: 503,
        headers: { "Retry-After": "300", "Cache-Control": "no-store" },
      },
    );
  }

  return new Response(null, {
    status: 302,
    headers: { Location: url, "Cache-Control": "no-store" },
  });
}
