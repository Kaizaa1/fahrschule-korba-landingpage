"use client";

import { List, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { imageAssets, siteContent } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-link" href="/" onClick={() => setOpen(false)}>
          <Image
            className="brand-logo-mark"
            src={imageAssets.logoMark}
            alt=""
            width={701}
            height={502}
            sizes="48px"
            priority
          />
          <span>{siteContent.name}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {siteContent.navigation.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-dark header-cta" href="/#termin">
          {siteContent.primaryCta}
        </Link>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={22} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>

      {open ? (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile Navigation">
          {siteContent.navigation.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="button button-accent" href="/#termin" onClick={() => setOpen(false)}>
            {siteContent.primaryCta}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
