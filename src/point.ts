export interface Point {
  y: number;
  x: number;
}

export const find_inner_margin = (p: Point): Point => {
  return {
    x: (p.x > Math.floor(p.x) + 0.5) ? Math.ceil(p.x) + 0.5 : Math.floor(p.x) + 0.5,
    y: p.y > Math.floor(p.y) + 0.5 ? Math.ceil(p.y) + 0.5 : Math.floor(p.y) + 0.5,
  }
}