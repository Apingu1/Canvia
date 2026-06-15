import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { pageToPath, pathToPage } from "./data/routes";
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
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const routerNavigate = useNavigate();
  const location = useLocation();
  const activePage = pathToPage(location.pathname);

  function navigate(nextPage: PageKey) {
    routerNavigate(pageToPath(nextPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app">
      <Header activePage={activePage} onNavigate={navigate} />

      <main>
        <Routes>
          <Route path={pageToPath("home")} element={<HomePage onNavigate={navigate} />} />
          <Route path={pageToPath("eligibility")} element={<EligibilityPage />} />
          <Route path={pageToPath("how")} element={<HowItWorksPage onNavigate={navigate} />} />
          <Route path={pageToPath("conditions")} element={<ConditionsPage onNavigate={navigate} />} />
          <Route path={pageToPath("information")} element={<InformationPage />} />
          <Route path={pageToPath("pricing")} element={<PricingPage />} />
          <Route path={pageToPath("about")} element={<AboutPage />} />
          <Route path={pageToPath("governance")} element={<GovernancePage />} />
          <Route path={pageToPath("cqc")} element={<CqcPage />} />
          <Route path={pageToPath("referrers")} element={<ReferrersPage />} />
          <Route path={pageToPath("faqs")} element={<FaqPage />} />
          <Route path={pageToPath("contact")} element={<ContactPage />} />
          <Route path={pageToPath("privacy")} element={<PrivacyPage />} />
          <Route path={pageToPath("terms")} element={<TermsPage />} />
          <Route path={pageToPath("complaints")} element={<ComplaintsPage />} />
          <Route path={pageToPath("safeguarding")} element={<SafeguardingPage />} />
          <Route path={pageToPath("accessibility")} element={<AccessibilityPage />} />
          <Route path={pageToPath("disclaimer")} element={<DisclaimerPage />} />
          <Route path="*" element={<Navigate to={pageToPath("home")} replace />} />
        </Routes>
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
