/**
 * Project Management Software Directory — Server-Side Rendered (SSR)
 *
 * SSR strategy:
 *  - This page is rendered on the server for every request (force-dynamic).
 *  - Filter / sort / search / pagination state lives in the URL search params,
 *    so the server reads them and renders fully-populated HTML each time.
 *  - <SoftwareListing /> is a server component that queries the data directly
 *    (no client-side fetch, no loading spinner) and ships ready-to-display HTML.
 *  - Only small interactive controls (search box, sort, category, pagination)
 *    are client components that update the URL to trigger a fresh server render.
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ArticleSections from "@/components/ArticleSections";
import SoftwareListing from "@/components/SoftwareListing";
import Footer from "@/components/Footer";

// Render on the server for every request (SSR).
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const category = params.category ?? "All";
  const sort = params.sort ?? "rating";
  const search = params.search ?? "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── Static marketing sections ─────────────────────────── */}
        <Hero />

        {/* ── Server-rendered listing (data fetched on the server) ─ */}
        <SoftwareListing
          category={category}
          sort={sort}
          search={search}
          page={page}
        />

        {/* ── Article / content sections (static) ───────────────── */}
        <ArticleSections />
      </main>
      <Footer />
    </>
  );
}
