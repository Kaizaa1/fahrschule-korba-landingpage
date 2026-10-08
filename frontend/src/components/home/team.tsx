"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { imageAssets, team } from "@/content/site";
import {
  getNextTeamIndex,
  getTeamSlot,
  TEAM_ROTATION_MS,
  type TeamSlot,
} from "./team-rotation";

const slotTransforms: Record<TeamSlot, string> = {
  left: "translate3d(calc(-150% - 1rem), 14px, 0) rotate(-2deg) scale(0.94)",
  focus: "translate3d(-50%, -10px, 0) rotate(0deg) scale(1)",
  right: "translate3d(calc(50% + 1rem), 14px, 0) rotate(2deg) scale(0.94)",
};

export function Team() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState !== "hidden",
  );
  const shouldRotate = !reduceMotion && !interactionPaused && documentVisible;

  useEffect(() => {
    const handleVisibilityChange = () => {
      setDocumentVisible(document.visibilityState !== "hidden");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!shouldRotate) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => getNextTeamIndex(current, team.length));
    }, TEAM_ROTATION_MS);

    return () => window.clearInterval(interval);
  }, [activeIndex, shouldRotate]);

  return (
    <section id="team" className="team-section" aria-labelledby="team-title">
      <div className="team-intro section-shell">
        <m.div
          className="team-car"
          initial={reduceMotion ? false : { transform: "translate3d(42vw, 0, 0)", opacity: 0 }}
          whileInView={{ transform: "translate3d(0, 0, 0)", opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: reduceMotion ? 0 : 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={imageAssets.teamCar}
            alt="Weißer VW Touareg der Fahrschule Korba mit Fahrlehrer am Fenster"
            width={1657}
            height={647}
            sizes="(max-width: 960px) 100vw, 580px"
          />
        </m.div>
        <Reveal className="team-dialog">
          Such dir den Fahrlehrer aus, der zu dir passt.
        </Reveal>
      </div>

      <div className="section-shell team-content">
        <Reveal className="section-heading">
          <h2 id="team-title">Menschen, mit denen du gern lernst.</h2>
          <p>Ruhig erklärt, klar begleitet und passend zu deinem Lerntempo.</p>
        </Reveal>

        <div
          className="team-stage"
          onMouseEnter={() => setInteractionPaused(true)}
          onMouseLeave={() => setInteractionPaused(false)}
          onFocusCapture={() => setInteractionPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setInteractionPaused(false);
            }
          }}
        >
          <div className="team-controls">
            <div className="team-selector" role="group" aria-label="Mitarbeiter auswählen">
              {team.map((member, index) => (
                <button
                  className="team-selector-dot"
                  type="button"
                  aria-label={`${member.name} fokussieren`}
                  aria-pressed={index === activeIndex}
                  key={member.name}
                  onClick={() => setActiveIndex(index)}
                >
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="team-carousel" data-reduced-motion={Boolean(reduceMotion)}>
            {team.map((member, index) => {
              const slot = getTeamSlot(index, activeIndex, team.length);
              const titleId = `team-member-${index}`;

              return (
                <m.article
                  className="team-card"
                  key={member.name}
                  aria-labelledby={titleId}
                  aria-current={slot === "focus" ? "true" : undefined}
                  data-slot={slot}
                  initial={false}
                  animate={{
                    transform: reduceMotion ? "none" : slotTransforms[slot],
                    opacity: reduceMotion || slot === "focus" ? 1 : 0.84,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.77, 0, 0.175, 1] }}
                >
                  <div className="team-image-wrap">
                    <Image src={member.image} alt={member.imageAlt} fill sizes="(max-width: 960px) 84vw, 33vw" />
                  </div>
                  <div className="team-card-copy">
                    <h3 id={titleId}>{member.name}</h3>
                    <p>{member.classes}</p>
                    <strong>{member.focus}</strong>
                  </div>
                </m.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
