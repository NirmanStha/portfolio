import type { MetadataRoute } from "next";

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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl,
  };
}
