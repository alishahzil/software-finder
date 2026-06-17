"use client";

import { useState, useEffect, useCallback } from "react";
import SoftwareCard from "./SoftwareCard";
import { SoftwareItem, categories } from "@/lib/software-data";

interface ApiResponse {
  data: SoftwareItem[];
  total: number;
  page: number;
  limit: number;
}

const PLAN_TYPES = [
  { id: "free-trial", label: "Free Trial", popular: true },
  { id: "free-version", label: "Free Version", popular: false },
  { id: "monthly", label: "Monthly Subscription", popular: false },
  { id: "annual", label: "Annual Subscription", popular: false },
  { id: "one-time", label: "One-Time License", popular: false },
];

const KEY_FEATURES = [
  { id: "all", label: "All key features", popular: true },
  { id: "access-controls", label: "Access Controls/Permissions" },
  { id: "agile", label: "Agile Methodologies" },
  { id: "ai-copilot", label: "AI Copilot" },
  { id: "billing", label: "Billing & Invoicing" },
  { id: "budget", label: "Budget Management" },
  { id: "calendar", label: "Calendar Management" },
  { id: "client-portal", label: "Client Portal" },
  { id: "collaboration", label: "Collaboration Tools" },
];

const RELATED_CATEGORIES = [
  "Project Portfolio Management Software",
  "Requirements Management Software",
  "Product Roadmap Software",
  "Strategic Planning Software",
  "Gantt Chart Software",
  "Productivity Software",
  "Product Management Software",
  "Project Planning Software",
  "Nonprofit Project Management Software",
];

function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
          <div className="h-3 bg-gray-100 rounded w-2/5" />
        </div>
        <div className="w-24 h-8 bg-gray-200 rounded flex-shrink-0" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-4/5" />
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-3 bg-gray-100 rounded" />
        ))}
      </div>
    </div>
  );
}

const PAGE_SIZE = 12;

export default function SoftwareListing() {
  const [items, setItems] = useState<SoftwareItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("rating");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [page, setPage] = useState(1);

  const fetchSoftware = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        category: selectedCategory,
        sort,
        search,
        page: String(page),
        limit: String(PAGE_SIZE),
      });
      const res = await fetch(`/api/software?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch software data");
      const json: ApiResponse = await res.json();
      setItems(json.data);
      setTotal(json.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, sort, search, page]);

  useEffect(() => {
    fetchSoftware();
  }, [fetchSoftware]);

  // Reset to the first page whenever filters/search/sort change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, sort, search]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const goToPage = (next: number) => {
    const target = Math.min(Math.max(1, next), totalPages);
    if (target === page) return;
    setPage(target);
    if (typeof window !== "undefined") {
      document
        .getElementById("software-listing")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Build a sliding window of up to 9 page numbers (no ellipsis)
  const WINDOW = 9;
  const windowStart = Math.min(
    Math.max(1, page - Math.floor(WINDOW / 2)),
    Math.max(1, totalPages - WINDOW + 1)
  );
  const windowEnd = Math.min(windowStart + WINDOW - 1, totalPages);
  const pageNumbers: number[] = [];
  for (let p = windowStart; p <= windowEnd; p++) {
    pageNumbers.push(p);
  }

  const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, total);

  const handleSearch = () => setSearch(searchInput);

  return (
    <section id="software-listing" className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 items-start">

          {/* ── Left Sidebar (static filters) ──────────────────────────── */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">

            {/* Filter header */}
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-800">
                Filter ({loading ? "…" : total.toLocaleString()}) Products:
              </h2>
            </div>

            {/* Search product */}
            <div className="bg-gray-50 border border-gray-200 rounded-full mb-5 flex items-center px-4 py-2.5 gap-2.5">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search Product Name"
                className="flex-1 text-sm text-gray-600 outline-none bg-transparent placeholder-gray-400"
              />
              {searchInput && (
                <button
                  onClick={() => { setSearchInput(""); setSearch(""); }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Sort by */}
            <div className="mb-5">
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="text-sm font-bold text-gray-800">Sort By:</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" strokeWidth={1.8} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.5 9.5a2.5 2.5 0 113.2 2.4c-.5.2-.7.5-.7 1.1v.5" />
                  <path strokeLinecap="round" strokeWidth={2} d="M12 16.5h.01" />
                </svg>
              </div>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none cursor-pointer appearance-none"
                >
                  <option value="rating">Sponsored</option>
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Reviewed</option>
                  <option value="name">Name (A–Z)</option>
                </select>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <hr className="border-gray-300 mb-5" />

            {/* Plan Type */}
            <div className="mb-5">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Plan Type</h3>

              {/* Free Trial (highlighted) */}
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-sm border-gray-300 accent-[#0073EA]"
                />
                <span className="text-sm text-gray-700 group-hover:text-[#0073EA] transition-colors flex-1">
                  {PLAN_TYPES[0].label}
                </span>
                <span className="bg-[#5B8DEF] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-2 leading-snug">
                85% of professionals opt for a 30-day trial before the software purchase
              </p>

              {/* Other subscription plans */}
              <p className="text-sm font-bold text-gray-800 mt-4 mb-3">Other subscription plans:</p>
              <div className="space-y-3">
                {PLAN_TYPES.slice(1).map((plan) => (
                  <label key={plan.id} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-sm border-gray-300 accent-[#0073EA]"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-[#0073EA] transition-colors flex-1">
                      {plan.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-gray-300 mb-5" />

            {/* Key Features */}
            <div className="mb-5">
              <h3 className="text-sm font-bold text-gray-800 mb-1">Key Features</h3>
              <p className="text-xs text-gray-500 mb-3">
                We have selected the most important and critical features as defined by Capterra user reviews
              </p>
              <div className="space-y-2.5">
                {KEY_FEATURES.slice(0, showAllFeatures ? undefined : 5).map((feat) => (
                  <label key={feat.id} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked={feat.id === "all"}
                      className="w-3.5 h-3.5 rounded border-gray-300 accent-[#0073EA]"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-[#0073EA] transition-colors flex-1">
                      {feat.label}
                    </span>
                    {feat.popular && (
                      <span className="bg-[#0073EA] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Popular
                      </span>
                    )}
                  </label>
                ))}
              </div>
              <button
                onClick={() => setShowAllFeatures(!showAllFeatures)}
                className="text-[#0073EA] text-xs font-medium mt-2 hover:underline"
              >
                {showAllFeatures ? "View less" : "View more"}
              </button>
            </div>

            <hr className="border-gray-300 mb-5" />

            {/* Category pills (compact) */}
            <div className="mb-5">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Category</h3>
              <div className="space-y-1">
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded transition-colors ${
                      selectedCategory === cat
                        ? "bg-[#EBF5FF] text-[#0073EA] font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Related Software Category card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Related Software Category:</h3>
              <ul className="space-y-2">
                {RELATED_CATEGORIES.map((cat, idx) => (
                  <li key={cat}>
                    <a
                      href="#"
                      className={`text-[13px] leading-snug block hover:text-[#0073EA] transition-colors ${
                        idx === 0
                          ? "text-gray-800 font-medium underline underline-offset-2"
                          : "text-gray-700"
                      }`}
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* I'm looking for card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3 leading-snug">
                I&apos;m looking for Project Management Software that is:
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-[13px] text-gray-700 hover:text-[#0073EA] flex items-center gap-2 transition-colors">
                    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" strokeWidth={1.8} />
                      <path strokeLinecap="round" strokeWidth={1.8} d="M9 10h.01M15 10h.01" />
                      <path strokeLinecap="round" strokeWidth={1.8} d="M8.5 14.5a4 4 0 007 0" />
                    </svg>
                    Free
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[13px] text-gray-700 hover:text-[#0073EA] flex items-center gap-2 transition-colors">
                    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21h18M4 21V10l8-5 8 5v11M9 21v-6h6v6M9 11h.01M15 11h.01" />
                    </svg>
                    For Small Businesses
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* ── Main content (dynamic) ──────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Mobile search bar */}
            <div className="lg:hidden mb-4 bg-white border border-gray-200 rounded flex items-center px-3 py-2 gap-2">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search Product Name"
                className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
              />
            </div>

            {/* Sort + live badge row */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {loading
                    ? "Loading…"
                    : total === 0
                      ? "0 products"
                      : `Showing ${rangeStart}–${rangeEnd} of ${total} products`}
                </span>
                {selectedCategory !== "All" && (
                  <span className="text-xs bg-[#EBF5FF] text-[#0073EA] px-2 py-0.5 rounded font-medium">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className="ml-1.5 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live data · updates in real time
              </div>
            </div>

            {/* Error state */}
            {error && (
              <div className="text-center py-12 bg-white rounded border border-gray-200">
                <p className="text-red-600 font-medium mb-3">{error}</p>
                <button
                  onClick={fetchSoftware}
                  className="bg-[#0073EA] text-white px-5 py-2 rounded font-medium hover:bg-[#0062c4] transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Loading state */}
            {loading && !error && (
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && items.length === 0 && (
              <div className="text-center py-16 text-gray-500 bg-white rounded border border-gray-200">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
              </div>
            )}

            {/* Listing */}
            {!loading && !error && items.length > 0 && (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <SoftwareCard key={item.id} item={item} rank={idx + 1} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && items.length > 0 && totalPages > 1 && (
              <div className="mt-8">
                <nav
                  className="flex items-center justify-center gap-1.5 flex-wrap"
                  aria-label="Pagination"
                >
                  {/* First page */}
                  <button
                    onClick={() => goToPage(1)}
                    disabled={page === 1}
                    aria-label="First page"
                    className="w-9 h-9 flex items-center justify-center rounded text-gray-500 hover:text-[#0073EA] hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 5v14M19 5l-7 7 7 7" />
                    </svg>
                  </button>

                  {/* Prev */}
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    aria-label="Previous page"
                    className="w-9 h-9 flex items-center justify-center rounded text-gray-500 hover:text-[#0073EA] hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page numbers */}
                  {pageNumbers.map((p) => (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      aria-current={p === page ? "page" : undefined}
                      className={`min-w-[36px] h-9 px-2 flex items-center justify-center rounded text-sm transition-colors ${
                        p === page
                          ? "border border-gray-400 text-gray-900 font-semibold"
                          : "text-gray-700 hover:text-[#0073EA] hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    aria-label="Next page"
                    className="w-9 h-9 flex items-center justify-center rounded text-gray-500 hover:text-[#0073EA] hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Last page */}
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={page === totalPages}
                    aria-label="Last page"
                    className="w-9 h-9 flex items-center justify-center rounded text-gray-500 hover:text-[#0073EA] hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 5v14M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>

                <p className="text-center text-sm italic text-gray-500 mt-3">
                  Page {page} of {totalPages}
                </p>
              </div>
            )}

            {/* Top-rated software email signup */}
            {!loading && !error && items.length > 0 && (
              <div className="mt-8 bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Top-rated software of 2026
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-2xl">
                  Fill out the form and we&apos;ll send a list of the top-rated software based on
                  real user reviews directly to your inbox.
                </p>
                <label htmlFor="toprated-email" className="block text-sm font-bold text-gray-900 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4 flex-wrap">
                  <input
                    id="toprated-email"
                    type="email"
                    className="flex-1 min-w-[240px] border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0073EA] focus:ring-1 focus:ring-[#0073EA] transition-colors"
                  />
                  <button
                    type="button"
                    className="bg-[#0073EA] hover:bg-[#0062c4] text-white text-sm font-bold px-6 py-3 rounded-full transition-colors whitespace-nowrap"
                  >
                    Send me the list
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  By proceeding, you agree to our{" "}
                  <a href="#" className="text-[#0073EA] font-semibold hover:underline">
                    Terms Of Use
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#0073EA] font-semibold hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
