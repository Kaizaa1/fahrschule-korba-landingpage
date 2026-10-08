import type { Metadata } from "next";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzhinweise zum Website-Prototyp Fahrschule Korba.",
};

export default function DatenschutzPage() {
  return (
    <main id="main-content" className="faq-page">
      <section className="faq-hero">
        <div className="section-shell faq-hero-inner">
          <Link className="back-link" href="/">
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            Zur Startseite
          </Link>
          <h1>Datenschutz</h1>
          <p>Dieser Prototyp speichert oder versendet keine Angaben aus der Terminanfrage.</p>
        </div>
      </section>

      <section className="faq-list-section">
        <div className="section-shell legal-copy">
          <p className="eyebrow">Vor Veröffentlichung erforderlich</p>
          <h2>Reale Datenverarbeitung dokumentieren</h2>
          <p>
            Vor dem Livegang müssen Hosting, Formulare, externe Dienste, Speicherdauer,
            Rechtsgrundlagen, Betroffenenrechte und die Kontaktdaten der verantwortlichen Stelle
            vollständig beschrieben und rechtlich geprüft werden.
          </p>
        </div>
      </section>
    </main>
  );
}
