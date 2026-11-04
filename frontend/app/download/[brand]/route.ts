// Sends a visitor to the newest published Windows installer of TgsAgent for a
// brand: the one its stable update feed offers, so a page's download button
// (e.g. /download/asus) never needs changing after a release.
const FEEDS = "https://updates.tallgeese.ai/feeds";
const RELEASES = "https://updates.tallgeese.ai/releases/";
const BRANDS = ["default", "asus"];

type Manifest = {
  brand?: string;
  platforms?: Record<string, { url?: string }>;
};

async function installerUrl(brand: string): Promise<string | null> {
  try {
    const res = await fetch(`${FEEDS}/${brand}/stable/std/latest.json`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const manifest: Manifest = await res.json();
    if (manifest.brand && manifest.brand !== brand) return null;
    const url =
      manifest.platforms?.["windows-x86_64-nsis"]?.url ??
      manifest.platforms?.["windows-x86_64"]?.url;
    return url?.startsWith(RELEASES) ? url : null;
  } catch {
    return null;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ brand: string }> },
) {
  const { brand } = await params;
  if (!BRANDS.includes(brand)) {
    return new Response("Not found", { status: 404 });
  }

  const url = await installerUrl(brand);
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
