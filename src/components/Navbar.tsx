// components/Navbar.tsx

import { Search, Store } from "lucide-react";

function CapterraLogo() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M2 4.5 22 3 11.2 22 2 4.5Z" fill="#FF9D28" />
      <path d="M2 4.5 11.2 22 12 11.2 2 4.5Z" fill="#68C5ED" />
      <path d="M22 3 12 11.2 11.2 22 22 3Z" fill="#044D80" />
      <path d="M2 4.5 12 11.2 8.4 7.8 2 4.5Z" fill="#E54747" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <nav className="h-[68px] border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1320px] items-center justify-between px-5">
        {/* Left Section */}
        <div className="flex shrink-0 items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <CapterraLogo />
            <span className="text-[19px] font-bold tracking-tight text-[#1a1a1a]">
              Capterra
            </span>
          </div>

          {/* Search */}
          <div className="relative flex items-center">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Find the right software"
              className="
                h-[40px]
                w-[230px]
                rounded-full
                border
                border-gray-200
                bg-gray-50
                pl-12
                pr-4
                text-[13px]
                leading-none
                text-gray-700
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-gray-300
                focus:bg-white
              "
            />
          </div>
          <div className="flex flex-1 items-center justify-center gap-12 px-8 text-[14px] font-medium text-[#2c3e50]">
            <button className="group relative py-1 transition-colors hover:text-gray-900">
              Categories
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-current transition-all duration-200 group-hover:w-full" />
            </button>
            <button className="group relative py-1 transition-colors hover:text-gray-900">
              Compare
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-current transition-all duration-200 group-hover:w-full" />
            </button>
            <button className="group relative py-1 transition-colors hover:text-gray-900">
              Write a review
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-current transition-all duration-200 group-hover:w-full" />
            </button>
          </div>

        </div>

        {/* Right Section */}
        <div className="flex shrink-0 items-center gap-5">
          <button className="flex items-center gap-2 text-[14px] font-medium text-[#2c3e50] hover:text-gray-900">
            <Store size={17} />
            <span>For vendors</span>
          </button>

          <button
            className="
              rounded-full
              bg-[#2563EB]
              px-5
              py-2.5
              text-[13px]
              font-semibold
              text-white
              transition
              hover:bg-[#1D4ED8]
            "
          >
            Join or Log in
          </button>
        </div>
      </div>
    </nav>
  );
}
