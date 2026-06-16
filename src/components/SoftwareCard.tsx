import { SoftwareItem } from "@/lib/software-data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating > star - 1;
        const pct = partial ? Math.round((rating % 1) * 100) : 0;
        return (
          <span key={star} className="relative w-4 h-4 inline-block">
            {/* Empty star */}
            <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {(filled || partial) && (
              <svg
                className="absolute inset-0 w-4 h-4 text-[#1A1A2E]"
                fill="currentColor"
                viewBox="0 0 20 20"
                style={partial ? { clipPath: `inset(0 ${100 - pct}% 0 0)` } : {}}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
          </span>
        );
      })}
    </div>
  );
}

const CAPTERRA_FEATURES = [
  "Access Controls/Permissions",
  "Collaboration Tools",
  "Commenting/Notes",
  "Multiple Projects",
  "Prioritization",
  "Project Planning/Scheduling",
  "Reporting/Project Tracking",
  "Task Management",
  "Time & Expense Tracking",
];

function getRecommendPct(rating: number): number {
  return Math.min(99, Math.max(70, Math.round(rating * 19 + 2)));
}

interface SoftwareCardProps {
  item: SoftwareItem;
  rank: number;
}

export default function SoftwareCard({ item, rank }: SoftwareCardProps) {
  const recommendPct = getRecommendPct(item.rating);
  const itemFeatureSet = new Set(item.features.map((f) => f.toLowerCase()));

  const featureMatches = CAPTERRA_FEATURES.map((feat) => ({
    label: feat,
    supported: itemFeatureSet.has(feat.toLowerCase()) || item.features.some(
      (f) => feat.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(feat.toLowerCase().split("/")[0])
    ),
  }));

  return (
    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6 pb-5">
        {/* Top row: logo + name/rating + actions */}
        <div className="flex items-start gap-5">
          {/* Logo */}
          <div
            className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-sm"
            style={{ backgroundColor: item.color }}
          >
            {item.logo}
          </div>

          {/* Name + rating */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <a
                href={item.url}
                className="text-[#0073EA] font-bold text-lg hover:underline leading-tight"
              >
                {item.name}
              </a>
              <svg className="w-4 h-4 text-[#0073EA] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>

            {/* Stars row */}
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <StarRating rating={item.rating} />
              <span className="text-sm font-bold text-gray-900 ml-0.5">{item.rating.toFixed(1)}</span>
              <span className="text-sm text-gray-500">({item.reviewCount.toLocaleString()})</span>
              <svg className="w-3.5 h-3.5 text-[#0073EA]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Capterra Shortlist badge */}
            {item.badge && (
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center gap-1 bg-[#F5F9FF] border border-[#CCE0FF] rounded px-2 py-0.5">
                  <svg className="w-3.5 h-3.5 text-[#0073EA]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1.5l2.47 5.01 5.53.805-4 3.897.944 5.503L10 14.271l-4.944 2.596.944-5.503-4-3.897 5.53-.805L10 1.5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-semibold text-[#0073EA]">Capterra Shortlist</span>
                  <svg className="w-3 h-3 text-gray-400 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center text-[#0073EA] hover:bg-blue-50 hover:border-[#0073EA] transition-colors"
              title="Save"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <a
              href={item.url}
              className="bg-[#0073EA] hover:bg-[#0062c4] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              Visit Website
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6m0 0H9m9 0v9" />
              </svg>
            </a>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-[15px] text-gray-700 leading-relaxed line-clamp-2">
          {item.description}{" "}
          <a href={item.url} className="text-[#0073EA] hover:underline font-semibold whitespace-nowrap">
            Learn more about {item.name}
          </a>
        </p>

        {/* Features section */}
        <div className="mt-5">
          <p className="text-sm font-bold text-gray-900 mb-3">
            Project Management features reviewers most value
          </p>
          <div className="grid grid-rows-3 grid-flow-col gap-x-6 gap-y-2.5">
            {featureMatches.map(({ label, supported }) => (
              <div key={label} className="flex items-center gap-2">
                {supported ? (
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className="text-sm text-gray-700 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer: Add to compare (white) + recommend (right-aligned green block) */}
      <div className="border-t border-gray-100 flex items-stretch justify-between gap-2">
        <label className="flex items-center gap-2 cursor-pointer px-6 py-3.5">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 accent-[#0073EA]"
          />
          <span className="text-sm text-gray-700">Add to compare</span>
        </label>
        <div className="flex items-center gap-1.5 text-sm text-green-700 font-semibold bg-[#F2FBF4] px-6 py-3.5 rounded-br-xl">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          {recommendPct}% recommend this product
        </div>
      </div>
    </article>
  );
}

