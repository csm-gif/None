// Compose the wordmark SVG from tools/wordmark.py output. Used by build.mjs and for the standalone logo file.
import { readFileSync } from "node:fs";
export function wordmarkSvg(jsonPath, { ink = "currentColor", signal = "var(--signal, #0A7466)", height = 28, title = true, cls = "wordmark" } = {}) {
  const d = JSON.parse(readFileSync(jsonPath, "utf8"));
  const top = 780, bottom = 230;
  const vb = `0 ${-top} ${d.width} ${top + bottom}`;
  const width = Math.round((d.width / (top + bottom)) * height);
  const dots = d.dots
    .map((p) => `<rect x="${p.x.toFixed(0)}" y="${(-(p.y + p.s)).toFixed(0)}" width="${p.s.toFixed(0)}" height="${p.s.toFixed(0)}" style="fill:${signal}"/>`)
    .join("");
  return `<svg class="${cls}" viewBox="${vb}" width="${width}" height="${height}" role="img" aria-label="Digi World" focusable="false">${title ? "<title>Digi World</title>" : ""}<g transform="scale(1,-1)" style="fill:${ink}">${d.paths}</g>${dots}</svg>`;
}
