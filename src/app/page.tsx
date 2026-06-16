/**
 * Static Marketing Page — Project Management Software Directory
 *
 * SSG strategy:
 *  - This page is statically generated at build time (force-static).
 *  - The shell HTML is fully cacheable by any CDN.
 *  - Only the <SoftwareListing /> component fetches live data from /api/software
 *    at runtime on the client, acting as a dynamic "island" within the static page.
 *
 * Cache-Control intent:
 *  - CDN: s-maxage=3600 (1 hour), stale-while-revalidate=86400 (24 h)
 *  - Browsers: max-age=0 so they always re-validate with the CDN
 */

import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ArticleSections from "@/components/ArticleSections";
import SoftwareListing from "@/components/SoftwareListing";
import Footer from "@/components/Footer";

// Force this page to be statically generated at build time.
export const dynamic = "force-static";

// Instruct Next.js to revalidate the static page every hour.
export const revalidate = 3600;

function SoftwareListingFallback() {
  return (
    <section className="bg-[#F5F7FA] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 items-start">
          {/* Sidebar skeleton */}
          <aside className="w-64 flex-shrink-0 hidden lg:block space-y-3">
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-9 bg-white border border-gray-200 rounded animate-pulse" />
            <div className="h-9 bg-white border border-gray-200 rounded animate-pulse" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
            ))}
          </aside>
          {/* Cards skeleton */}
          <div className="flex-1 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── Statically generated sections ─────────────────────── */}
        <Hero />

        {/* ── Dynamic island: fetches live data from /api/software ─ */}
        <Suspense fallback={<SoftwareListingFallback />}>
          <SoftwareListing />
        </Suspense>

        {/* ── Article / content sections (static) ───────────────── */}
        <ArticleSections />
      </main>
      <Footer />
    </>
  );
}
