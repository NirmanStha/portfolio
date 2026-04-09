import type { Metadata, Viewport } from "next";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const siteName = "Nirman Shrestha";
const personFullName = "Nirman Shrestha";
const siteDescription =
  "Nirman Shrestha is a frontend engineer building high-performance React and Next.js experiences with clean interfaces and thoughtful motion.";
const fallbackSiteUrl = "http://localhost:3000";
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
const siteImage = `${siteUrl}/og-image.svg`;
const profileSameAs = [
  process.env.NEXT_PUBLIC_GITHUB_URL,
  process.env.NEXT_PUBLIC_LINKEDIN_URL,
  process.env.NEXT_PUBLIC_TWITTER_URL,
].filter((value): value is string => Boolean(value));

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personFullName,
  alternateName: ["NirmanShrestha", "Nirman Shrestha"],
  url: siteUrl,
  image: siteImage,
  jobTitle: "Frontend Engineer",
  description: siteDescription,
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Frontend Engineering",
  ],
  sameAs: profileSameAs,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${siteName} | Frontend Engineer`,
  url: siteUrl,
  description: siteDescription,
  isPartOf: {
    "@type": "WebSite",
    url: siteUrl,
    name: siteName,
  },
  about: {
    "@type": "Person",
    name: personFullName,
  },
};

const structuredData = [profileSchema, websiteSchema, webpageSchema];

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const metadataVerification = googleVerification
  ? { google: googleVerification }
  : undefined;

const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Frontend Engineer`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: `${siteName} | Frontend Engineer`,
    description: siteDescription,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: `${siteName} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Frontend Engineer`,
    description: siteDescription,
    images: [siteImage],
    site: twitterHandle,
    creator: twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0b1120",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="bg-slate-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
