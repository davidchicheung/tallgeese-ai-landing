import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    // Revalidate the specific document type tag used by defineLive
    revalidateTag(`sanity:${body._type}`, { expire: 0 });
    // Also revalidate the sync tags to ensure fresh data
    revalidateTag("sanity:fetch-sync-tags", { expire: 0 });

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: unknown) {
    console.error(error);
    return new Response(
      error instanceof Error ? error.message : "Internal Server Error",
      { status: 500 }
    );
  }
}
