"use client";

import { ArrowRight, MapPin } from "@phosphor-icons/react";
import { m, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { imageAssets, siteContent } from "@/content/site";

export function HeroScene() {
  const reduceMotion = useReducedMotion();
  const contentDelay = reduceMotion ? 0 : 0.75;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-route" aria-hidden="true">
        <span className="route-line route-line-one" />
        <span className="route-line route-line-two" />
      </div>

      <m.div
        className="hero-car-track"
        initial={reduceMotion ? false : { transform: "translate3d(-42vw, 0, 0)", opacity: 0 }}
        animate={
          reduceMotion
            ? { transform: "translate3d(58vw, 0, 0)", opacity: 0 }
            : { transform: "translate3d(112vw, 0, 0)", opacity: [0, 1, 1, 0] }
        }
        transition={reduceMotion ? { duration: 0 } : { duration: 2, ease: [0.3, 0, 0.2, 1] }}
        aria-hidden="true"
      >
        <Image
          src={imageAssets.car}
          alt=""
          width={1658}
          height={646}
          sizes="(max-width: 620px) 75vw, 42vw"
          priority
        />
      </m.div>

      <div className="hero-inner">
        <m.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: contentDelay, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-location">
            <MapPin size={18} weight="fill" aria-hidden="true" />
            <span>Fahrausbildung in {siteContent.location}</span>
          </div>
          <h1 id="hero-title">{siteContent.claim}</h1>
          <p>{siteContent.description}</p>
          <ul className="hero-offers" aria-label="Unser Angebot">
            {siteContent.offers.map((offer) => <li key={offer}>{offer}</li>)}
          </ul>
          <div className="hero-actions">
            <Link className="button button-accent" href="#termin">
              {siteContent.primaryCta}
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
            <Link className="text-link" href="#preise">
              {siteContent.secondaryCta}
            </Link>
          </div>
        </m.div>

        <m.div
          aria-hidden="true"
          className="hero-wordmark"
          initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.45 }}
        >
          <Image
            className="hero-logo-ghost"
            src={imageAssets.logoMark}
            alt=""
            width={701}
            height={502}
            sizes="(max-width: 960px) 48vw, 34vw"
          />
        </m.div>
      </div>

      <div className="hero-asphalt" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
