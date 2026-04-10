import { Person, WebSite } from "schema-dts";
import {
  NEXT_PUBLIC_GITHUB_URL,
  NEXT_PUBLIC_LINKEDIN_URL,
  NEXT_PUBLIC_SITE_URL,
} from "@/lib/constants";

const certifications = [
  {
    "@type": "EducationalOccupationalCredential",
    name: "Advance React",
    url: "https://coursera.org/share/16b4cdfa35e7ae0228d70a29fa73c331",
    credentialCategory: "Professional Certificate",
    recognizedBy: {
      "@type": "Organization",
      name: "Meta",
    },
  },
  {
    "@type": "EducationalOccupationalCredential",
    name: "Web Design Certification",
    url: "https://broadwayinfosys.com/certificate-verification-code/eyJpdiI6InhkMDZJMWR0ZUtJRTJ4T3ptZ0pLMUE9PSIsInZhbHVlIjoiaEdZOFQ2eDBXL0I4bFFkZWRpd3ZYQT09IiwibWFjIjoiNTJjNDc4MzFkNTEzOTUzYjk3MTUwMzQ4ZDBmYThkZDJiMGNmOGI1NjE2NjE2ZjQ2YzUwM2QzOTcxZjVmOTM3YyIsInRhZyI6IiJ9",
    credentialCategory: "Certificate",
    recognizedBy: {
      "@type": "Organization",
      name: "Broadway Infosys",
    },
  },
] as const;

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
  hasCredential: certifications,
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
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
