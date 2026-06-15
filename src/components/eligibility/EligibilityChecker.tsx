import { FormEvent, useMemo, useState } from "react";
import { MEDESK_PATIENT_PORTAL_URL } from "../../config/links";
import type { EligibilityOutcome } from "../../types";
import { Outcome } from "./Outcome";
import { SelectField, TextField } from "./FormFields";

export function EligibilityChecker() {
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

        <SelectField label="Are you aged 18 or over?" value={answers.age18} onChange={(value) => update("age18", value)} options={[["", "Select an answer"], ["yes", "Yes"], ["no", "No"]]} />
        <SelectField label="Are you currently living in the UK?" value={answers.uk} onChange={(value) => update("uk", value)} options={[["", "Select an answer"], ["yes", "Yes"], ["no", "No"]]} />
        <SelectField label="What condition or symptom area are you seeking support for?" value={answers.condition} onChange={(value) => update("condition", value)} options={[["", "Select an option"], ["chronic-pain", "Chronic pain"], ["neuropathic-pain", "Neuropathic pain"], ["fibromyalgia", "Fibromyalgia-type pain"], ["sciatica", "Sciatica-related pain"], ["migraine", "Migraine/headache disorder"], ["anxiety", "Anxiety-related symptoms"], ["sleep", "Sleep-related symptoms"], ["other", "Other"]]} />
        <SelectField label="Have you received a formal diagnosis or been assessed by a healthcare professional?" value={answers.diagnosis} onChange={(value) => update("diagnosis", value)} options={[["", "Select an answer"], ["yes", "Yes"], ["no", "No"], ["unsure", "Unsure"]]} />
        <SelectField label="Have you tried standard treatments before?" value={answers.triedTreatments} onChange={(value) => update("triedTreatments", value)} options={[["", "Select an answer"], ["yes", "Yes"], ["no", "No"], ["unsure", "Unsure"]]} />
        <TextField label="Which treatments have you tried? Optional summary only." value={answers.treatments} onChange={(value) => update("treatments", value)} placeholder="Example: GP medicines, physiotherapy, pain clinic, talking therapy" />
        <SelectField label="Do you have access to your GP summary, medication history, specialist letters or relevant records?" value={answers.records} onChange={(value) => update("records", value)} options={[["", "Select an answer"], ["yes", "Yes"], ["no", "No"], ["unsure", "Unsure"]]} />
        <SelectField label="Are you currently pregnant, trying to become pregnant, or breastfeeding?" value={answers.pregnant} onChange={(value) => update("pregnant", value)} options={[["", "Select an answer"], ["yes", "Yes"], ["no", "No"], ["prefer-not", "Prefer not to say"]]} />
        <SelectField label="Do you have a history of psychosis, schizophrenia, bipolar disorder or severe unstable mental health symptoms?" value={answers.psychosis} onChange={(value) => update("psychosis", value)} options={[["", "Select an answer"], ["yes", "Yes"], ["no", "No"], ["prefer-not", "Prefer not to say"]]} />
        <SelectField label="Do you have a history of substance misuse or dependence?" value={answers.substance} onChange={(value) => update("substance", value)} options={[["", "Select an answer"], ["yes", "Yes"], ["no", "No"], ["prefer-not", "Prefer not to say"]]} />
        <TextField label="Are you currently taking any regular medicines? Optional summary only." value={answers.medicines} onChange={(value) => update("medicines", value)} placeholder="Please provide a brief summary only" />
        <TextField label="Do you have any known allergies? Optional summary only." value={answers.allergies} onChange={(value) => update("allergies", value)} placeholder="Please provide a brief summary only" />
        <SelectField label="Do you need urgent or emergency medical help today?" value={answers.urgent} onChange={(value) => update("urgent", value)} options={[["", "Select an answer"], ["yes", "Yes"], ["no", "No"]]} />
        <SelectField label="Do you understand this checker does not guarantee treatment?" value={answers.consent} onChange={(value) => update("consent", value)} options={[["", "Select an answer"], ["yes", "Yes"], ["no", "No"]]} />

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
              <p>The checker helps identify whether Medesk registration, further information or another route may be more appropriate.</p>
            </>
          )}

          {submitted && outcome === "potential" && (
            <Outcome tone="positive" title="You may be suitable for a specialist consultation." text="Based on your answers, a consultation may be appropriate. A prescription is not guaranteed and any treatment decision will depend on full clinical review." ctaText="Continue to Registration" ctaHref={MEDESK_PATIENT_PORTAL_URL} />
          )}
          {submitted && outcome === "info" && (
            <Outcome tone="neutral" title="More information may be required." text="Based on your answers, Canvia may need further clinical information before confirming whether a consultation is appropriate. You may be asked for GP records, medication history or specialist letters." ctaText="Create Patient Account" ctaHref={MEDESK_PATIENT_PORTAL_URL} />
          )}
          {submitted && outcome === "unsuitable" && (
            <Outcome tone="caution" title="This service may not be suitable at this time." text="Based on your answers, Canvia may not be the most appropriate service for you. Please speak with your GP, usual clinician or an appropriate healthcare service." ctaText="Contact Canvia" ctaHref="mailto:hello@canvia.co.uk" />
          )}
          {submitted && outcome === "urgent" && (
            <Outcome tone="urgent" title="Canvia is not an emergency service." text="If you need urgent medical help, call 999, NHS 111, your GP or attend urgent care. Do not wait for an online clinic appointment if your symptoms are urgent." ctaText="Read Medical Disclaimer" ctaHref="#" />
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
