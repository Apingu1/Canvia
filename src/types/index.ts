export type PageKey =
  | "home"
  | "eligibility"
  | "how"
  | "conditions"
  | "information"
  | "pricing"
  | "about"
  | "governance"
  | "cqc"
  | "referrers"
  | "faqs"
  | "contact"
  | "privacy"
  | "terms"
  | "complaints"
  | "safeguarding"
  | "accessibility"
  | "disclaimer";

export type EligibilityOutcome = "potential" | "info" | "unsuitable" | "urgent" | null;

export interface NavItem {
  label: string;
  page: PageKey;
}

export interface ConditionCardData {
  title: string;
  copy: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PathwayStepData {
  number: string;
  title: string;
  text: string;
}

export interface PricingItem {
  title: string;
  price: string;
  text: string;
  highlighted?: boolean;
}

export type NavigateFn = (page: PageKey) => void;
