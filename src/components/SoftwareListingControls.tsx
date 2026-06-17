"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Client "islands" for the (otherwise server-rendered) software listing.
 *
 * None of these fetch data. They only mutate the URL search params, which
 * triggers a fresh server render of the page with the new filters applied.
 */

type ParamUpdates = Record<string, string | null>;

function useUpdateParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (updates: ParamUpdates, opts?: { scrollToId?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") params.delete(key);
        else params.set(key, value);
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });

      if (opts?.scrollToId && typeof window !== "undefined") {
        document
          .getElementById(opts.scrollToId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [router, pathname, searchParams]
  );
}

/** Generic button that updates URL params on click (category pills, pagination, chips). */
export function LinkButton({
  params,
  scrollToId,
  disabled,
  className,
  children,
  ariaLabel,
  ariaCurrent,
}: {
  params: ParamUpdates;
  scrollToId?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  ariaCurrent?: "page" | undefined;
}) {
  const update = useUpdateParams();
  return (
    <button
      type="button"
      onClick={() => update(params, { scrollToId })}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      className={className}
    >
      {children}
    </button>
  );
}

export function SearchBox({
  initialValue,
  className,
  placeholder = "Search Product Name",
}: {
  initialValue: string;
  className?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(initialValue);
  const update = useUpdateParams();

  const submit = () => update({ search: value || null, page: null });

  return (
    <div className={className}>
      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder={placeholder}
        className="flex-1 text-sm text-gray-600 outline-none bg-transparent placeholder-gray-400"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            update({ search: null, page: null });
          }}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function SortSelect({ value }: { value: string }) {
  const update = useUpdateParams();
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => update({ sort: e.target.value, page: null })}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none cursor-pointer appearance-none"
      >
        <option value="rating">Top Rated</option>
        <option value="reviews">Most Reviewed</option>
        <option value="name">Name (A–Z)</option>
      </select>
      <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

/** Pure UI toggle for the "Key Features" list — no data fetching involved. */
export function KeyFeatures({
  features,
}: {
  features: { id: string; label: string; popular?: boolean }[];
}) {
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <div className="space-y-2.5">
        {features.slice(0, showAll ? undefined : 5).map((feat) => (
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
        type="button"
        onClick={() => setShowAll((s) => !s)}
        className="text-[#0073EA] text-xs font-medium mt-2 hover:underline"
      >
        {showAll ? "View less" : "View more"}
      </button>
    </>
  );
}
