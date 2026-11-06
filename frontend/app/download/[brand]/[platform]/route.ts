import { downloadResponse } from "@/lib/download";

// /download/<brand>/<platform>: windows-x64, or linux-arm64 (the .deb for
// NVIDIA DGX Spark and ASUS Ascent GX10).
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ brand: string; platform: string }> },
) {
  const { brand, platform } = await params;
  return downloadResponse(brand, platform);
}
