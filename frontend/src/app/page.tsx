import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { HeroScene } from "@/components/hero-scene";
import { Advantages } from "@/components/home/advantages";
import { AppFeature } from "@/components/home/app-feature";
import { Classes } from "@/components/home/classes";
import { Pricing } from "@/components/home/pricing";
import { ProcessRoute } from "@/components/home/process-route";
import { Team } from "@/components/home/team";
import { BookingForm } from "@/components/booking-form";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <HeroScene />
        <Advantages />
        <Classes />
        <ProcessRoute />
        <Team />
        <Pricing />
        <AppFeature />

        <section id="termin" className="booking-section" aria-labelledby="booking-title">
          <div className="section-shell booking-layout">
            <div className="booking-intro">
              <h2 id="booking-title">Termin anfragen und Fahrlehrer auswählen.</h2>
              <p>Schreib uns, welche Klasse dich interessiert und wann wir dich am besten erreichen.</p>
              <Link className="faq-inline-link" href="/faq">
                Vorher noch eine Frage?
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </Link>
            </div>
            <BookingForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
