import { FormEvent, useMemo, useState } from "react";

const MEDESK_PATIENT_PORTAL_URL = "https://canvia.medesk.example/patient-login";
const MEDESK_BOOKING_URL = "https://canvia.medesk.example/book";
const MEDESK_CLINICIAN_LOGIN_URL = "https://canvia.medesk.example/clinician-login";

type PageKey =
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

type EligibilityOutcome = "potential" | "info" | "unsuitable" | "urgent" | null;

interface NavItem {
  label: string;
  page: PageKey;
}

const primaryNav: NavItem[] = [
  { label: "Home", page: "home" },
  { label: "Check Eligibility", page: "eligibility" },
  { label: "How It Works", page: "how" },
  { label: "Conditions", page: "conditions" },
  { label: "Pricing", page: "pricing" },
  { label: "Governance", page: "governance" },
  { label: "FAQs", page: "faqs" },
  { label: "Contact", page: "contact" }
];

const conditionCards = [
  {
    title: "Chronic Pain",
    copy:
      "Specialist assessment may be considered for patients living with persistent pain where standard treatments have not provided adequate relief or have caused unacceptable side effects."
  },
  {
    title: "Neuropathic Pain",
    copy:
      "Patients with nerve-related pain may be reviewed where there is suitable medical history, previous treatment evidence and clear clinical rationale."
  },
  {
    title: "Fibromyalgia-type Pain",
    copy:
      "Some patients with widespread long-term pain symptoms may be suitable for assessment, depending on diagnosis, previous therapies and risk profile."
  },
  {
    title: "Sciatica-related Pain",
    copy:
      "Patients with long-term or recurrent sciatica-related pain may be considered for review where conventional care has been explored."
  },
  {
    title: "Migraine and Headache Disorders",
    copy:
      "Assessment may be appropriate for selected patients with established headache or migraine history, particularly where usual treatments have been insufficient."
  },
  {
    title: "Anxiety-related Symptoms",
    copy:
      "Mental health presentations require careful review. Patients with unstable, severe or complex psychiatric history may require further specialist input or may not be suitable."
  },
  {
    title: "Sleep-related Symptoms",
    copy:
      "Sleep concerns may be reviewed where there is an underlying clinical context and where treatment can be assessed safely."
  },
  {
    title: "Other Long-term Symptoms",
    copy:
      "Canvia reviews each patient individually. Suitability depends on diagnosis, prior treatment, risk factors and clinical judgement."
  }
];

const faqs = [
  {
    q: "What is Canvia?",
    a:
      "Canvia is a planned UK online medical cannabis clinic providing eligibility screening, specialist-led consultations and ongoing review for suitable patients, where clinically appropriate."
  },
  {
    q: "Does completing the eligibility checker guarantee a prescription?",
    a:
      "No. The eligibility checker is only an initial screening tool. A prescription is only issued where clinically appropriate following full clinical assessment."
  },
  {
    q: "What records do I need?",
    a:
      "You may be asked to provide a GP summary, specialist letters, medication history, previous treatment evidence or other relevant clinical records."
  },
  {
    q: "Who makes the prescribing decision?",
    a:
      "Prescribing decisions are made by an appropriate clinician following review of your medical history, previous treatments, current medicines, risk factors and treatment goals."
  },
  {
    q: "Does Canvia dispense medicines directly?",
    a:
      "The intended model is that Canvia does not dispense medicines directly. Where treatment is prescribed, prescriptions are fulfilled through an appropriately licensed pharmacy or dispensing partner."
  },
  {
    q: "Can I access appointments online?",
    a:
      "Yes. Patient registration, booking, consultations, document upload and secure patient access are intended to be managed through Canvia-branded Medesk portal pages."
  },
  {
    q: "Can my GP be informed?",
    a:
      "Where appropriate, Canvia may ask for GP records or communicate relevant clinical information back to your GP or usual clinician."
  },
  {
    q: "Can I drive if prescribed medical cannabis?",
    a:
      "Patients must not drive if impaired. Any prescribed medicine should be used responsibly and in accordance with clinical advice and legal requirements."
  },
  {
    q: "What if I have a mental health condition?",
    a:
      "Mental health history is reviewed carefully. Certain psychiatric histories, severe instability or previous psychosis may mean this service is not suitable or that further specialist review is required."
  },
  {
    q: "What should I do in an emergency?",
    a:
      "Canvia is not an emergency service. If you need urgent medical help, call 999, NHS 111, your GP or attend urgent care."
  }
];

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

function Header({
  activePage,
  onNavigate
}: {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNav(page: PageKey) {
    setMobileOpen(false);
    onNavigate(page);
  }

  return (
    <header className="site-header">
      <div className="top-strip">
        <span>Canvia is not an emergency service.</span>
        <button onClick={() => onNavigate("disclaimer")}>Read medical disclaimer</button>
      </div>

      <div className="nav-shell">
        <button className="brand" onClick={() => handleNav("home")} aria-label="Canvia home">
          <span className="brand-mark">
            <span className="brand-leaf">◆</span>
          </span>
          <span className="brand-text">
            <strong>Canvia</strong>
            <small>Medical Cannabis Clinic</small>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNav.map((item) => (
            <button
              key={item.page}
              className={activePage === item.page ? "nav-link active" : "nav-link"}
              onClick={() => handleNav(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <a className="ghost-button" href={MEDESK_PATIENT_PORTAL_URL} target="_blank" rel="noreferrer">
            Patient Login
          </a>
          <a className="primary-button" href={MEDESK_BOOKING_URL} target="_blank" rel="noreferrer">
            Book Consultation
          </a>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Open mobile menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {primaryNav.map((item) => (
            <button
              key={item.page}
              className={activePage === item.page ? "mobile-nav-link active" : "mobile-nav-link"}
              onClick={() => handleNav(item.page)}
            >
              {item.label}
            </button>
          ))}

          <div className="mobile-action-grid">
            <a className="ghost-button" href={MEDESK_PATIENT_PORTAL_URL} target="_blank" rel="noreferrer">
              Patient Login
            </a>
            <a className="primary-button" href={MEDESK_BOOKING_URL} target="_blank" rel="noreferrer">
              Book
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function HomePage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg-orb orb-one" />
        <div className="hero-bg-orb orb-two" />

        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span /> UK online specialist assessment pathway
            </div>

            <h1>Specialist-led medical cannabis assessment, delivered safely online.</h1>

            <p className="hero-intro">
              Canvia provides a calm, structured and clinically governed route for eligible UK patients
              considering cannabis-based medicinal products, where clinically appropriate.
            </p>

            <div className="hero-actions">
              <button className="primary-button large" onClick={() => onNavigate("eligibility")}>
                Check Eligibility
              </button>
              <a className="secondary-button large" href={MEDESK_BOOKING_URL} target="_blank" rel="noreferrer">
                Book a Consultation
              </a>
            </div>

            <div className="hero-meta">
              <span>Eligibility first</span>
              <span>Specialist review</span>
              <span>No prescription guarantee</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="portal-window">
              <div className="portal-window-top">
                <span />
                <span />
                <span />
              </div>

              <div className="portal-content">
                <div className="portal-badge">Canvia Patient Pathway</div>
                <h2>Clear steps. Careful decisions.</h2>

                <div className="mini-timeline">
                  <div>
                    <strong>01</strong>
                    <p>Eligibility screening</p>
                  </div>
                  <div>
                    <strong>02</strong>
                    <p>Secure Medesk registration</p>
                  </div>
                  <div>
                    <strong>03</strong>
                    <p>Medical records review</p>
                  </div>
                  <div>
                    <strong>04</strong>
                    <p>Specialist consultation</p>
                  </div>
                </div>

                <div className="portal-callout">
                  <span>Secure portal access</span>
                  <a href={MEDESK_PATIENT_PORTAL_URL} target="_blank" rel="noreferrer">
                    Patient Login →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SafetyBanner />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Why Canvia"
            title="A premium online clinic experience with clinical governance at its centre."
            text="Canvia is designed to feel safe, professional and medically led from the first patient interaction through to follow-up care."
          />

          <div className="feature-grid three">
            <FeatureCard
              icon="◌"
              title="Eligibility-led access"
              text="Patients complete an initial screening pathway before being directed to registration or booking."
            />
            <FeatureCard
              icon="✦"
              title="Specialist clinical review"
              text="Treatment is only considered following individual assessment by an appropriate clinician."
            />
            <FeatureCard
              icon="▣"
              title="Medesk-powered operations"
              text="Bookings, records, patient portal access and clinician workflows are handled through Medesk."
            />
          </div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container split-grid">
          <div>
            <div className="eyebrow">
              <span /> Patient pathway
            </div>
            <h2>From eligibility screening to ongoing clinical review.</h2>
            <p>
              The website acts as Canvia’s public-facing front door. Patients can understand the service,
              complete an initial suitability check and continue into the secure Medesk registration and
              booking pathway.
            </p>

            <button className="secondary-button" onClick={() => onNavigate("how")}>
              View the pathway
            </button>
          </div>

          <div className="process-card">
            <PathwaySteps compact />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Conditions"
            title="Conditions Canvia may assess"
            text="Every case is reviewed individually. Medical cannabis is not suitable for everyone and is only considered where clinically appropriate."
          />

          <div className="condition-grid">
            {conditionCards.slice(0, 4).map((card) => (
              <article className="condition-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>

          <div className="center-actions">
            <button className="secondary-button" onClick={() => onNavigate("conditions")}>
              View all conditions
            </button>
          </div>
        </div>
      </section>

      <MedeskSection />

      <section className="section">
        <div className="container split-grid reverse-mobile">
          <div className="governance-panel">
            <div className="governance-item">
              <strong>Responsible prescribing</strong>
              <span>Clinical assessment before any treatment decision.</span>
            </div>
            <div className="governance-item">
              <strong>Records required</strong>
              <span>Patients may need GP summaries, medication history or specialist letters.</span>
            </div>
            <div className="governance-item">
              <strong>Ongoing monitoring</strong>
              <span>Follow-up reviews help assess benefit, tolerability and continued suitability.</span>
            </div>
          </div>

          <div>
            <div className="eyebrow">
              <span /> Clinical governance
            </div>
            <h2>Built to feel like a regulated healthcare service, not a cannabis shop.</h2>
            <p>
              Canvia’s digital experience is designed around safe triage, clear patient information,
              appropriate clinical boundaries and transparent governance.
            </p>
            <button className="secondary-button" onClick={() => onNavigate("governance")}>
              Read about governance
            </button>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-card">
          <div>
            <span className="soft-label">Start with eligibility</span>
            <h2>Find out whether a specialist consultation may be appropriate.</h2>
            <p>
              The eligibility checker does not diagnose or guarantee treatment. It helps direct patients
              to the most appropriate next step.
            </p>
          </div>
          <button className="primary-button large" onClick={() => onNavigate("eligibility")}>
            Check Eligibility
          </button>
        </div>
      </section>
    </>
  );
}

function EligibilityPage() {
  return (
    <PageShell
      eyebrow="Eligibility"
      title="Initial patient assessment eligibility"
      text="Complete this initial screening tool to understand whether a specialist consultation may be appropriate. This is not a diagnosis and does not guarantee treatment."
    >
      <EligibilityChecker />
    </PageShell>
  );
}

function EligibilityChecker() {
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({
    age18: "",
    uk: "",
    condition: "",
    diagnosis: "",
    triedTreatments: "",
    treatments: "",
    records: "",
    pregnant: "",
    psychosis: "",
    substance: "",
    medicines: "",
    allergies: "",
    urgent: "",
    consent: ""
  });

  function update(field: keyof typeof answers, value: string) {
    setAnswers((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  }

  const outcome: EligibilityOutcome = useMemo(() => {
    if (answers.urgent === "yes") return "urgent";
    if (answers.age18 === "no" || answers.uk === "no" || answers.pregnant === "yes") return "unsuitable";

    if (answers.psychosis === "yes" || answers.substance === "yes") return "info";

    if (
      answers.age18 === "yes" &&
      answers.uk === "yes" &&
      answers.condition &&
      answers.diagnosis === "yes" &&
      answers.triedTreatments === "yes" &&
      answers.records === "yes" &&
      answers.consent === "yes"
    ) {
      return "potential";
    }

    if (answers.age18 || answers.uk || answers.condition || answers.diagnosis || answers.triedTreatments || answers.records) {
      return "info";
    }

    return null;
  }, [answers]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="eligibility-layout">
      <form className="eligibility-form" onSubmit={handleSubmit}>
        <div className="form-section-title">
          <h2>Screening questions</h2>
          <p>
            Do not enter detailed medical information into this demo form. Full registration and clinical
            document uploads should be handled through the secure Medesk patient portal.
          </p>
        </div>

        <SelectField
          label="Are you aged 18 or over?"
          value={answers.age18}
          onChange={(value) => update("age18", value)}
          options={[
            ["", "Select an answer"],
            ["yes", "Yes"],
            ["no", "No"]
          ]}
        />

        <SelectField
          label="Are you currently living in the UK?"
          value={answers.uk}
          onChange={(value) => update("uk", value)}
          options={[
            ["", "Select an answer"],
            ["yes", "Yes"],
            ["no", "No"]
          ]}
        />

        <SelectField
          label="What condition or symptom area are you seeking support for?"
          value={answers.condition}
          onChange={(value) => update("condition", value)}
          options={[
            ["", "Select an option"],
            ["chronic-pain", "Chronic pain"],
            ["neuropathic-pain", "Neuropathic pain"],
            ["fibromyalgia", "Fibromyalgia-type pain"],
            ["sciatica", "Sciatica-related pain"],
            ["migraine", "Migraine/headache disorder"],
            ["anxiety", "Anxiety-related symptoms"],
            ["sleep", "Sleep-related symptoms"],
            ["other", "Other"]
          ]}
        />

        <SelectField
          label="Have you received a formal diagnosis or been assessed by a healthcare professional?"
          value={answers.diagnosis}
          onChange={(value) => update("diagnosis", value)}
          options={[
            ["", "Select an answer"],
            ["yes", "Yes"],
            ["no", "No"],
            ["unsure", "Unsure"]
          ]}
        />

        <SelectField
          label="Have you tried standard treatments before?"
          value={answers.triedTreatments}
          onChange={(value) => update("triedTreatments", value)}
          options={[
            ["", "Select an answer"],
            ["yes", "Yes"],
            ["no", "No"],
            ["unsure", "Unsure"]
          ]}
        />

        <TextField
          label="Which treatments have you tried? Optional summary only."
          value={answers.treatments}
          onChange={(value) => update("treatments", value)}
          placeholder="Example: GP medicines, physiotherapy, pain clinic, talking therapy"
        />

        <SelectField
          label="Do you have access to your GP summary, medication history, specialist letters or relevant records?"
          value={answers.records}
          onChange={(value) => update("records", value)}
          options={[
            ["", "Select an answer"],
            ["yes", "Yes"],
            ["no", "No"],
            ["unsure", "Unsure"]
          ]}
        />

        <SelectField
          label="Are you currently pregnant, trying to become pregnant, or breastfeeding?"
          value={answers.pregnant}
          onChange={(value) => update("pregnant", value)}
          options={[
            ["", "Select an answer"],
            ["yes", "Yes"],
            ["no", "No"],
            ["prefer-not", "Prefer not to say"]
          ]}
        />

        <SelectField
          label="Do you have a history of psychosis, schizophrenia, bipolar disorder or severe unstable mental health symptoms?"
          value={answers.psychosis}
          onChange={(value) => update("psychosis", value)}
          options={[
            ["", "Select an answer"],
            ["yes", "Yes"],
            ["no", "No"],
            ["prefer-not", "Prefer not to say"]
          ]}
        />

        <SelectField
          label="Do you have a history of substance misuse or dependence?"
          value={answers.substance}
          onChange={(value) => update("substance", value)}
          options={[
            ["", "Select an answer"],
            ["yes", "Yes"],
            ["no", "No"],
            ["prefer-not", "Prefer not to say"]
          ]}
        />

        <TextField
          label="Are you currently taking any regular medicines? Optional summary only."
          value={answers.medicines}
          onChange={(value) => update("medicines", value)}
          placeholder="Please provide a brief summary only"
        />

        <TextField
          label="Do you have any known allergies? Optional summary only."
          value={answers.allergies}
          onChange={(value) => update("allergies", value)}
          placeholder="Please provide a brief summary only"
        />

        <SelectField
          label="Do you need urgent or emergency medical help today?"
          value={answers.urgent}
          onChange={(value) => update("urgent", value)}
          options={[
            ["", "Select an answer"],
            ["yes", "Yes"],
            ["no", "No"]
          ]}
        />

        <SelectField
          label="Do you understand this checker does not guarantee treatment?"
          value={answers.consent}
          onChange={(value) => update("consent", value)}
          options={[
            ["", "Select an answer"],
            ["yes", "Yes"],
            ["no", "No"]
          ]}
        />

        <button className="primary-button large" type="submit">
          View Assessment Outcome
        </button>
      </form>

      <aside className="eligibility-result">
        <div className="result-card">
          <span className="soft-label">Assessment outcome</span>

          {!submitted && (
            <>
              <h2>Complete the questions to view your next step.</h2>
              <p>
                The checker helps identify whether Medesk registration, further information or another route
                may be more appropriate.
              </p>
            </>
          )}

          {submitted && outcome === "potential" && (
            <Outcome
              tone="positive"
              title="You may be suitable for a specialist consultation."
              text="Based on your answers, a consultation may be appropriate. A prescription is not guaranteed and any treatment decision will depend on full clinical review."
              ctaText="Continue to Registration"
              ctaHref={MEDESK_PATIENT_PORTAL_URL}
            />
          )}

          {submitted && outcome === "info" && (
            <Outcome
              tone="neutral"
              title="More information may be required."
              text="Based on your answers, Canvia may need further clinical information before confirming whether a consultation is appropriate. You may be asked for GP records, medication history or specialist letters."
              ctaText="Create Patient Account"
              ctaHref={MEDESK_PATIENT_PORTAL_URL}
            />
          )}

          {submitted && outcome === "unsuitable" && (
            <Outcome
              tone="caution"
              title="This service may not be suitable at this time."
              text="Based on your answers, Canvia may not be the most appropriate service for you. Please speak with your GP, usual clinician or an appropriate healthcare service."
              ctaText="Contact Canvia"
              ctaHref="mailto:hello@canvia.co.uk"
            />
          )}

          {submitted && outcome === "urgent" && (
            <Outcome
              tone="urgent"
              title="Canvia is not an emergency service."
              text="If you need urgent medical help, call 999, NHS 111, your GP or attend urgent care. Do not wait for an online clinic appointment if your symptoms are urgent."
              ctaText="Read Medical Disclaimer"
              ctaHref="#"
            />
          )}
        </div>

        <div className="clinical-note">
          <strong>Important:</strong>
          <p>
            This prototype does not store sensitive medical data. In the live service, registration, documents
            and clinical records should be managed securely through Medesk or an equivalent compliant clinical system.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Outcome({
  title,
  text,
  ctaText,
  ctaHref,
  tone
}: {
  title: string;
  text: string;
  ctaText: string;
  ctaHref: string;
  tone: "positive" | "neutral" | "caution" | "urgent";
}) {
  return (
    <div className={`outcome outcome-${tone}`}>
      <h2>{title}</h2>
      <p>{text}</p>
      <a className="primary-button" href={ctaHref} target={ctaHref.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {ctaText}
      </a>
    </div>
  );
}

function HowItWorksPage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <PageShell
      eyebrow="How it works"
      title="A structured clinical pathway from screening to follow-up."
      text="Canvia’s process is designed to be clear, safe and clinically governed. Patients are guided through eligibility, registration, records upload, consultation and ongoing review."
    >
      <div className="wide-card">
        <PathwaySteps />
      </div>

      <div className="cta-inline-card">
        <div>
          <h2>Start with the eligibility checker</h2>
          <p>Understand whether a specialist consultation may be appropriate before creating your patient account.</p>
        </div>
        <button className="primary-button" onClick={() => onNavigate("eligibility")}>
          Check Eligibility
        </button>
      </div>
    </PageShell>
  );
}

function PathwaySteps({ compact = false }: { compact?: boolean }) {
  const steps = [
    {
      number: "01",
      title: "Check eligibility",
      text: "Complete an initial screening questionnaire to help identify whether specialist consultation may be appropriate."
    },
    {
      number: "02",
      title: "Register securely",
      text: "Create a patient account through the Canvia-branded Medesk portal."
    },
    {
      number: "03",
      title: "Upload records",
      text: "Provide GP summaries, medication history, specialist letters or relevant clinical information."
    },
    {
      number: "04",
      title: "Book consultation",
      text: "Book an online consultation with an appropriate specialist clinician."
    },
    {
      number: "05",
      title: "Clinical review",
      text: "Your clinician reviews symptoms, previous treatments, medicines, risks and suitability."
    },
    {
      number: "06",
      title: "Treatment decision",
      text: "Where clinically appropriate, a prescription may be issued and sent to a licensed pharmacy partner."
    },
    {
      number: "07",
      title: "Follow-up monitoring",
      text: "Ongoing reviews assess response, side effects, continued suitability and treatment goals."
    }
  ];

  return (
    <div className={compact ? "pathway compact" : "pathway"}>
      {steps.map((step) => (
        <article className="pathway-step" key={step.number}>
          <span>{step.number}</span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ConditionsPage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <PageShell
      eyebrow="Conditions"
      title="Conditions Canvia may assess"
      text="Canvia assesses each patient individually. Medical cannabis treatment is not suitable for everyone and is only considered where clinically appropriate following specialist review."
    >
      <div className="condition-grid">
        {conditionCards.map((card) => (
          <article className="condition-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
          </article>
        ))}
      </div>

      <div className="notice-card">
        <h2>Not everyone is suitable</h2>
        <p>
          Some patients may require further review or may not be suitable, including those who are pregnant
          or breastfeeding, those with certain psychiatric histories, active substance misuse concerns or
          unstable medical conditions.
        </p>
        <button className="secondary-button" onClick={() => onNavigate("eligibility")}>
          Check Eligibility
        </button>
      </div>
    </PageShell>
  );
}

function InformationPage() {
  return (
    <PageShell
      eyebrow="Patient information"
      title="Medical cannabis information for patients"
      text="Clear, balanced information to help patients understand the assessment process, potential risks and the importance of clinical review."
    >
      <div className="content-grid">
        <InfoBlock
          title="What are cannabis-based medicinal products?"
          text="Cannabis-based medicinal products are prescribed medicines that may contain cannabinoids such as THC, CBD or other components. They are only considered for patients following clinical assessment."
        />
        <InfoBlock
          title="How are they prescribed?"
          text="Treatment is not automatically provided. The clinician reviews your history, previous treatments, current medicines, risks and goals before deciding whether prescribing is appropriate."
        />
        <InfoBlock
          title="Why are medical records needed?"
          text="Clinical records help confirm diagnosis, previous treatments, current medicines and safety considerations. They support responsible prescribing decisions."
        />
        <InfoBlock
          title="Benefits and limitations"
          text="Some patients may report benefit, but medical cannabis is not a cure and does not work for everyone. Treatment should be reviewed regularly."
        />
        <InfoBlock
          title="Possible side effects"
          text="Potential side effects can include tiredness, dizziness, changes in mood, dry mouth, impaired concentration or other effects. Patients should discuss risks with their clinician."
        />
        <InfoBlock
          title="Driving and impairment"
          text="Patients must not drive if impaired. Follow your clinician’s advice and the legal requirements relating to prescribed medicines and driving."
        />
        <InfoBlock
          title="Storage and safe use"
          text="Prescribed medicines should be stored securely, used only as directed and kept away from children or anyone for whom they were not prescribed."
        />
        <InfoBlock
          title="Working with your GP"
          text="Canvia may request records from your GP or communicate relevant information back to your usual clinician where appropriate."
        />
      </div>
    </PageShell>
  );
}

function PricingPage() {
  return (
    <PageShell
      eyebrow="Pricing"
      title="Transparent consultation pricing"
      text="Pricing below uses editable placeholders. Product costs are separate and are handled by the dispensing pharmacy or partner provider where applicable."
    >
      <div className="pricing-grid">
        <PricingCard title="Initial Eligibility Assessment" price="£0" text="Online screening to help determine whether specialist consultation may be appropriate." />
        <PricingCard title="Initial Specialist Consultation" price="£XX" text="Online consultation with an appropriate specialist clinician." highlighted />
        <PricingCard title="Follow-up Consultation" price="£XX" text="Ongoing clinical review to monitor suitability, response, side effects and care goals." />
        <PricingCard title="Repeat Prescription/Admin Fee" price="£XX" text="If applicable, subject to clinical review, clinic policy and ongoing suitability." />
        <PricingCard title="Product Costs" price="Variable" text="Medication costs are set separately by the dispensing pharmacy or partner provider." />
      </div>

      <div className="notice-card">
        <h2>Important pricing note</h2>
        <p>
          A consultation does not guarantee that treatment will be prescribed. Prescribing decisions are made
          by the clinician following full assessment. Canvia should not display strain menus, product promotions
          or prescription-only medicine advertising to the public.
        </p>
      </div>
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell
      eyebrow="About Canvia"
      title="A safer pathway to specialist clinical assessment"
      text="Canvia was created to provide a calm, structured and clinically governed route for eligible UK patients seeking specialist assessment for medical cannabis treatment."
    >
      <div className="split-grid">
        <div className="copy-panel">
          <h2>Our approach</h2>
          <p>
            Canvia is designed around responsible prescribing, clear suitability criteria, patient education,
            secure digital healthcare systems and ongoing monitoring.
          </p>
          <p>
            The service is intended to operate as an online specialist clinic, with Medesk supporting patient
            registration, bookings, clinical records, consultations and secure access.
          </p>
        </div>

        <div className="copy-panel dark">
          <h2>What Canvia is not</h2>
          <ul className="clean-list">
            <li>Not a recreational cannabis service.</li>
            <li>Not a dispensary or product shop.</li>
            <li>Not an emergency medical service.</li>
            <li>Not a guaranteed prescription service.</li>
          </ul>
        </div>
      </div>

      <div className="feature-grid three">
        <FeatureCard icon="◇" title="Patient-centred" text="Clear information, simple access and ongoing support." />
        <FeatureCard icon="▧" title="Clinically governed" text="Designed around appropriate review, records and responsible prescribing." />
        <FeatureCard icon="✧" title="Digitally enabled" text="Medesk integration supports patient and clinician workflows." />
      </div>
    </PageShell>
  );
}

function GovernancePage() {
  return (
    <PageShell
      eyebrow="Clinical governance"
      title="Responsible prescribing and patient safety"
      text="Canvia’s governance model is designed to support safe, appropriate and evidence-informed prescribing, with patient safety at the centre of the service."
    >
      <div className="governance-grid">
        <GovernanceCard title="Responsible prescribing" text="A prescription is only considered after full clinical assessment and where clinically appropriate." />
        <GovernanceCard title="Specialist-led review" text="Suitability is reviewed by an appropriate clinician with consideration of medical history, previous treatments and risk factors." />
        <GovernanceCard title="Medical records" text="Patients may need to provide GP summaries, specialist letters and medication history before prescribing decisions are made." />
        <GovernanceCard title="Safeguarding" text="Patients at risk, mental health concerns and clinical red flags should be escalated through clear governance pathways." />
        <GovernanceCard title="Mental health considerations" text="Psychiatric history is assessed carefully. Some patients may require further review or may not be suitable." />
        <GovernanceCard title="Follow-up monitoring" text="Ongoing review helps monitor benefit, adverse effects, dose suitability and continuing appropriateness." />
        <GovernanceCard title="Pharmacy partner model" text="Where treatment is prescribed, prescriptions are fulfilled by an appropriately licensed pharmacy or dispensing partner." />
        <GovernanceCard title="Confidentiality" text="Patient records and communications should be managed securely through Medesk or an equivalent clinical system." />
      </div>
    </PageShell>
  );
}

function CqcPage() {
  return (
    <PageShell
      eyebrow="CQC & regulation"
      title="Regulatory status and clinical accountability"
      text="This page is designed to hold Canvia’s CQC and regulatory information once applicable. Do not claim active CQC registration unless details have been confirmed."
    >
      <div className="regulatory-card">
        <h2>CQC registration details</h2>

        <dl className="details-list">
          <div>
            <dt>CQC Provider Name</dt>
            <dd>[To be added]</dd>
          </div>
          <div>
            <dt>Registration Number</dt>
            <dd>[To be added]</dd>
          </div>
          <div>
            <dt>Registered Manager</dt>
            <dd>[To be added]</dd>
          </div>
          <div>
            <dt>Regulated Activities</dt>
            <dd>[To be added]</dd>
          </div>
          <div>
            <dt>CQC Profile Link</dt>
            <dd>[To be added]</dd>
          </div>
          <div>
            <dt>Current Rating</dt>
            <dd>[Not yet rated / To be added]</dd>
          </div>
        </dl>

        <div className="notice-card compact-notice">
          <h3>Current placeholder wording</h3>
          <p>
            Canvia is preparing its clinical governance framework in line with expectations for regulated
            online healthcare services in England. CQC registration details will be displayed here once applicable.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

function ReferrersPage() {
  return (
    <PageShell
      eyebrow="For referrers"
      title="Information for healthcare professionals and partners"
      text="Canvia welcomes appropriate supporting clinical information from GPs, physiotherapists, pain clinics, pharmacies and other healthcare professionals."
    >
      <div className="content-grid">
        <InfoBlock
          title="Refer a patient"
          text="Patients may self-refer, but relevant clinical records are required before prescribing decisions can be made."
        />
        <InfoBlock
          title="What information we need"
          text="Useful information may include diagnosis, medication history, previous treatments, relevant specialist letters and current clinical concerns."
        />
        <InfoBlock
          title="Communication with clinicians"
          text="Where appropriate, Canvia may request information from or send updates to the patient’s GP or usual clinician."
        />
        <InfoBlock
          title="Pharmacy partners"
          text="Canvia does not need to dispense directly. Prescriptions can be fulfilled by licensed pharmacy or dispensing partners."
        />
      </div>

      <div className="cta-inline-card">
        <div>
          <h2>Professional referral enquiry</h2>
          <p>Use the contact page to send a professional referral or partnership enquiry.</p>
        </div>
        <a className="primary-button" href="mailto:hello@canvia.co.uk">
          Email Canvia
        </a>
      </div>
    </PageShell>
  );
}

function FaqPage() {
  return (
    <PageShell
      eyebrow="FAQs"
      title="Frequently asked questions"
      text="Clear answers for patients considering Canvia’s online assessment pathway."
    >
      <div className="faq-list">
        {faqs.map((item) => (
          <details className="faq-item" key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </PageShell>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <PageShell
      eyebrow="Contact"
      title="Contact Canvia"
      text="Use this form for general enquiries, patient support, professional referrals, complaints or partnership enquiries. Do not use this form for urgent medical issues."
    >
      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" required placeholder="Your name" />
          </label>

          <label>
            Email
            <input type="email" required placeholder="your.email@example.com" />
          </label>

          <label>
            Phone
            <input type="tel" placeholder="Optional" />
          </label>

          <label>
            Enquiry type
            <select required defaultValue="">
              <option value="" disabled>
                Select enquiry type
              </option>
              <option>Patient enquiry</option>
              <option>Professional referral</option>
              <option>Complaint</option>
              <option>Partnership enquiry</option>
              <option>General enquiry</option>
            </select>
          </label>

          <label>
            Message
            <textarea required placeholder="Please provide a brief message. Do not include urgent medical information." />
          </label>

          <label className="checkbox-row">
            <input type="checkbox" required />
            <span>I understand Canvia is not an emergency service and consent to being contacted about my enquiry.</span>
          </label>

          <button className="primary-button large" type="submit">
            Send Enquiry
          </button>

          {sent && (
            <p className="form-success">
              Thank you. This prototype does not send messages yet. Connect this form to your website backend or Medesk workflow.
            </p>
          )}
        </form>

        <aside className="contact-panel">
          <h2>Canvia Medical Cannabis Clinic</h2>
          <p>Email: hello@canvia.co.uk</p>
          <p>Phone: [To be added]</p>
          <p>Company number: [To be added]</p>
          <p>Registered office: [To be added]</p>

          <div className="urgent-box">
            <strong>Urgent help</strong>
            <p>
              Canvia is not an emergency service. If you need urgent medical help, call 999, NHS 111,
              your GP or attend urgent care.
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy"
      title="Privacy Policy"
      sections={[
        ["Purpose", "This placeholder privacy policy explains how Canvia intends to handle personal information. The final version should be reviewed by a UK GDPR/data protection specialist before launch."],
        ["Clinical information", "Sensitive clinical information should be collected, stored and managed through Medesk or an equivalent secure clinical system, not through unsecured public website forms."],
        ["Lawful basis", "The final policy should define lawful bases for processing, including healthcare provision, consent where applicable, legal obligations and legitimate interests."],
        ["Patient rights", "Patients should be informed of their rights of access, rectification, erasure, restriction, objection and data portability where applicable."],
        ["Contact", "Data protection enquiries should be directed to hello@canvia.co.uk or the final designated privacy contact."]
      ]}
    />
  );
}

function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Terms"
      title="Terms & Conditions"
      sections={[
        ["Website use", "This website provides general information about Canvia and the intended online specialist assessment pathway."],
        ["No emergency service", "Canvia is not an emergency medical service. Users requiring urgent care should contact 999, NHS 111, their GP or urgent care services."],
        ["No prescription guarantee", "Completing an eligibility checker, registering or booking a consultation does not guarantee that treatment will be prescribed."],
        ["Clinical decisions", "All clinical decisions are made by an appropriate clinician following individual assessment."],
        ["External platforms", "Bookings, patient portal access and clinical records may be handled through Medesk or another secure clinical platform."]
      ]}
    />
  );
}

function ComplaintsPage() {
  return (
    <PolicyPage
      eyebrow="Complaints"
      title="Complaints Policy"
      sections={[
        ["Our approach", "Canvia aims to manage complaints fairly, promptly and transparently."],
        ["How to complain", "Patients may submit complaints using the contact page or by emailing hello@canvia.co.uk. A dedicated complaints email can be added before launch."],
        ["Acknowledgement", "The final policy should define acknowledgement and response timeframes in line with the clinic’s governance procedures."],
        ["Escalation", "Where applicable, patients should be informed of their escalation options and relevant regulatory routes."],
        ["Learning from complaints", "Complaints should be reviewed as part of the clinic’s quality and governance process."]
      ]}
    />
  );
}

function SafeguardingPage() {
  return (
    <PolicyPage
      eyebrow="Safeguarding"
      title="Safeguarding Statement"
      sections={[
        ["Patient safety", "Canvia’s service should be designed to identify and escalate safeguarding concerns, clinical red flags and patients at risk."],
        ["Adults at risk", "Staff and clinicians should receive appropriate training to recognise potential safeguarding concerns involving adults at risk."],
        ["Mental health concerns", "Patients reporting crisis, severe instability or urgent concerns should be directed to appropriate urgent or emergency care routes."],
        ["Escalation", "The final safeguarding policy should define named leads, escalation routes, documentation requirements and external reporting processes."],
        ["Not an emergency service", "Canvia is not an emergency service. Urgent medical concerns should be directed to 999, NHS 111, GP services or urgent care."]
      ]}
    />
  );
}

function AccessibilityPage() {
  return (
    <PolicyPage
      eyebrow="Accessibility"
      title="Accessibility Statement"
      sections={[
        ["Commitment", "Canvia aims to provide a website that is accessible, readable and usable for as many people as possible."],
        ["Design standards", "The website should use clear contrast, readable typography, keyboard-accessible controls and semantic HTML."],
        ["Feedback", "Users who experience accessibility barriers should contact hello@canvia.co.uk so improvements can be considered."],
        ["Ongoing review", "Accessibility should be reviewed regularly as the website and patient portal experience develops."]
      ]}
    />
  );
}

function DisclaimerPage() {
  return (
    <PolicyPage
      eyebrow="Medical disclaimer"
      title="Medical Disclaimer"
      sections={[
        ["General information only", "The information on this website is for general information and does not replace medical advice from a qualified clinician."],
        ["No diagnosis", "The eligibility checker does not diagnose any condition and does not confirm treatment suitability."],
        ["No prescription guarantee", "A prescription is only issued where clinically appropriate following full clinical assessment."],
        ["Existing medicines", "Patients should not stop, start or change existing medicines without speaking to their usual clinician or prescribing clinician."],
        ["Emergency care", "Canvia is not an emergency service. If you need urgent medical help, call 999, NHS 111, your GP or attend urgent care."]
      ]}
    />
  );
}

function PolicyPage({
  eyebrow,
  title,
  sections
}: {
  eyebrow: string;
  title: string;
  sections: [string, string][];
}) {
  return (
    <PageShell eyebrow={eyebrow} title={title} text="Placeholder policy wording for the first website version. This should be legally and clinically reviewed before launch.">
      <div className="policy-card">
        {sections.map(([heading, text]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{text}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

function MedeskSection() {
  return (
    <section className="section medesk-section">
      <div className="container medesk-grid">
        <div>
          <div className="eyebrow light">
            <span /> Medesk integration
          </div>
          <h2>Your secure Canvia patient portal.</h2>
          <p>
            The Canvia website is designed to hand patients into Medesk for secure registration,
            booking, records upload, online consultations, appointment management and patient communications.
          </p>

          <div className="medesk-actions">
            <a className="primary-button light-button" href={MEDESK_PATIENT_PORTAL_URL} target="_blank" rel="noreferrer">
              Patient Login
            </a>
            <a className="secondary-button light-secondary" href={MEDESK_BOOKING_URL} target="_blank" rel="noreferrer">
              Book Consultation
            </a>
            <a className="text-link-light" href={MEDESK_CLINICIAN_LOGIN_URL} target="_blank" rel="noreferrer">
              Clinician Login →
            </a>
          </div>
        </div>

        <div className="medesk-card">
          <h3>Portal capabilities</h3>
          <ul>
            <li>Patient registration</li>
            <li>Appointment booking</li>
            <li>Document upload</li>
            <li>Video consultations</li>
            <li>Secure communications</li>
            <li>Clinician access</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function SafetyBanner() {
  return (
    <section className="safety-banner">
      <div className="container safety-grid">
        <strong>Important clinical notice</strong>
        <p>
          Canvia does not provide emergency care. Completing an eligibility checker or booking a consultation
          does not guarantee treatment. Prescribing decisions are made only after full clinical assessment.
        </p>
      </div>
    </section>
  );
}

function PageShell({
  eyebrow,
  title,
  text,
  children
}: {
  eyebrow: string;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <div className="eyebrow">
            <span /> {eyebrow}
          </div>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">{children}</div>
      </section>
    </>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span /> {eyebrow}
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function FeatureCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <article className="info-block">
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}

function PricingCard({
  title,
  price,
  text,
  highlighted = false
}: {
  title: string;
  price: string;
  text: string;
  highlighted?: boolean;
}) {
  return (
    <article className={highlighted ? "pricing-card highlighted" : "pricing-card"}>
      <span>{title}</span>
      <strong>{price}</strong>
      <p>{text}</p>
    </article>
  );
}

function GovernanceCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="governance-card">
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} required>
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue || optionLabel} value={optionValue} disabled={optionValue === ""}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

function Footer({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  const footerSections: { title: string; links: NavItem[] }[] = [
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

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <button className="brand footer-logo" onClick={() => onNavigate("home")} aria-label="Canvia home">
            <span className="brand-mark">
              <span className="brand-leaf">◆</span>
            </span>
            <span className="brand-text">
              <strong>Canvia</strong>
              <small>Medical Cannabis Clinic</small>
            </span>
          </button>

          <p>
            Specialist-led online assessment for eligible UK patients considering medical cannabis treatment,
            where clinically appropriate.
          </p>

          <div className="footer-access">
            <a href={MEDESK_PATIENT_PORTAL_URL} target="_blank" rel="noreferrer">
              Patient Login
            </a>
            <a href={MEDESK_BOOKING_URL} target="_blank" rel="noreferrer">
              Book Consultation
            </a>
            <a href={MEDESK_CLINICIAN_LOGIN_URL} target="_blank" rel="noreferrer">
              Clinician Login
            </a>
          </div>
        </div>

        {footerSections.map((section) => (
          <div className="footer-section" key={section.title}>
            <h3>{section.title}</h3>
            {section.links.map((link) => (
              <button key={link.page} onClick={() => onNavigate(link.page)}>
                {link.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="container footer-bottom">
        <p>
          Company number: [To be added] · Registered office: [To be added] · CQC provider details: [To be added]
        </p>
        <p>© {new Date().getFullYear()} Canvia Medical Cannabis Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default App;