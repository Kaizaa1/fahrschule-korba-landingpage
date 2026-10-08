import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BookingForm } from "./booking-form";

describe("BookingForm", () => {
  it("labels every field and reports missing required information", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    expect(screen.getByLabelText("Führerscheinklasse")).toBeInTheDocument();
    expect(screen.getByLabelText("Fahrlehrer oder Fahrlehrerin")).toBeInTheDocument();
    expect(screen.getByLabelText("Kontaktweg")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("E-Mail oder Telefonnummer")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Anfrage vorbereiten" }));
    const drivingClass = screen.getByLabelText("Führerscheinklasse");
    const error = await screen.findByText("Bitte wähle eine Führerscheinklasse aus.");
    expect(drivingClass).toHaveAttribute("aria-invalid", "true");
    expect(drivingClass).toHaveAttribute("aria-describedby", error.id);
  });

  it("shows an honest demo success state without claiming a send", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    await user.selectOptions(screen.getByLabelText("Führerscheinklasse"), "B197");
    await user.selectOptions(screen.getByLabelText("Kontaktweg"), "E-Mail");
    await user.type(screen.getByLabelText("Name"), "Qaiser Barto");
    await user.type(screen.getByLabelText("E-Mail oder Telefonnummer"), "qaiser@example.de");
    await user.type(screen.getByLabelText("Nachricht"), "Ich möchte mich zu B197 beraten lassen.");
    await user.click(screen.getByRole("button", { name: "Anfrage vorbereiten" }));

    expect(await screen.findByText("Demo-Anfrage vorbereitet. Es wurden keine Daten versendet.")).toBeInTheDocument();
  });
});
