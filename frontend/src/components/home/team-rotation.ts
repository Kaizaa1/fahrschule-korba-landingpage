export const TEAM_ROTATION_MS = 2000;

export type TeamSlot = "left" | "focus" | "right";

export function getTeamSlot(index: number, activeIndex: number, count: number): TeamSlot {
  const offset = (index - activeIndex + count) % count;

  if (offset === 0) return "focus";
  return offset === 1 ? "right" : "left";
}

export function getNextTeamIndex(activeIndex: number, count: number) {
  return (activeIndex + 1) % count;
}
