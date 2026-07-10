export const GAME_DURATION_S = 30;

export interface BugEntity {
  id: number;
  x: number;
  y: number;
  angle: number; // radians
  speed: number; // px per second
}

export function createBug(
  id: number,
  w: number,
  h: number,
  size: number,
  random: () => number = Math.random,
): BugEntity {
  return {
    id,
    x: random() * Math.max(1, w - size),
    y: random() * Math.max(1, h - size),
    angle: random() * Math.PI * 2,
    speed: 60 + random() * 80,
  };
}

export function stepBug(
  bug: BugEntity,
  w: number,
  h: number,
  size: number,
  dt: number,
): BugEntity {
  let x = bug.x + Math.cos(bug.angle) * bug.speed * dt;
  let y = bug.y + Math.sin(bug.angle) * bug.speed * dt;
  let angle = bug.angle;

  const maxX = Math.max(0, w - size);
  const maxY = Math.max(0, h - size);

  if (x < 0 || x > maxX) {
    angle = Math.PI - angle;
    x = Math.min(Math.max(x, 0), maxX);
  }
  if (y < 0 || y > maxY) {
    angle = -angle;
    y = Math.min(Math.max(y, 0), maxY);
  }

  return { ...bug, x, y, angle };
}
