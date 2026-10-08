import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion-provider";
import { Team } from "./team";

function renderTeam() {
  return render(
    <MotionProvider>
      <Team />
    </MotionProvider>,
  );
}

describe("Team focus rotation", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("focuses the next employee after two seconds", () => {
    renderTeam();

    expect(screen.getByRole("article", { name: /Mara Özdemir/ })).toHaveAttribute("aria-current", "true");
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole("article", { name: /Leonie Krüger/ })).toHaveAttribute("aria-current", "true");
  });

  it("omits the pause controls and allows direct employee selection", () => {
    renderTeam();

    expect(screen.queryByText("Im Fokus", { exact: true })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Rotation (pausieren|fortsetzen)/ })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Samir Haddad fokussieren" }));
    expect(screen.getByRole("article", { name: /Samir Haddad/ })).toHaveAttribute("aria-current", "true");
  });

  it("pauses automatically while the team stage is being inspected", () => {
    const { container } = renderTeam();
    const stage = container.querySelector(".team-stage");

    expect(stage).toBeInTheDocument();
    fireEvent.mouseEnter(stage as Element);
    act(() => vi.advanceTimersByTime(4000));
    expect(screen.getByRole("article", { name: /Mara Özdemir/ })).toHaveAttribute("aria-current", "true");

    fireEvent.mouseLeave(stage as Element);
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole("article", { name: /Leonie Krüger/ })).toHaveAttribute("aria-current", "true");
  });
});
