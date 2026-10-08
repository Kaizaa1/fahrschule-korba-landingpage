"use client";

import { RocketLaunch } from "@phosphor-icons/react";
import { m, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { processSteps } from "@/content/site";

const flatPath =
  "M 28 96 C 130 96 230 96 330 96 C 430 96 520 96 620 96 C 720 96 810 96 900 96 C 1000 96 1090 96 1170 96";
const routePath =
  "M 28 122 C 130 30 245 32 330 92 C 430 164 530 154 620 86 C 720 20 820 24 900 94 C 1000 164 1090 142 1170 48";

export function ProcessRoute() {
  const reduceMotion = useReducedMotion();
  const finalRocketTransform = "translate3d(94cqw, 12px, 0) rotate(-10deg)";

  return (
    <section id="ablauf" className="process-section" aria-labelledby="process-title">
      <div className="section-shell">
        <Reveal className="section-heading process-heading">
          <h2 id="process-title">Vom ersten Gespräch bis zur Prüfung.</h2>
          <p>Eine klare Route mit sechs Stationen. Du weißt jederzeit, was als Nächstes kommt.</p>
        </Reveal>

        <div className="process-route" aria-label="Ablauf bis zum Führerschein">
          <div className="process-route-visual">
            <svg aria-hidden="true" className="process-route-svg" viewBox="0 0 1200 180" preserveAspectRatio="none">
              <m.path
                className="process-route-shadow"
                d={routePath}
                fill="none"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: reduceMotion ? 0 : 2.4, ease: [0.77, 0, 0.175, 1] }}
              />
              <m.path
                className="process-route-line"
                fill="none"
                initial={reduceMotion ? { d: routePath, pathLength: 1 } : { d: flatPath, pathLength: 0 }}
                whileInView={{ d: routePath, pathLength: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: reduceMotion ? 0 : 2.4, ease: [0.77, 0, 0.175, 1] }}
              />
            </svg>

            <m.div
              aria-label="Rakete auf der Strecke von Beratung bis Prüfung"
              className="process-rocket"
              role="img"
              initial={reduceMotion ? false : { transform: "translate3d(0cqw, 88px, 0) rotate(-18deg)" }}
              style={reduceMotion ? { transform: finalRocketTransform } : undefined}
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      transform: [
                        "translate3d(0cqw, 88px, 0) rotate(-18deg)",
                        "translate3d(24cqw, 22px, 0) rotate(-3deg)",
                        "translate3d(49cqw, 112px, 0) rotate(8deg)",
                        "translate3d(73cqw, 24px, 0) rotate(-4deg)",
                        finalRocketTransform,
                      ],
                    }
              }
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 2.4, ease: [0.77, 0, 0.175, 1], times: [0, 0.25, 0.5, 0.75, 1] }}
            >
              <RocketLaunch size={24} weight="fill" aria-hidden="true" />
            </m.div>
          </div>

          <ol className="process-stations">
            {processSteps.map((step) => (
              <li className="process-station" key={step.title}>
                <span className="process-station-dot" aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
