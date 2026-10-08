import { Reveal } from "@/components/reveal";
import { prices, type PriceItem } from "@/content/site";

const groups: PriceItem["group"][] = ["Startkosten", "Fahrstunden", "Prüfungen", "Extras"];

export function Pricing() {
  return (
    <section id="preise" className="pricing-section" aria-labelledby="pricing-title">
      <div className="section-shell pricing-layout">
        <Reveal className="pricing-intro">
          <h2 id="pricing-title">Preise, die nicht erst im Kleingedruckten auftauchen.</h2>
          <p>Fiktive Beispielpreise für den Prototyp. Vor einer echten Veröffentlichung müssen sie ersetzt werden.</p>
          <span className="price-note">Alle Preise sind Beispielwerte.</span>
        </Reveal>

        <div className="price-groups">
          {groups.map((group) => (
            <article className="price-group" key={group}>
              <h3>{group}</h3>
              <div className="price-items">
                {prices.filter((item) => item.group === group).map((item) => (
                  <div className="price-item" key={item.label}>
                    <div><span>{item.label}</span>{item.note ? <small>{item.note}</small> : null}</div>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
