import { NextRequest, NextResponse } from "next/server";
import { softwareData, SoftwareItem } from "@/lib/software-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "rating";
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "25", 10);

  let results: SoftwareItem[] = [...softwareData];

  // Filter by category
  if (category !== "All") {
    results = results.filter((item) => item.category === category);
  }

  // Filter by search query
  if (search.trim()) {
    const query = search.toLowerCase();
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.features.some((f) => f.toLowerCase().includes(query))
    );
  }

  // Sort
  if (sort === "rating") {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sort === "reviews") {
    results.sort((a, b) => b.reviewCount - a.reviewCount);
  } else if (sort === "name") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Pagination
  const total = results.length;
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  return NextResponse.json(
    { data: paginated, total, page, limit },
    {
      headers: {
        // Allow CDN to cache individual category/sort responses for 60 seconds
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "Vary": "Accept-Encoding",
      },
    }
  );
}
