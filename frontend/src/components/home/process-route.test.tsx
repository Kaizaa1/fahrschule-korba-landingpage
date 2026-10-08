import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion-provider";
import { ProcessRoute } from "./process-route";

const stationNames = [
  "Beratung",
  "Anmeldung",
  "Theorie",
  "Praxis",
  "Vorbereitung",
  "Prüfung",
];

describe("ProcessRoute", () => {
  it("shows the complete route and an explanatory rocket", () => {
    render(<MotionProvider><ProcessRoute /></MotionProvider>);

    for (const name of stationNames) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }

    expect(
      screen.getByRole("img", { name: "Rakete auf der Strecke von Beratung bis Prüfung" }),
    ).toBeInTheDocument();
  });
});
