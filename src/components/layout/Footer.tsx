import {
  MEDESK_BOOKING_URL,
  MEDESK_CLINICIAN_LOGIN_URL,
  MEDESK_PATIENT_PORTAL_URL
} from "../../config/links";
import { footerSections } from "../../data/nav";
import type { NavigateFn } from "../../types";

export function Footer({ onNavigate }: { onNavigate: NavigateFn }) {
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
        <p>Company number: [To be added] · Registered office: [To be added] · CQC provider details: [To be added]</p>
        <p>© {new Date().getFullYear()} Canvia Medical Cannabis Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
}
