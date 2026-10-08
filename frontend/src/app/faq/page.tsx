import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { faqItems } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Antworten zu Kosten, B197, Automatik, Anmeldung und Fahrstunden bei Fahrschule Korba.",
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main id="main-content" className="faq-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="faq-hero">
        <div className="section-shell faq-hero-inner">
          <Link className="back-link" href="/">
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            Zur Startseite
          </Link>
          <h1>Fragen vor der ersten Fahrstunde</h1>
          <p>Klare Antworten zu Ausbildung, Kosten, B197, Automatik und deiner Anmeldung.</p>
        </div>
      </section>

      <section className="faq-list-section">
        <div className="section-shell faq-layout">
          <aside>
            <h2>Noch etwas offen?</h2>
            <p>Nutze die Terminanfrage für eine unverbindliche Beratung.</p>
            <Link className="button button-dark" href="/#termin">
              Termin buchen
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </aside>
          <FaqAccordion />
        </div>
      </section>
    </main>
  );
}
