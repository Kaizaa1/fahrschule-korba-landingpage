import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion-provider";
import HomePage from "./page";

describe("home page", () => {
  it("contains every planned section and keeps FAQ off the start page", () => {
    const { container } = render(<MotionProvider><HomePage /></MotionProvider>);

    expect(screen.getByRole("heading", { name: "Führerschein so leicht wie noch nie" })).toBeInTheDocument();
    for (const id of ["klassen", "ablauf", "team", "preise", "termin"]) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    }
    expect(container.querySelector("#faq")).not.toBeInTheDocument();
  });

  it("places pricing before the app explanation and booking", () => {
    const { container } = render(<MotionProvider><HomePage /></MotionProvider>);
    const pricingHeading = screen.getByRole("heading", {
      name: "Preise, die nicht erst im Kleingedruckten auftauchen.",
    });
    const appHeading = screen.getByRole("heading", {
      name: "Planung, Lernstand und Termine in einer App.",
    });
    const booking = container.querySelector("#termin");

    expect(booking).toBeInTheDocument();
    expect(
      pricingHeading.compareDocumentPosition(appHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      appHeading.compareDocumentPosition(booking as Node) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
