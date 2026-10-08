import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { appFeatures, imageAssets } from "@/content/site";

export function AppFeature() {
  return (
    <section className="app-section" aria-labelledby="app-title">
      <div className="section-shell app-panel">
        <Reveal className="app-copy">
          <h2 id="app-title">Planung, Lernstand und Termine in einer App.</h2>
          <p>Die App ist Teil deiner Ausbildung und wird bei den Kosten transparent ausgewiesen.</p>
          <div className="app-feature-list">
            {appFeatures.map((feature) => (
              <span key={feature}><CheckCircle size={18} weight="fill" aria-hidden="true" />{feature}</span>
            ))}
          </div>
          <div className="app-price"><strong>49 €</strong><span>einmalig</span></div>
        </Reveal>
        <Reveal className="app-visual">
          <Image
            src={imageAssets.app}
            alt="Fahrschulapp mit Lernstand und nächster Fahrstunde"
            width={900}
            height={720}
            sizes="(max-width: 900px) 100vw, 52vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
