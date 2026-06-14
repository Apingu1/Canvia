import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import type { PageKey } from "./types";
import {
  AboutPage,
  AccessibilityPage,
  ComplaintsPage,
  ConditionsPage,
  ContactPage,
  CqcPage,
  DisclaimerPage,
  EligibilityPage,
  FaqPage,
  GovernancePage,
  HomePage,
  HowItWorksPage,
  InformationPage,
  PricingPage,
  PrivacyPage,
  ReferrersPage,
  SafeguardingPage,
  TermsPage
} from "./pages/Pages";

function App() {
  const [page, setPage] = useState<PageKey>("home");

  function navigate(nextPage: PageKey) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app">
      <Header activePage={page} onNavigate={navigate} />

      <main>
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "eligibility" && <EligibilityPage />}
        {page === "how" && <HowItWorksPage onNavigate={navigate} />}
        {page === "conditions" && <ConditionsPage onNavigate={navigate} />}
        {page === "information" && <InformationPage />}
        {page === "pricing" && <PricingPage />}
        {page === "about" && <AboutPage />}
        {page === "governance" && <GovernancePage />}
        {page === "cqc" && <CqcPage />}
        {page === "referrers" && <ReferrersPage />}
        {page === "faqs" && <FaqPage />}
        {page === "contact" && <ContactPage />}
        {page === "privacy" && <PrivacyPage />}
        {page === "terms" && <TermsPage />}
        {page === "complaints" && <ComplaintsPage />}
        {page === "safeguarding" && <SafeguardingPage />}
        {page === "accessibility" && <AccessibilityPage />}
        {page === "disclaimer" && <DisclaimerPage />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
