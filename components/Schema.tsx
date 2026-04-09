import { Person } from "schema-dts";
import {
  NEXT_PUBLIC_GITHUB_URL,
  NEXT_PUBLIC_LINKEDIN_URL,
  NEXT_PUBLIC_SITE_URL,
} from "@/lib/constants";

const jsonLd = {
  "@context": "https://schema.org",
  ...Person({
    name: "Nirman Shrestha",
    url: NEXT_PUBLIC_SITE_URL,
    sameAs: [NEXT_PUBLIC_GITHUB_URL, NEXT_PUBLIC_LINKEDIN_URL],
    jobTitle: "Frontend Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Nirman Shrestha",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
    ],
  }),
};

export default function Schema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
