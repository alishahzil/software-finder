import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Best Project Management Software 2026 | SoftwareFinder",
  description:
    "Compare the 25 best project management tools of 2026. Expert reviews, real user ratings, pricing, and feature comparisons to help your team pick the right software.",
  keywords: [
    "project management software",
    "best PM tools",
    "task management",
    "team collaboration",
    "project tracking",
  ],
  openGraph: {
    title: "Best Project Management Software 2026 | SoftwareFinder",
    description:
      "Compare the 25 best project management tools. Expert reviews, ratings, and pricing.",
    type: "website",
    siteName: "SoftwareFinder",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Project Management Software 2026 | SoftwareFinder",
    description: "Compare 25+ PM tools — reviews, ratings, and pricing.",
  },
  alternates: {
    canonical: "https://softwarefinder.com/project-management-software",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
