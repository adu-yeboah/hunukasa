/* Hunukasa app icon generatorrenders Nsoromma (the canonical SVG mascot
 * from lib/mascot-svg.ts) into every platform asset via @resvg/resvg-js.
 *
 * Outputs (filenames match app.json wiring):
 *   ../app/assets/images/icon.png                      1024 opaque  (store / iOS)
 *   ../app/assets/images/android-icon-foreground.png   1024 transparent (adaptive safe zone)
 *   ../app/assets/images/android-icon-background.png   1024 indigo kente field
 *   ../app/assets/images/android-icon-monochrome.png   1024 white silhouette (themed icons)
 *   ../app/assets/images/splash-icon.png               1024 transparent (wave, on cream splash)
 *   ../web/app/icon.png                                 256 opaque (Next.js favicon)
 *
 * Run from web/:  node --experimental-strip-types scripts/make-icons.mjs
 * (requires Node ≥ 23.6 for native TS type stripping)
 */

import { writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";

const { getStandaloneMascotSvg } = await import("../lib/mascot-svg.ts");

const INDIGO = "#1B3A6B";
const GOLD = "#D9A441";

/* faint kente diamond weave for the indigo field (explicit tiles) */
function kenteField(opacity = 0.1) {
  let tiles = "";
  for (let gy = 0; gy < 6; gy++) {
    for (let gx = 0; gx < 6; gx++) {
      const cx = gx * 40 + 20;
      const cy = gy * 40 + 20;
      tiles += `<path d="M ${cx} ${cy - 12} L ${cx + 12} ${cy} L ${cx} ${cy + 12} L ${cx - 12} ${cy} Z" fill="${GOLD}" opacity="${opacity}"/>`;
      tiles += `<circle cx="${cx}" cy="${cy}" r="2.6" fill="${GOLD}" opacity="${opacity + 0.02}"/>`;
    }
  }
  return tiles;
}

/* inner SVG of a mood, optionally recolored for the themed-icon layer:
 * everything becomes white, the charcoal ink (outline/face) becomes fully
 * transparent so the silhouette reads with knocked-out eyes and mouth */
function mascotInner(mood, mono = false) {
  const svg = getStandaloneMascotSvg(mood);
  let inner = svg.slice(svg.indexOf(">") + 1, svg.lastIndexOf("</svg>"));
  if (mono) {
    inner = inner
      .replaceAll("#D9A441", "#FFFFFF")
      .replaceAll("#C48D30", "#FFFFFF")
      .replaceAll("#E5B34B", "#FFFFFF")
      .replaceAll("#B54B2E", "#FFFFFF")
      .replaceAll("#F7EFDF", "#FFFFFF")
      .replaceAll("#2B211A", "#FFFFFF00");
  }
  return inner;
}

/* wrap mascot content in a 240 viewBox with center/scale transform */
function composed({ mood, mono = false, scale = 1, bg = false, cx = 120, cy = 122 }) {
  const bgRect = bg ? `<rect width="240" height="240" fill="${INDIGO}"/>${kenteField()}` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
${bgRect}<g transform="translate(${cx} ${cy}) scale(${scale}) translate(-120 -120)">${mascotInner(mood, mono)}</g>
</svg>`;
}

function renderPng(path, svg, size) {
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: size } });
  const png = resvg.render().asPng();
  writeFileSync(path, png);
  console.log(`${path.replace("../", "hunukasa/").replace("./", "web/")}  ${(png.length / 1024).toFixed(1)} KB`);
}

/* ── generate the set ── */
const appImg = "../app/assets/images";

// main icon: Nsoromma idle on the indigo kente field
renderPng(`${appImg}/icon.png`, composed({ mood: "idle", scale: 0.84, bg: true, cy: 124 }), 1024);
renderPng("./app/icon.png", composed({ mood: "idle", scale: 0.84, bg: true, cy: 124 }), 256);

// adaptive foreground: character alone, inside the safe zone
renderPng(`${appImg}/android-icon-foreground.png`, composed({ mood: "idle", scale: 0.8 }), 1024);

// adaptive background: indigo kente field alone
renderPng(`${appImg}/android-icon-background.png`, composed({ mood: "idle", scale: 0.001, bg: true }), 1024);

// Android 13+ themed icon: flat white silhouette
renderPng(`${appImg}/android-icon-monochrome.png`, composed({ mood: "idle", mono: true, scale: 0.8 }), 1024);

// splash: welcoming wave on transparent (cream splash background)
renderPng(`${appImg}/splash-icon.png`, composed({ mood: "wave", scale: 1, cy: 120 }), 1024);

console.log("done");
