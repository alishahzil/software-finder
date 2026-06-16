const linkColumns: { items: string[] }[] = [
  { items: ["Software Categories", "Blog & Research", "Write a Review"] },
  { items: ["My Account", "About Us", "Press Page", "Legal Terms", "Privacy Policy"] },
  { items: ["For Vendors", "Vendor Login"] },
];

const socialIcons: { label: string; path: string }[] = [
  {
    label: "LinkedIn",
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    label: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand block */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <svg viewBox="0 0 50 50" className="w-7 h-7" aria-hidden="true">
              <polygon points="3,33 22,8 22,21" fill="#FF9D28" />
              <polygon points="22,8 40,8 22,21" fill="#68C5ED" />
              <polygon points="22,21 22,42 8,33" fill="#0F73B9" />
              <polygon points="22,21 40,8 22,42" fill="#044D80" />
            </svg>
            <span className="text-2xl font-bold text-[#1A1A2E] tracking-tight">
              Capterra
            </span>
          </div>
          <p className="text-sm font-bold text-[#44444A] mb-2.5">
            The #1 destination for finding the right software
          </p>
          <p className="text-sm text-gray-500 mb-3">
            We help your organization save time, increase productivity and accelerate growth.
          </p>
          <a href="#" className="text-sm font-bold text-[#0073EA] hover:underline">
            Learn more about Capterra
          </a>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">
          {linkColumns.map((col, i) => (
            <ul key={i} className="space-y-4">
              {col.items.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm font-semibold text-[#44444A] hover:text-[#0073EA] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ))}

          {/* Address column */}
          <div className="text-sm text-gray-500 space-y-1">
            <p className="font-bold text-[#44444A]">Capterra</p>
            <p>100 S Wacker Dr</p>
            <p>STE 600</p>
            <p>Chicago, IL 60606</p>
            <p className="pt-3">
              <a href="#" className="font-bold text-[#44444A] hover:text-[#0073EA] transition-colors">
                Email Us
              </a>
            </p>
          </div>
        </div>

        {/* Divider + social icons */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-5">
            {socialIcons.map((icon) => (
              <a
                key={icon.label}
                href="#"
                aria-label={icon.label}
                className="text-gray-400 hover:text-[#0073EA] transition-colors"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
