import { Check } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { advantages } from "@/content/site";

export function Advantages() {
  return (
    <section className="advantages-section" aria-labelledby="advantages-title">
      <div className="section-shell advantages-layout">
        <Reveal className="advantages-intro">
          <h2 id="advantages-title">Ausbildung ohne unnötige Umwege.</h2>
          <p>Du bekommst Orientierung, ehrliche Rückmeldungen und einen Plan, der zu deinem Alltag passt.</p>
        </Reveal>

        <div className="advantages-ledger">
          {advantages.map((item) => (
            <Reveal className="advantage-row" key={item.title}>
              <span className="advantage-check" aria-hidden="true"><Check size={17} weight="bold" /></span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
