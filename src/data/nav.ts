import type { NavItem } from "../types";

export const primaryNav: NavItem[] = [
  { label: "Home", page: "home" },
  { label: "Check Eligibility", page: "eligibility" },
  { label: "How It Works", page: "how" },
  { label: "Conditions", page: "conditions" },
  { label: "Pricing", page: "pricing" },
  { label: "Governance", page: "governance" },
  { label: "FAQs", page: "faqs" },
  { label: "Contact", page: "contact" }
];

export const footerSections: { title: string; links: NavItem[] }[] = [
  {
    title: "Clinic",
    links: [
      { label: "Check Eligibility", page: "eligibility" },
      { label: "How It Works", page: "how" },
      { label: "Conditions", page: "conditions" },
      { label: "Patient Information", page: "information" },
      { label: "Pricing", page: "pricing" }
    ]
  },
  {
    title: "Governance",
    links: [
      { label: "Clinical Governance", page: "governance" },
      { label: "CQC & Regulation", page: "cqc" },
      { label: "For Referrers", page: "referrers" },
      { label: "Complaints", page: "complaints" },
      { label: "Safeguarding", page: "safeguarding" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", page: "privacy" },
      { label: "Terms & Conditions", page: "terms" },
      { label: "Accessibility", page: "accessibility" },
      { label: "Medical Disclaimer", page: "disclaimer" },
      { label: "Contact", page: "contact" }
    ]
  }
];
