import { FormEvent, useState } from "react";
import { MEDESK_BOOKING_URL, MEDESK_PATIENT_PORTAL_URL } from "../config/links";
import { conditionCards } from "../data/conditions";
import { faqs } from "../data/faqs";
import { EligibilityChecker } from "../components/eligibility/EligibilityChecker";
import { PageShell } from "../components/layout/PageShell";
import { SafetyBanner } from "../components/layout/SafetyBanner";
import { MedeskSection } from "../components/medesk/MedeskSection";
import { PathwaySteps } from "../components/pathway/PathwaySteps";
import { FeatureCard, GovernanceCard, InfoBlock, PricingCard } from "../components/ui/Cards";
import { SectionHeading } from "../components/ui/SectionHeading";
import type { NavigateFn } from "../types";

export function HomePage({ onNavigate }: { onNavigate: NavigateFn }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg-orb orb-one" />
        <div className="hero-bg-orb orb-two" />

        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span /> UK online specialist assessment pathway</div>
            <h1>Specialist-led medical cannabis assessment, delivered safely online.</h1>
            <p className="hero-intro">
              Canvia provides a calm, structured and clinically governed route for eligible UK patients
              considering cannabis-based medicinal products, where clinically appropriate.
            </p>
            <div className="hero-actions">
              <button className="primary-button large" onClick={() => onNavigate("eligibility")}>Check Eligibility</button>
              <a className="secondary-button large" href={MEDESK_BOOKING_URL} target="_blank" rel="noreferrer">Book a Consultation</a>
            </div>
            <div className="hero-meta">
              <span>Eligibility first</span><span>Specialist review</span><span>No prescription guarantee</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="portal-window">
              <div className="portal-window-top"><span /><span /><span /></div>
              <div className="portal-content">
                <div className="portal-badge">Canvia Patient Pathway</div>
                <h2>Clear steps. Careful decisions.</h2>
                <div className="mini-timeline">
                  <div><strong>01</strong><p>Eligibility screening</p></div>
                  <div><strong>02</strong><p>Secure Medesk registration</p></div>
                  <div><strong>03</strong><p>Medical records review</p></div>
                  <div><strong>04</strong><p>Specialist consultation</p></div>
                </div>
                <div className="portal-callout">
                  <span>Secure portal access</span>
                  <a href={MEDESK_PATIENT_PORTAL_URL} target="_blank" rel="noreferrer">Patient Login →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SafetyBanner />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Why Canvia" title="A premium online clinic experience with clinical governance at its centre." text="Canvia is designed to feel safe, professional and medically led from the first patient interaction through to follow-up care." />
          <div className="feature-grid three">
            <FeatureCard icon="◌" title="Eligibility-led access" text="Patients complete an initial screening pathway before being directed to registration or booking." />
            <FeatureCard icon="✦" title="Specialist clinical review" text="Treatment is only considered following individual assessment by an appropriate clinician." />
            <FeatureCard icon="▣" title="Medesk-powered operations" text="Bookings, records, patient portal access and clinician workflows are handled through Medesk." />
          </div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container split-grid">
          <div>
            <div className="eyebrow"><span /> Patient pathway</div>
            <h2>From eligibility screening to ongoing clinical review.</h2>
            <p>
              The website acts as Canvia’s public-facing front door. Patients can understand the service,
              complete an initial suitability check and continue into the secure Medesk registration and booking pathway.
            </p>
            <button className="secondary-button" onClick={() => onNavigate("how")}>View the pathway</button>
          </div>
          <div className="process-card"><PathwaySteps compact /></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Conditions" title="Conditions Canvia may assess" text="Every case is reviewed individually. Medical cannabis is not suitable for everyone and is only considered where clinically appropriate." />
          <div className="condition-grid">
            {conditionCards.slice(0, 4).map((card) => (
              <article className="condition-card" key={card.title}><h3>{card.title}</h3><p>{card.copy}</p></article>
            ))}
          </div>
          <div className="center-actions"><button className="secondary-button" onClick={() => onNavigate("conditions")}>View all conditions</button></div>
        </div>
      </section>

      <MedeskSection />

      <section className="section">
        <div className="container split-grid reverse-mobile">
          <div className="governance-panel">
            <div className="governance-item"><strong>Responsible prescribing</strong><span>Clinical assessment before any treatment decision.</span></div>
            <div className="governance-item"><strong>Records required</strong><span>Patients may need GP summaries, medication history or specialist letters.</span></div>
            <div className="governance-item"><strong>Ongoing monitoring</strong><span>Follow-up reviews help assess benefit, tolerability and continued suitability.</span></div>
          </div>
          <div>
            <div className="eyebrow"><span /> Clinical governance</div>
            <h2>Built to feel like a regulated healthcare service, not a cannabis shop.</h2>
            <p>Canvia’s digital experience is designed around safe triage, clear patient information, appropriate clinical boundaries and transparent governance.</p>
            <button className="secondary-button" onClick={() => onNavigate("governance")}>Read about governance</button>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-card">
          <div>
            <span className="soft-label">Start with eligibility</span>
            <h2>Find out whether a specialist consultation may be appropriate.</h2>
            <p>The eligibility checker does not diagnose or guarantee treatment. It helps direct patients to the most appropriate next step.</p>
          </div>
          <button className="primary-button large" onClick={() => onNavigate("eligibility")}>Check Eligibility</button>
        </div>
      </section>
    </>
  );
}

export function EligibilityPage() {
  return (
    <PageShell eyebrow="Eligibility" title="Initial patient assessment eligibility" text="Complete this initial screening tool to understand whether a specialist consultation may be appropriate. This is not a diagnosis and does not guarantee treatment.">
      <EligibilityChecker />
    </PageShell>
  );
}

export function HowItWorksPage({ onNavigate }: { onNavigate: NavigateFn }) {
  return (
    <PageShell eyebrow="How it works" title="A structured clinical pathway from screening to follow-up." text="Canvia’s process is designed to be clear, safe and clinically governed. Patients are guided through eligibility, registration, records upload, consultation and ongoing review.">
      <div className="wide-card"><PathwaySteps /></div>
      <div className="cta-inline-card">
        <div><h2>Start with the eligibility checker</h2><p>Understand whether a specialist consultation may be appropriate before creating your patient account.</p></div>
        <button className="primary-button" onClick={() => onNavigate("eligibility")}>Check Eligibility</button>
      </div>
    </PageShell>
  );
}

export function ConditionsPage({ onNavigate }: { onNavigate: NavigateFn }) {
  return (
    <PageShell eyebrow="Conditions" title="Conditions Canvia may assess" text="Canvia assesses each patient individually. Medical cannabis treatment is not suitable for everyone and is only considered where clinically appropriate following specialist review.">
      <div className="condition-grid">
        {conditionCards.map((card) => <article className="condition-card" key={card.title}><h3>{card.title}</h3><p>{card.copy}</p></article>)}
      </div>
      <div className="notice-card">
        <h2>Not everyone is suitable</h2>
        <p>Some patients may require further review or may not be suitable, including those who are pregnant or breastfeeding, those with certain psychiatric histories, active substance misuse concerns or unstable medical conditions.</p>
        <button className="secondary-button" onClick={() => onNavigate("eligibility")}>Check Eligibility</button>
      </div>
    </PageShell>
  );
}

export function InformationPage() {
  const blocks = [
    ["What are cannabis-based medicinal products?", "Cannabis-based medicinal products are prescribed medicines that may contain cannabinoids such as THC, CBD or other components. They are only considered for patients following clinical assessment."],
    ["How are they prescribed?", "Treatment is not automatically provided. The clinician reviews your history, previous treatments, current medicines, risks and goals before deciding whether prescribing is appropriate."],
    ["Why are medical records needed?", "Clinical records help confirm diagnosis, previous treatments, current medicines and safety considerations. They support responsible prescribing decisions."],
    ["Benefits and limitations", "Some patients may report benefit, but medical cannabis is not a cure and does not work for everyone. Treatment should be reviewed regularly."],
    ["Possible side effects", "Potential side effects can include tiredness, dizziness, changes in mood, dry mouth, impaired concentration or other effects. Patients should discuss risks with their clinician."],
    ["Driving and impairment", "Patients must not drive if impaired. Follow your clinician’s advice and the legal requirements relating to prescribed medicines and driving."],
    ["Storage and safe use", "Prescribed medicines should be stored securely, used only as directed and kept away from children or anyone for whom they were not prescribed."],
    ["Working with your GP", "Canvia may request records from your GP or communicate relevant information back to your usual clinician where appropriate."]
  ];

  return (
    <PageShell eyebrow="Patient information" title="Medical cannabis information for patients" text="Clear, balanced information to help patients understand the assessment process, potential risks and the importance of clinical review.">
      <div className="content-grid">{blocks.map(([title, text]) => <InfoBlock key={title} title={title} text={text} />)}</div>
    </PageShell>
  );
}

export function PricingPage() {
  return (
    <PageShell eyebrow="Pricing" title="Transparent consultation pricing" text="Pricing below uses editable placeholders. Product costs are separate and are handled by the dispensing pharmacy or partner provider where applicable.">
      <div className="pricing-grid">
        <PricingCard title="Initial Eligibility Assessment" price="£0" text="Online screening to help determine whether specialist consultation may be appropriate." />
        <PricingCard title="Initial Specialist Consultation" price="£XX" text="Online consultation with an appropriate specialist clinician." highlighted />
        <PricingCard title="Follow-up Consultation" price="£XX" text="Ongoing clinical review to monitor suitability, response, side effects and care goals." />
        <PricingCard title="Repeat Prescription/Admin Fee" price="£XX" text="If applicable, subject to clinical review, clinic policy and ongoing suitability." />
        <PricingCard title="Product Costs" price="Variable" text="Medication costs are set separately by the dispensing pharmacy or partner provider." />
      </div>
      <div className="notice-card"><h2>Important pricing note</h2><p>A consultation does not guarantee that treatment will be prescribed. Prescribing decisions are made by the clinician following full assessment. Canvia should not display strain menus, product promotions or prescription-only medicine advertising to the public.</p></div>
    </PageShell>
  );
}

export function AboutPage() {
  return (
    <PageShell eyebrow="About Canvia" title="A safer pathway to specialist clinical assessment" text="Canvia was created to provide a calm, structured and clinically governed route for eligible UK patients seeking specialist assessment for medical cannabis treatment.">
      <div className="split-grid">
        <div className="copy-panel"><h2>Our approach</h2><p>Canvia is designed around responsible prescribing, clear suitability criteria, patient education, secure digital healthcare systems and ongoing monitoring.</p><p>The service is intended to operate as an online specialist clinic, with Medesk supporting patient registration, bookings, clinical records, consultations and secure access.</p></div>
        <div className="copy-panel dark"><h2>What Canvia is not</h2><ul className="clean-list"><li>Not a recreational cannabis service.</li><li>Not a dispensary or product shop.</li><li>Not an emergency medical service.</li><li>Not a guaranteed prescription service.</li></ul></div>
      </div>
      <div className="feature-grid three"><FeatureCard icon="◇" title="Patient-centred" text="Clear information, simple access and ongoing support." /><FeatureCard icon="▧" title="Clinically governed" text="Designed around appropriate review, records and responsible prescribing." /><FeatureCard icon="✧" title="Digitally enabled" text="Medesk integration supports patient and clinician workflows." /></div>
    </PageShell>
  );
}

export function GovernancePage() {
  const cards = [
    ["Responsible prescribing", "A prescription is only considered after full clinical assessment and where clinically appropriate."],
    ["Specialist-led review", "Suitability is reviewed by an appropriate clinician with consideration of medical history, previous treatments and risk factors."],
    ["Medical records", "Patients may need to provide GP summaries, specialist letters and medication history before prescribing decisions are made."],
    ["Safeguarding", "Patients at risk, mental health concerns and clinical red flags should be escalated through clear governance pathways."],
    ["Mental health considerations", "Psychiatric history is assessed carefully. Some patients may require further review or may not be suitable."],
    ["Follow-up monitoring", "Ongoing review helps monitor benefit, adverse effects, dose suitability and continuing appropriateness."],
    ["Pharmacy partner model", "Where treatment is prescribed, prescriptions are fulfilled by an appropriately licensed pharmacy or dispensing partner."],
    ["Confidentiality", "Patient records and communications should be managed securely through Medesk or an equivalent clinical system."]
  ];

  return (
    <PageShell eyebrow="Clinical governance" title="Responsible prescribing and patient safety" text="Canvia’s governance model is designed to support safe, appropriate and evidence-informed prescribing, with patient safety at the centre of the service.">
      <div className="governance-grid">{cards.map(([title, text]) => <GovernanceCard key={title} title={title} text={text} />)}</div>
    </PageShell>
  );
}

export function CqcPage() {
  const details = ["CQC Provider Name", "Registration Number", "Registered Manager", "Regulated Activities", "CQC Profile Link", "Current Rating"];
  return (
    <PageShell eyebrow="CQC & regulation" title="Regulatory status and clinical accountability" text="This page is designed to hold Canvia’s CQC and regulatory information once applicable. Do not claim active CQC registration unless details have been confirmed.">
      <div className="regulatory-card">
        <h2>CQC registration details</h2>
        <dl className="details-list">
          {details.map((item) => <div key={item}><dt>{item}</dt><dd>{item === "Current Rating" ? "[Not yet rated / To be added]" : "[To be added]"}</dd></div>)}
        </dl>
        <div className="notice-card compact-notice"><h3>Current placeholder wording</h3><p>Canvia is preparing its clinical governance framework in line with expectations for regulated online healthcare services in England. CQC registration details will be displayed here once applicable.</p></div>
      </div>
    </PageShell>
  );
}

export function ReferrersPage() {
  return (
    <PageShell eyebrow="For referrers" title="Information for healthcare professionals and partners" text="Canvia welcomes appropriate supporting clinical information from GPs, physiotherapists, pain clinics, pharmacies and other healthcare professionals.">
      <div className="content-grid">
        <InfoBlock title="Refer a patient" text="Patients may self-refer, but relevant clinical records are required before prescribing decisions can be made." />
        <InfoBlock title="What information we need" text="Useful information may include diagnosis, medication history, previous treatments, relevant specialist letters and current clinical concerns." />
        <InfoBlock title="Communication with clinicians" text="Where appropriate, Canvia may request information from or send updates to the patient’s GP or usual clinician." />
        <InfoBlock title="Pharmacy partners" text="Canvia does not need to dispense directly. Prescriptions can be fulfilled by licensed pharmacy or dispensing partners." />
      </div>
      <div className="cta-inline-card"><div><h2>Professional referral enquiry</h2><p>Use the contact page to send a professional referral or partnership enquiry.</p></div><a className="primary-button" href="mailto:hello@canvia.co.uk">Email Canvia</a></div>
    </PageShell>
  );
}

export function FaqPage() {
  return (
    <PageShell eyebrow="FAQs" title="Frequently asked questions" text="Clear answers for patients considering Canvia’s online assessment pathway.">
      <div className="faq-list">{faqs.map((item) => <details className="faq-item" key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
    </PageShell>
  );
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent) { event.preventDefault(); setSent(true); }
  return (
    <PageShell eyebrow="Contact" title="Contact Canvia" text="Use this form for general enquiries, patient support, professional referrals, complaints or partnership enquiries. Do not use this form for urgent medical issues.">
      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name<input type="text" required placeholder="Your name" /></label>
          <label>Email<input type="email" required placeholder="your.email@example.com" /></label>
          <label>Phone<input type="tel" placeholder="Optional" /></label>
          <label>Enquiry type<select required defaultValue=""><option value="" disabled>Select enquiry type</option><option>Patient enquiry</option><option>Professional referral</option><option>Complaint</option><option>Partnership enquiry</option><option>General enquiry</option></select></label>
          <label>Message<textarea required placeholder="Please provide a brief message. Do not include urgent medical information." /></label>
          <label className="checkbox-row"><input type="checkbox" required /><span>I understand Canvia is not an emergency service and consent to being contacted about my enquiry.</span></label>
          <button className="primary-button large" type="submit">Send Enquiry</button>
          {sent && <p className="form-success">Thank you. This prototype does not send messages yet. Connect this form to your website backend or Medesk workflow.</p>}
        </form>
        <aside className="contact-panel"><h2>Canvia Medical Cannabis Clinic</h2><p>Email: hello@canvia.co.uk</p><p>Phone: [To be added]</p><p>Company number: [To be added]</p><p>Registered office: [To be added]</p><div className="urgent-box"><strong>Urgent help</strong><p>Canvia is not an emergency service. If you need urgent medical help, call 999, NHS 111, your GP or attend urgent care.</p></div></aside>
      </div>
    </PageShell>
  );
}

function PolicyPage({ eyebrow, title, sections }: { eyebrow: string; title: string; sections: [string, string][] }) {
  return (
    <PageShell eyebrow={eyebrow} title={title} text="Placeholder policy wording for the first website version. This should be legally and clinically reviewed before launch.">
      <div className="policy-card">{sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}</div>
    </PageShell>
  );
}

export function PrivacyPage() {
  return <PolicyPage eyebrow="Privacy" title="Privacy Policy" sections={[["Purpose", "This placeholder privacy policy explains how Canvia intends to handle personal information. The final version should be reviewed by a UK GDPR/data protection specialist before launch."], ["Clinical information", "Sensitive clinical information should be collected, stored and managed through Medesk or an equivalent secure clinical system, not through unsecured public website forms."], ["Lawful basis", "The final policy should define lawful bases for processing, including healthcare provision, consent where applicable, legal obligations and legitimate interests."], ["Patient rights", "Patients should be informed of their rights of access, rectification, erasure, restriction, objection and data portability where applicable."], ["Contact", "Data protection enquiries should be directed to hello@canvia.co.uk or the final designated privacy contact."]]} />;
}

export function TermsPage() {
  return <PolicyPage eyebrow="Terms" title="Terms & Conditions" sections={[["Website use", "This website provides general information about Canvia and the intended online specialist assessment pathway."], ["No emergency service", "Canvia is not an emergency medical service. Users requiring urgent care should contact 999, NHS 111, their GP or urgent care services."], ["No prescription guarantee", "Completing an eligibility checker, registering or booking a consultation does not guarantee that treatment will be prescribed."], ["Clinical decisions", "All clinical decisions are made by an appropriate clinician following individual assessment."], ["External platforms", "Bookings, patient portal access and clinical records may be handled through Medesk or another secure clinical platform."]]} />;
}

export function ComplaintsPage() {
  return <PolicyPage eyebrow="Complaints" title="Complaints Policy" sections={[["Our approach", "Canvia aims to manage complaints fairly, promptly and transparently."], ["How to complain", "Patients may submit complaints using the contact page or by emailing hello@canvia.co.uk. A dedicated complaints email can be added before launch."], ["Acknowledgement", "The final policy should define acknowledgement and response timeframes in line with the clinic’s governance procedures."], ["Escalation", "Where applicable, patients should be informed of their escalation options and relevant regulatory routes."], ["Learning from complaints", "Complaints should be reviewed as part of the clinic’s quality and governance process."]]} />;
}

export function SafeguardingPage() {
  return <PolicyPage eyebrow="Safeguarding" title="Safeguarding Statement" sections={[["Patient safety", "Canvia’s service should be designed to identify and escalate safeguarding concerns, clinical red flags and patients at risk."], ["Adults at risk", "Staff and clinicians should receive appropriate training to recognise potential safeguarding concerns involving adults at risk."], ["Mental health concerns", "Patients reporting crisis, severe instability or urgent concerns should be directed to appropriate urgent or emergency care routes."], ["Escalation", "The final safeguarding policy should define named leads, escalation routes, documentation requirements and external reporting processes."], ["Not an emergency service", "Canvia is not an emergency service. Urgent medical concerns should be directed to 999, NHS 111, GP services or urgent care."]]} />;
}

export function AccessibilityPage() {
  return <PolicyPage eyebrow="Accessibility" title="Accessibility Statement" sections={[["Commitment", "Canvia aims to provide a website that is accessible, readable and usable for as many people as possible."], ["Design standards", "The website should use clear contrast, readable typography, keyboard-accessible controls and semantic HTML."], ["Feedback", "Users who experience accessibility barriers should contact hello@canvia.co.uk so improvements can be considered."], ["Ongoing review", "Accessibility should be reviewed regularly as the website and patient portal experience develops."]]} />;
}

export function DisclaimerPage() {
  return <PolicyPage eyebrow="Medical disclaimer" title="Medical Disclaimer" sections={[["General information only", "The information on this website is for general information and does not replace medical advice from a qualified clinician."], ["No diagnosis", "The eligibility checker does not diagnose any condition and does not confirm treatment suitability."], ["No prescription guarantee", "A prescription is only issued where clinically appropriate following full clinical assessment."], ["Existing medicines", "Patients should not stop, start or change existing medicines without speaking to their usual clinician or prescribing clinician."], ["Emergency care", "Canvia is not an emergency service. If you need urgent medical help, call 999, NHS 111, your GP or attend urgent care."]]} />;
}
