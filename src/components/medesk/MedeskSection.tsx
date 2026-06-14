import {
  MEDESK_BOOKING_URL,
  MEDESK_CLINICIAN_LOGIN_URL,
  MEDESK_PATIENT_PORTAL_URL
} from "../../config/links";

export function MedeskSection() {
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
