import { Person, WebSite } from "schema-dts";
import {
  NEXT_PUBLIC_GITHUB_URL,
  NEXT_PUBLIC_LINKEDIN_URL,
  NEXT_PUBLIC_SITE_URL,
} from "@/lib/constants";

const personSchema: Person = {
  "@id": `${NEXT_PUBLIC_SITE_URL}/#person`,
  "@type": "Person",
  name: "Nirman Shrestha",
  url: NEXT_PUBLIC_SITE_URL,
  sameAs: [NEXT_PUBLIC_GITHUB_URL, NEXT_PUBLIC_LINKEDIN_URL],
  jobTitle: "Frontend Engineer",
  hasOccupation: {
    "@type": "Occupation",
    name: "Frontend Engineer",
    occupationLocation: {
      "@type": "City",
      name: "Remote",
    },
    estimatedSalary: {
      "@type": "MonetaryAmountDistribution",
      currency: "USD",
    },
  },
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
    "Web Performance",
    "Technical SEO",
    "Express.js",
  ],
};

const websiteSchema: WebSite = {
  "@id": `${NEXT_PUBLIC_SITE_URL}/#website`,
  "@type": "WebSite",
  name: "Nirman Shrestha | Frontend Engineer",
  url: NEXT_PUBLIC_SITE_URL,
  author: {
    "@id": `${NEXT_PUBLIC_SITE_URL}/#person`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema],
};

export default function Schema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
