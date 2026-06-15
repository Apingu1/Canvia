import { useState } from "react";
import { MEDESK_BOOKING_URL, MEDESK_PATIENT_PORTAL_URL } from "../../config/links";
import { primaryNav } from "../../data/nav";
import type { NavigateFn, PageKey } from "../../types";

export function Header({ activePage, onNavigate }: { activePage: PageKey; onNavigate: NavigateFn }) {
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
        <button className="brand brand-image-button" onClick={() => handleNav("home")} aria-label="Canvia home">
          <img className="brand-logo header-brand-logo" src="/logo/canvia-logo-header.svg" alt="Canvia" />
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
