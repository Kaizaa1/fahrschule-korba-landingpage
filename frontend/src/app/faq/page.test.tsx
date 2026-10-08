import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FaqPage from "./page";

describe("FAQ page", () => {
  it("renders the dedicated FAQ route content and structured FAQ data", () => {
    const { container } = render(<FaqPage />);

    expect(screen.getByRole("heading", { name: "Fragen vor der ersten Fahrstunde" })).toBeInTheDocument();
    expect(screen.getByText("Was kostet der Führerschein bei Fahrschule Korba?")).toBeInTheDocument();
    expect(screen.getByText("Was ist B197?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Termin buchen" })).toHaveAttribute("href", "/#termin");

    const jsonLd = container.querySelector('script[type="application/ld+json"]');
    expect(jsonLd?.textContent).toContain('"@type":"FAQPage"');
    expect(jsonLd?.textContent).toContain('"name":"Was ist B197?"');
  });
});
