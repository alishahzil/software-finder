"use client";

import { useState } from "react";

const AUTHORS = [
  {
    name: "Olivia Montgomery",
    role: "Author",
    initials: "OM",
    color: "bg-amber-500",
  },
  {
    name: "Mehar Luthra",
    role: "Editor",
    initials: "ML",
    color: "bg-teal-500",
  },
];

interface HeroProps {
  activeTab?: "all" | "top";
  onTabChange?: (tab: "all" | "top") => void;
}

export default function Hero({ activeTab = "all", onTabChange }: HeroProps) {
  const [tab, setTab] = useState<"all" | "top">(activeTab);

  const handleTab = (t: "all" | "top") => {
    setTab(t);
    onTabChange?.(t);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-7">
          <a href="#" className="hover:text-[#0073EA] transition-colors flex items-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </a>
          <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-500">Project Management Software</span>
        </nav>

        {/* Heading */}
        <h1 className="text-4xl sm:text-[2.75rem] font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
          Best Project Management Software
        </h1>

        {/* Last updated */}
        <p className="text-sm text-gray-500 mb-5">Last updated on April 2, 2026</p>

        {/* Authors row */}
        <div className="flex items-center mb-8">
          {AUTHORS.map((author, idx) => (
            <div key={author.name} className="flex items-center">
              {idx > 0 && <span className="h-9 w-px bg-gray-200 mx-5" />}
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-full ${author.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {author.initials}
                </div>
                <div className="leading-tight">
                  <p className="text-sm text-gray-700">
                    {author.role === "Author" ? "Written by" : "Edited by"}{" "}
                    <a href="#" className="font-semibold text-[#0073EA] hover:underline">
                      {author.name}
                    </a>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{author.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Products / Top Products tabs */}
        <div className="flex items-center gap-0 border-b border-gray-200 -mb-px">
          {(["all", "top"] as const).map((t) => (
            <button
              key={t}
              onClick={() => handleTab(t)}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                tab === t
                  ? "border-[#0073EA] text-[#0073EA]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {t === "all" ? "All Products" : "Top Products"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
