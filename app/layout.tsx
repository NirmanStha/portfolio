import Schema from "@/components/Schema";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});
const siteName = "Nirman Shrestha";
const siteDescription =
  "Nirman Shrestha is a frontend engineer building high-performance React and Next.js experiences with clean interfaces and thoughtful motion.";
const fallbackSiteUrl = "https://nirman-shrestha.com.np";
const siteUrlCandidate =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;
const siteUrl = (() => {
  if (!siteUrlCandidate) {
    return fallbackSiteUrl;
  }

  const withProtocol =
    siteUrlCandidate.startsWith("http://") ||
    siteUrlCandidate.startsWith("https://")
      ? siteUrlCandidate
      : `https://${siteUrlCandidate}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return fallbackSiteUrl;
  }
})();
const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE;

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const metadataVerification = googleVerification
  ? { google: googleVerification }
  : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Frontend Engineer`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  // Twitter/OG images intentionally omitted here: the file-convention
  // app/twitter-image.tsx and app/opengraph-image.tsx generate real PNGs
  // (explicit URLs here would override them; the old og-image.svg is not
  // renderable by social/search scrapers).
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Frontend Engineer`,
    description: siteDescription,
    creator: twitterHandle,
  },
  category: "portfolio",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "Nirman Shrestha",
    "NirmanShrestha",
    "Frontend Engineer",
    "Frontend Developer",
    "React",
    "React.js",
    "ReactJS",
    "Next.js",
    "NextJS",
    "JavaScript",
    "TypeScript Developer",
    "TS JS",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  verification: metadataVerification,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "profile",
    firstName: "Nirman",
    lastName: "Shrestha",
    username: "NirmanStha",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} | Frontend Engineer`,
    description: siteDescription,
  },

  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Schema />
      </head>
      <body
        className={cn(
          "min-h-screen bg-night font-sans antialiased",
          inter.variable,
          spaceGrotesk.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
