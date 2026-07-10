import { Person, ProfilePage, WebSite } from "schema-dts";
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
  alternateName: ["Nirman", "NirmanStha", "Nirman Stha"],
  givenName: "Nirman",
  familyName: "Shrestha",
  url: NEXT_PUBLIC_SITE_URL,
  email: "mailto:nirmans39@gmail.com",
  sameAs: [NEXT_PUBLIC_GITHUB_URL, NEXT_PUBLIC_LINKEDIN_URL],
  jobTitle: "Frontend Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lalitpur",
    addressCountry: "NP",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Frontend Engineer",
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
  alternateName: "Nirman Shrestha Portfolio",
  inLanguage: "en",
  url: NEXT_PUBLIC_SITE_URL,
  author: {
    "@id": `${NEXT_PUBLIC_SITE_URL}/#person`,
  },
};

// Google's Profile Page structured data: tells the crawler this page's main
// entity IS the person, which is exactly what a name query should resolve to.
const profilePageSchema: ProfilePage = {
  "@id": `${NEXT_PUBLIC_SITE_URL}/#profilepage`,
  "@type": "ProfilePage",
  url: NEXT_PUBLIC_SITE_URL,
  name: "Nirman Shrestha | Frontend Engineer",
  isPartOf: { "@id": `${NEXT_PUBLIC_SITE_URL}/#website` },
  mainEntity: { "@id": `${NEXT_PUBLIC_SITE_URL}/#person` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema, profilePageSchema],
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
