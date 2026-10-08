import { describe, expect, it } from "vitest";
import { getNextTeamIndex, getTeamSlot, TEAM_ROTATION_MS } from "./team-rotation";

describe("team rotation", () => {
  it("maps the active person to focus and its neighbors to the side slots", () => {
    expect([0, 1, 2].map((index) => getTeamSlot(index, 0, 3))).toEqual(["focus", "right", "left"]);
    expect([0, 1, 2].map((index) => getTeamSlot(index, 1, 3))).toEqual(["left", "focus", "right"]);
  });

  it("cycles after exactly two seconds", () => {
    expect(TEAM_ROTATION_MS).toBe(2000);
    expect(getNextTeamIndex(0, 3)).toBe(1);
    expect(getNextTeamIndex(2, 3)).toBe(0);
  });
});
