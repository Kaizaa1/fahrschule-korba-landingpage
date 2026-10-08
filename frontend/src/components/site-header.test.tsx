import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("renders the brand, navigation and the single booking CTA", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "Fahrschule Korba" })).toHaveAttribute("href", "/");
    expect(screen.getAllByRole("link", { name: "Klassen" })[0]).toHaveAttribute("href", "/#klassen");
    expect(screen.getAllByRole("link", { name: "FAQ" })[0]).toHaveAttribute("href", "/faq");
    expect(screen.getAllByRole("link", { name: "Termin buchen" })[0]).toHaveAttribute("href", "/#termin");
  });

  it("opens and closes an accessible mobile menu", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const button = screen.getByRole("button", { name: "Menü öffnen" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Mobile Navigation" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation", { name: "Mobile Navigation" })).not.toBeInTheDocument();
  });
});
