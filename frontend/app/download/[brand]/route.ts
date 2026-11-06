import { downloadResponse } from "@/lib/download";

// /download/<brand>: the Windows installer, the download buttons' first address.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ brand: string }> },
) {
  const { brand } = await params;
  return downloadResponse(brand, "windows-x64");
}
