import SoftwareCard from "./SoftwareCard";
import { categories, querySoftware } from "@/lib/software-data";
import {
  KeyFeatures,
  LinkButton,
  SearchBox,
  SortSelect,
} from "./SoftwareListingControls";

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

const PAGE_SIZE = 12;

interface SoftwareListingProps {
  category?: string;
  sort?: string;
  search?: string;
  page?: number;
}

export default function SoftwareListing({
  category = "All",
  sort = "rating",
  search = "",
  page = 1,
}: SoftwareListingProps) {
  // Data is fetched/filtered on the server for every request (SSR).
  const { data: items, total } = querySoftware({
    category,
    sort,
    search,
    page,
    limit: PAGE_SIZE,
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  // Build a sliding window of up to 9 page numbers (no ellipsis)
  const WINDOW = 9;
  const windowStart = Math.min(
    Math.max(1, currentPage - Math.floor(WINDOW / 2)),
    Math.max(1, totalPages - WINDOW + 1)
  );
  const windowEnd = Math.min(windowStart + WINDOW - 1, totalPages);
  const pageNumbers: number[] = [];
  for (let p = windowStart; p <= windowEnd; p++) {
    pageNumbers.push(p);
  }

  const rangeStart = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, total);

  return (
    <section id="software-listing" className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 items-start">

          {/* ── Left Sidebar (static filters) ──────────────────────────── */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">

            {/* Filter header */}
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-800">
                Filter ({total.toLocaleString()}) Products:
              </h2>
            </div>

            {/* Search product */}
            <SearchBox
              initialValue={search}
              className="bg-gray-50 border border-gray-200 rounded-full mb-5 flex items-center px-4 py-2.5 gap-2.5"
            />

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
              <SortSelect value={sort} />
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
              <KeyFeatures features={KEY_FEATURES} />
            </div>

            <hr className="border-gray-300 mb-5" />

            {/* Category pills (compact) */}
            <div className="mb-5">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Category</h3>
              <div className="space-y-1">
                {categories.slice(0, 6).map((cat) => (
                  <LinkButton
                    key={cat}
                    params={{ category: cat === "All" ? null : cat, page: null }}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded transition-colors ${
                      category === cat
                        ? "bg-[#EBF5FF] text-[#0073EA] font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </LinkButton>
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
            <SearchBox
              initialValue={search}
              className="lg:hidden mb-4 bg-white border border-gray-200 rounded flex items-center px-3 py-2 gap-2"
            />

            {/* Sort + live badge row */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {total === 0
                    ? "0 products"
                    : `Showing ${rangeStart}–${rangeEnd} of ${total} products`}
                </span>
                {category !== "All" && (
                  <span className="text-xs bg-[#EBF5FF] text-[#0073EA] px-2 py-0.5 rounded font-medium inline-flex items-center">
                    {category}
                    <LinkButton
                      params={{ category: null, page: null }}
                      ariaLabel="Clear category filter"
                      className="ml-1.5 hover:text-blue-800"
                    >
                      ×
                    </LinkButton>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Server-rendered · fresh on every request
              </div>
            </div>

            {/* Empty state */}
            {items.length === 0 && (
              <div className="text-center py-16 text-gray-500 bg-white rounded border border-gray-200">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
              </div>
            )}

            {/* Listing */}
            {items.length > 0 && (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <SoftwareCard key={item.id} item={item} rank={(currentPage - 1) * PAGE_SIZE + idx + 1} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {items.length > 0 && totalPages > 1 && (
              <div className="mt-8">
                <nav
                  className="flex items-center justify-center gap-1.5 flex-wrap"
                  aria-label="Pagination"
                >
                  {/* First page */}
                  <LinkButton
                    params={{ page: "1" }}
                    scrollToId="software-listing"
                    disabled={currentPage === 1}
                    ariaLabel="First page"
                    className="w-9 h-9 flex items-center justify-center rounded text-gray-500 hover:text-[#0073EA] hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 5v14M19 5l-7 7 7 7" />
                    </svg>
                  </LinkButton>

                  {/* Prev */}
                  <LinkButton
                    params={{ page: String(currentPage - 1) }}
                    scrollToId="software-listing"
                    disabled={currentPage === 1}
                    ariaLabel="Previous page"
                    className="w-9 h-9 flex items-center justify-center rounded text-gray-500 hover:text-[#0073EA] hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </LinkButton>

                  {/* Page numbers */}
                  {pageNumbers.map((p) => (
                    <LinkButton
                      key={p}
                      params={{ page: String(p) }}
                      scrollToId="software-listing"
                      ariaCurrent={p === currentPage ? "page" : undefined}
                      className={`min-w-[36px] h-9 px-2 flex items-center justify-center rounded text-sm transition-colors ${
                        p === currentPage
                          ? "border border-gray-400 text-gray-900 font-semibold"
                          : "text-gray-700 hover:text-[#0073EA] hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </LinkButton>
                  ))}

                  {/* Next */}
                  <LinkButton
                    params={{ page: String(currentPage + 1) }}
                    scrollToId="software-listing"
                    disabled={currentPage === totalPages}
                    ariaLabel="Next page"
                    className="w-9 h-9 flex items-center justify-center rounded text-gray-500 hover:text-[#0073EA] hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </LinkButton>

                  {/* Last page */}
                  <LinkButton
                    params={{ page: String(totalPages) }}
                    scrollToId="software-listing"
                    disabled={currentPage === totalPages}
                    ariaLabel="Last page"
                    className="w-9 h-9 flex items-center justify-center rounded text-gray-500 hover:text-[#0073EA] hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 5v14M5 5l7 7-7 7" />
                    </svg>
                  </LinkButton>
                </nav>

                <p className="text-center text-sm italic text-gray-500 mt-3">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            )}

            {/* Top-rated software email signup */}
            {items.length > 0 && (
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
