import type { Metadata } from "next";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Hinweise zum Impressum des Website-Prototyps Fahrschule Korba.",
};

export default function ImpressumPage() {
  return (
    <main id="main-content" className="faq-page">
      <section className="faq-hero">
        <div className="section-shell faq-hero-inner">
          <Link className="back-link" href="/">
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            Zur Startseite
          </Link>
          <h1>Impressum</h1>
          <p>Fahrschule Korba ist ein fiktiver Website-Prototyp. Es findet kein realer Geschäftsbetrieb statt.</p>
        </div>
      </section>

      <section className="faq-list-section">
        <div className="section-shell legal-copy">
          <p className="eyebrow">Vor Veröffentlichung erforderlich</p>
          <h2>Echte Anbieterangaben einsetzen</h2>
          <p>
            Vor einer Veröffentlichung müssen insbesondere verantwortliche Person oder Gesellschaft,
            ladungsfähige Anschrift, reale Kontaktdaten und gegebenenfalls Register- sowie
            Aufsichtsangaben ergänzt und rechtlich geprüft werden.
          </p>
        </div>
      </section>
    </main>
  );
}
