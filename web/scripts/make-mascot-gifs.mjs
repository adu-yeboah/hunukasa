/* Nsoromma GIF generatoranimated GIFs of the canonical SVG mascot for
 * the mobile app (web animates the vector directly via CSS).
 *
 * Each frame re-renders getStandaloneMascotSvg(mood, {animated:true}) with
 * the CSS animation styles swapped for static per-frame transforms, then
 * rasterizes via resvg and encodes with gifenc (shared 64-color palette +
 * transparent index, seamless loopevery oscillator completes an integer
 * number of cycles per GIF loop).
 *
 * Output: ../app/assets/mascots/mascot-{mood}.gif (240×240, transparent)
 *
 * Run from web/:  node --experimental-strip-types scripts/make-mascot-gifs.mjs
 */

import { writeFileSync, mkdirSync } from "node:fs";
import gifencPkg from "gifenc";
import { Resvg } from "@resvg/resvg-js";

const { GIFEncoder, quantize, applyPalette } = gifencPkg;
const { getStandaloneMascotSvg, MOODS } = await import("../lib/mascot-svg.ts");

const W = 240;
const TAU = Math.PI * 2;

/* per-mood motion parameters: body amplitude (px), frames, frame delay ms */
const MOTION = {
  idle: { body: "bob", amp: 7, frames: 24, delay: 80 },
  wave: { body: "bob", amp: 5, frames: 24, delay: 80 },
  cheer: { body: "bob", amp: 10, frames: 16, delay: 70 },
  think: { body: "sway", frames: 24, delay: 90 },
  sad: { body: "bob", amp: 3, frames: 20, delay: 90 },
  sleep: { body: "breathe", frames: 28, delay: 110 },
  listen: { body: "bob", amp: 3, frames: 20, delay: 80 },
  speak: { body: "bob", amp: 6, frames: 20, delay: 80 },
  point: { body: "bob", amp: 5, frames: 16, delay: 80 },
};

/* CSS-keyframe-shaped oscillators → static SVG attribute strings */
const bob = (amp, t) => `translate(0 ${(-amp * (0.5 - 0.5 * Math.cos(t * TAU))).toFixed(2)})`;
const rotate = (deg, t, cx, cy) => `rotate(${(deg * Math.sin(t * TAU)).toFixed(2)} ${cx} ${cy})`;
const scaleAround = (k, t, cx, cy) => {
  void k;
  const s = (1 + 0.03 * Math.sin(t * TAU)).toFixed(4);
  return `translate(${cx} ${cy}) scale(${s}) translate(-${cx} -${cy})`;
};
const pulseK = (t, ph) => 1 + 0.09 * Math.sin(t * TAU + ph);
const pulseO = (t, ph) => (0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * TAU + ph))).toFixed(2);

/* swap every injected CSS animation style for a static per-frame transform.
 * Groups without a transform-origin pulse via opacity (safe for sparkles
 * and ripplesthey must not scale about the viewBox origin). */
function frameSvg(mood, t) {
  const m = MOTION[mood];
  let armPhase = 0;
  let groupIdx = 0;

  let s = getStandaloneMascotSvg(mood, { animated: true });

  s = s.replace(/style="animation:([a-z-]+)[^;"]*(?:;transform-origin:([\d.]+)px ([\d.]+)px)?"/g, (_all, anim, ox, oy) => {
    const ph = (groupIdx++ * TAU) / 3;
    if (anim === "mascot-bob") {
      // origin 120/120 = the body group; smaller origins = accessories
      if (ox === "120") return `transform="${bob(m.amp ?? 0, t)}"`;
      return `transform="${bob(4, t + ph / TAU)}"`;
    }
    if (anim === "mascot-sway") return `transform="${rotate(3.5, t, 120, 120)}"`;
    if (anim === "mascot-breathe") return `transform="${scaleAround(0, t, 120, 122)}"`;
    if (anim === "mascot-pulse") {
      if (ox !== undefined) {
        // arms and confetti groups scale/rotate about their stated origin
        if (mood === "wave" && oy === "110") {
          const a = (9 * Math.sin(t * TAU)).toFixed(2);
          return `transform="rotate(${a} ${ox} ${oy})"`;
        }
        if (mood === "point" && oy === "120") {
          const a = (6 * Math.sin(t * TAU)).toFixed(2);
          return `transform="rotate(${a} ${ox} ${oy})"`;
        }
        const k = pulseK(t, ph).toFixed(3);
        return `transform="translate(${ox} ${oy}) scale(${k}) translate(-${ox} -${oy})"`;
      }
      return `opacity="${pulseO(t, ph)}"`;
    }
    return "";
  });

  // moods whose body has no CSS animation get a gentle bob injected directly
  if (!/style="animation:/.test(s) || m.body === "bob") {
    const opener = `<g id="nsoromma-${mood}"`;
    if (!/nsoromma-[a-z]+"[^>]*transform=/.test(s)) {
      if (m.body === "bob") s = s.replace(opener, `${opener} transform="${bob(m.amp, t)}"`);
    }
  }
  if (m.body === "sway" && !/nsoromma-[a-z]+"[^>]*transform=/.test(s)) {
    s = s.replace(`<g id="nsoromma-${mood}"`, `<g id="nsoromma-${mood}" transform="${rotate(3.5, t, 120, 120)}"`);
  }
  return s;
}

/* ── encode ── */
mkdirSync("../app/assets/mascots", { recursive: true });

for (const mood of MOODS) {
  const m = MOTION[mood];
  const gif = GIFEncoder();
  let palette = null;
  let tIdx = 0;

  for (let fi = 0; fi < m.frames; fi++) {
    const t = fi / m.frames;
    const svg = frameSvg(mood, t);
    const resvg = new Resvg(svg, { fitTo: { mode: "width", value: W } });
    const rendered = resvg.render();
    const rgba = rendered.pixels; // RGBA Uint8Array
    if (!palette) {
      // oneBitAlpha bins all sub-threshold alpha into a single transparent
      // palette entryrequired, or transparent pixels map to dark colors
      palette = quantize(rgba, 63, { format: "rgba4444", oneBitAlpha: true });
      tIdx = palette.findIndex((c) => c[3] === 0);
      if (tIdx === -1) throw new Error("no transparent palette entry produced");
    }
    const index = applyPalette(rgba, palette, "rgba4444");
    gif.writeFrame(index, rendered.width, rendered.height, {
      palette,
      delay: m.delay,
      repeat: fi === 0 ? 0 : undefined,
      transparent: true,
      transparentIndex: tIdx,
      dispose: 2,
    });
  }
  gif.finish();
  const out = `../app/assets/mascots/mascot-${mood}.gif`;
  writeFileSync(out, gif.bytes());
  console.log(`mascot-${mood}.gif  ${m.frames}f @ ${m.delay}ms  ${(gif.bytes().length / 1024).toFixed(1)} KB`);
}
console.log("done");
