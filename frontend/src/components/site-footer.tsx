import { EnvelopeSimple, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { contactDetails, imageAssets, siteContent } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div className="footer-brand">
          <Image
            className="footer-logo"
            src={imageAssets.logoFull}
            alt={siteContent.name}
            width={846}
            height={838}
            sizes="160px"
          />
          <div>
            <span>{siteContent.location}</span>
            <span className="footer-classes">B · B197 · Automatik · Auffrischung</span>
          </div>
        </div>

        <div className="footer-contact">
          <a href="tel:+492151000000"><Phone size={18} weight="fill" aria-hidden="true" />{contactDetails.phone}</a>
          <a href="https://wa.me/492151000000"><WhatsappLogo size={18} weight="fill" aria-hidden="true" />{contactDetails.whatsapp}</a>
          <a href={`mailto:${contactDetails.email}`}><EnvelopeSimple size={18} weight="fill" aria-hidden="true" />{contactDetails.email}</a>
          <span><MapPin size={18} weight="fill" aria-hidden="true" />Krefeld</span>
        </div>

        <nav className="footer-nav" aria-label="Fußnavigation">
          <Link href="/#preise">Preise</Link>
          <Link href="/#team">Team</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/impressum">Impressum</Link>
        </nav>
      </div>
      <div className="section-shell footer-bottom">
        <span>{contactDetails.demoNote}</span>
        <span>{contactDetails.openingHours.join(" / ")}</span>
      </div>
    </footer>
  );
}
