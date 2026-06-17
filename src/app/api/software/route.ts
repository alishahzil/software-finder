import { NextRequest, NextResponse } from "next/server";
import { querySoftware } from "@/lib/software-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const result = querySoftware({
    category: searchParams.get("category") || "All",
    sort: searchParams.get("sort") || "rating",
    search: searchParams.get("search") || "",
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: parseInt(searchParams.get("limit") || "25", 10),
  });

  return NextResponse.json(
    result,
    {
      headers: {
        // Allow CDN to cache individual category/sort responses for 60 seconds
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "Vary": "Accept-Encoding",
      },
    }
  );
}
