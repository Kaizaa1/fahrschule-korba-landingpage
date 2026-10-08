import { describe, expect, it } from "vitest";
import {
  drivingClasses,
  faqItems,
  imageAssets,
  prices,
  siteContent,
  team,
} from "./site";

describe("site content contract", () => {
  it("anchors the brand in Krefeld and keeps the FAQ on its own route", () => {
    expect(siteContent.name).toBe("Fahrschule Korba");
    expect(siteContent.location).toBe("Krefeld");
    expect(siteContent.primaryCta).toBe("Termin buchen");
    expect(siteContent.navigation).toContainEqual({ label: "FAQ", href: "/faq" });
  });

  it("contains the agreed driving offers", () => {
    expect(drivingClasses.map((entry) => entry.name)).toEqual(
      expect.arrayContaining(["Klasse B", "B197", "Automatik", "Auffrischung"]),
    );
  });

  it("keeps the app cost transparent", () => {
    expect(prices.some((price) => price.label === "Fahrschulapp" && price.value.includes("49"))).toBe(true);
  });

  it("provides three instructors and a useful FAQ", () => {
    expect(team).toHaveLength(3);
    expect(faqItems.length).toBeGreaterThanOrEqual(8);
  });

  it("references the six final Korba image assets instead of placeholders", () => {
    expect(imageAssets).toEqual({
      logoMark: "/images/korba-logo-mark.png",
      logoFull: "/images/korba-logo-full.png",
      car: "/images/korba-touareg-hero.png",
      teamCar: "/images/korba-touareg-team.png",
      app: "/images/korba-app.webp",
      team: {
        mara: "/images/team-mara.webp",
        leonie: "/images/team-leonie.webp",
        samir: "/images/team-samir.webp",
      },
    });
  });
});
