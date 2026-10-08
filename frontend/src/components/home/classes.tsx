import { Reveal } from "@/components/reveal";
import { drivingClasses } from "@/content/site";

export function Classes() {
  return (
    <section id="klassen" className="classes-section" aria-labelledby="classes-title">
      <div className="section-shell">
        <Reveal className="section-heading">
          <h2 id="classes-title">Dein Weg. Deine Fahrzeugklasse.</h2>
          <p>Vom ersten Führerschein bis zum sicheren Wiedereinstieg.</p>
        </Reveal>

        <div className="classes-grid">
          {drivingClasses.map((entry, index) => (
            <Reveal className={`class-tile class-tile-${index + 1}`} key={entry.name}>
              <div className="class-code">{entry.code}</div>
              <div className="class-copy">
                <h3>{entry.name}</h3>
                <p>{entry.description}</p>
                <span>{entry.note}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="classes-subline">
          <strong>Außerdem:</strong> Schaltwagen-Ausbildung und gezielte Prüfungsvorbereitung.
        </p>
      </div>
    </section>
  );
}
