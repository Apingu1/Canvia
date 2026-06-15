import type { PageKey } from "../types";

export const pagePaths: Record<PageKey, string> = {
  home: "/",
  eligibility: "/check-eligibility",
  how: "/how-it-works",
  conditions: "/conditions",
  information: "/medical-cannabis-information",
  pricing: "/pricing",
  about: "/about",
  governance: "/clinical-governance",
  cqc: "/cqc-regulation",
  referrers: "/for-referrers",
  faqs: "/faqs",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
  complaints: "/complaints",
  safeguarding: "/safeguarding",
  accessibility: "/accessibility",
  disclaimer: "/medical-disclaimer"
};

export function pageToPath(page: PageKey): string {
  return pagePaths[page];
}

export function pathToPage(pathname: string): PageKey {
  const normalisedPath = pathname.replace(/\/$/, "") || "/";
  const match = (Object.entries(pagePaths) as [PageKey, string][]).find(([, path]) => path === normalisedPath);

  return match?.[0] ?? "home";
}
