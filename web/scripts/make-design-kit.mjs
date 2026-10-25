/* Generates public/hunukasa-design-kit.svga single drag-into-Figma file
   carrying the whole Hunukasa design language: palette, Nunito type scale,
   key-3d buttons, path nodes, the star mascot (vector!), kente patterns and
   the sun emblem. See FIGMA.md for the import workflow.

   Run from web/:  node scripts/make-design-kit.mjs
   (Figma ignores SVG <pattern>, so tiles are drawn explicitly.) */

import { writeFileSync } from "node:fs";

const C = {
  cream: "#F7EFDF",
  charcoal: "#2B211A",
  terracotta: "#B54B2E",
  gold: "#D9A441",
  indigo: "#1B3A6B",
  dark: "#171310",
  panel: "#221b15",
  locked: "#efe6d2",
};

const starPts = (rOut, rIn, cx, cy) =>
  Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? rOut : rIn;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

const sparkPts = (r, cx, cy) =>
  Array.from({ length: 8 }, (_, i) => {
    const rr = i % 2 === 0 ? r : r * 0.36;
    const a = -Math.PI / 2 + (i * Math.PI) / 4;
    return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

let s = "";
const esc = (t) => t.replace(/&/g, "and");
const label = (x, y, text, size = 15, fill = C.cream, weight = 900) =>
  `<text x="${x}" y="${y}" font-family="Nunito, Arial, sans-serif" font-weight="${weight}" font-size="${size}" fill="${fill}">${esc(text)}</text>`;
const board = (x, w, title) =>
  `<rect x="${x}" y="0" width="${w}" height="620" rx="18" fill="${C.dark}"/>` + label(x + 24, 44, title, 17, C.gold);

/* ── 1 · palette ── */
{
  const x0 = 0;
  s += board(x0, 780, "1 · Color Palette");
  const swatches = [
    ["Raw Cloth Cream", C.cream, "#2B211A"],
    ["Stamp Charcoal", C.charcoal, C.cream],
    ["Adinkra Terracotta", C.terracotta, "#fff"],
    ["Kente Gold", C.gold, C.charcoal],
    ["Kente Indigo", C.indigo, C.cream],
  ];
  swatches.forEach(([name, hex, txt], i) => {
    const x = x0 + 24 + i * 148;
    s += `<rect x="${x}" y="72" width="132" height="120" rx="14" fill="${hex}" stroke="${C.charcoal}" stroke-width="2"/>`;
    s += label(x, 216, name.split(" ").slice(-1)[0], 13, C.cream);
    s += label(x, 234, hex, 11, "rgba(247,239,223,0.5)", 600);
    void txt;
  });
  s += label(x0 + 24, 290, "Feedback:  correct #3e7d32 · correct text #2e5e24 · error surface #f8e3dd · disabled #c9bda3", 13, "rgba(247,239,223,0.55)", 600);
  s += label(x0 + 24, 312, "Surfaces:  cream #F7EFDF (cloth) · dark studio #171310 · panel #221b15 · indigo panels #1B3A6B", 13, "rgba(247,239,223,0.55)", 600);
}

/* ── 2 · type scale (Nunito) ── */
{
  const x0 = 800;
  s += board(x0, 560, "2 · TypeNunito");
  const rows = [
    ["Display 40 · Black", "Hunukasa", 40, 900, C.cream],
    ["H2 28 · Black", "Unit 1 · Akwaaba!", 28, 900, C.cream],
    ["H3 20 · Black", "Words to Review", 20, 900, C.cream],
    ["Body 16 · SemiBold", "Spaced repetition keeps words fresh.", 16, 600, C.cream],
    ["Label 11 · Black · caps", "CULTURAL CONTEXT", 11, 900, C.gold],
    ["Button 16 · Black · caps", "CHECK  ·  CONTINUE", 16, 900, C.gold],
  ];
  rows.forEach(([spec, sample, size, weight, fill], i) => {
    const y = 96 + i * 84;
    s += label(x0 + 24, y, String(spec), 11, "rgba(247,239,223,0.45)", 600);
    s += label(x0 + 24, y + 34, String(sample), Number(size), String(fill), Number(weight));
  });
}

/* ── 3 · key-3d buttons ── */
{
  const x0 = 1380;
  s += board(x0, 470, "3 · key-3d Buttons");
  const btn = (x, y, w, fill, text, txtFill, outline = false) => {
    let out = "";
    if (!outline) out += `<rect x="${x}" y="${y + 4}" width="${w}" height="56" rx="16" fill="${C.charcoal}"/>`;
    else out += `<rect x="${x}" y="${y + 4}" width="${w}" height="56" rx="16" fill="none" stroke="${fill}" stroke-opacity="0.4" stroke-width="2"/>`;
    out += `<rect x="${x}" y="${y}" width="${w}" height="56" rx="16" fill="${outline ? "none" : fill}" stroke="${fill}" stroke-width="2"/>`;
    out += `<text x="${x + w / 2}" y="${y + 35}" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="3" fill="${txtFill}">${esc(text)}</text>`;
    return out;
  };
  s += btn(x0 + 24, 80, 300, C.terracotta, "CHECK", "#fff");
  s += btn(x0 + 24, 160, 300, C.gold, "CONTINUE", C.charcoal);
  s += btn(x0 + 24, 240, 300, C.indigo, "START QUICK REVIEW", "#fff");
  s += btn(x0 + 24, 320, 300, C.terracotta, "GO PREMIUM · OUTLINE", C.terracotta, true);
  s += btn(x0 + 24, 400, 300, "#c9bda3", "DISABLED", C.charcoal);
  s += label(x0 + 24, 492, "2px charcoal border + solid 4px drop shadow;", 11, "rgba(247,239,223,0.45)", 600);
  s += label(x0 + 24, 510, "press = translateY(4px). Uppercase, 0.18em tracking.", 11, "rgba(247,239,223,0.45)", 600);
}

/* ── 4 · path nodes ── */
{
  const x0 = 1870;
  s += board(x0, 620, "4 · Path Nodes");
  const node = (x, y, fill, ring, inner) =>
    `<circle cx="${x}" cy="${y}" r="32" fill="${fill}" stroke="${C.charcoal}" stroke-width="2.5"/>` +
    `<circle cx="${x}" cy="${y + 5}" r="32" fill="none" stroke="${ring}" stroke-width="0"/>` +
    inner;
  const check = (x, y) => `<path d="M${x - 9} ${y} l6 7 l12 -14" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += node(x0 + 56, 130, C.terracotta, C.charcoal, check(x0 + 56, 130)) + label(x0 + 24, 196, "done", 12, "rgba(247,239,223,0.5)", 600);
  // active: indigo disc + star
  s += `<circle cx="${x0 + 164}" cy="125" r="42" fill="${C.gold}" opacity="0.35"/>`;
  s += node(x0 + 164, 130, C.indigo, C.charcoal, `<polygon points="${starPts(21, 10, x0 + 164, 130)}" fill="${C.gold}" stroke="${C.charcoal}" stroke-width="1"/>`);
  s += label(x0 + 130, 196, "active + halo", 12, "rgba(247,239,223,0.5)", 600);
  s += node(x0 + 272, 130, C.locked, "#c9bda3", `<rect x="${x0 + 264}" y="${126}" width="16" height="12" rx="2" fill="${C.charcoal}" opacity="0.6"/><path d="M${x0 + 268} 126 v-5 a4 4 0 0 1 8 0 v5" stroke="${C.charcoal}" stroke-width="2.5" fill="none" opacity="0.6"/>`);
  s += label(x0 + 244, 196, "locked", 12, "rgba(247,239,223,0.5)", 600);
  s += node(x0 + 380, 130, C.gold, C.charcoal, `<polygon points="${starPts(14, 6, x0 + 380, 130)}" fill="none" stroke="${C.charcoal}" stroke-width="2.5" />`);
  s += label(x0 + 344, 196, "checkpoint", 12, "rgba(247,239,223,0.5)", 600);
  // progress bars
  s += `<rect x="${x0 + 24}" y="240" width="380" height="16" rx="8" fill="#e6dcc6" stroke="${C.charcoal}" stroke-width="2"/><rect x="${x0 + 24}" y="240" width="95" height="16" rx="8" fill="${C.indigo}"/>`;
  s += `<rect x="${x0 + 24}" y="272" width="380" height="10" rx="5" fill="#e6dcc6" stroke="${C.charcoal}" stroke-width="1.5"/><rect x="${x0 + 24}" y="272" width="190" height="10" rx="5" fill="${C.gold}"/>`;
  // streak + xp pills
  s += `<rect x="${x0 + 24}" y="310" width="110" height="34" rx="17" fill="#fff" stroke="${C.gold}" stroke-width="2"/><text x="${x0 + 79}" y="332" text-anchor="middle" font-family="Nunito, Arial" font-weight="800" font-size="14" fill="${C.charcoal}">5</text>`;
  s += `<rect x="${x0 + 148}" y="310" width="110" height="34" rx="17" fill="#fff" stroke="${C.indigo}" stroke-width="2"/><text x="${x0 + 203}" y="332" text-anchor="middle" font-family="Nunito, Arial" font-weight="800" font-size="14" fill="${C.indigo}">120</text>`;
  // section banner
  s += `<rect x="${x0 + 24}" y="376" width="380" height="58" rx="14" fill="${C.indigo}" stroke="${C.charcoal}" stroke-width="2"/>`;
  s += `<rect x="${x0 + 16}" y="${384 + 0}" width="0" height="0"/>`;
  s += label(x0 + 40, 400, "Section 2 · Everyday Life", 15, C.gold);
  s += label(x0 + 40, 421, "Asetena mu nsɛm · home, food & health", 11, C.cream, 600);
  s += label(x0 + 24, 486, "Blue stitch path: gold dashes 2-14 on charcoal 18% underlay,", 11, "rgba(247,239,223,0.45)", 600);
  s += label(x0 + 24, 504, "10px round line + 4px dash line, vertical bezier weave.", 11, "rgba(247,239,223,0.45)", 600);
}

/* ── 5 · mascot (vector) ── */
{
  const x0 = 2510;
  s += board(x0, 430, "5 · Star Mascot");
  const mascot = (cx, cy, scale, mood) => {
    let g = `<g transform="translate(${cx} ${cy}) scale(${scale})">`;
    g += `<polygon points="${starPts(88, 41, 0, 0)}" fill="${C.gold}" stroke="${C.charcoal}" stroke-width="3"/>`;
    // face
    if (mood === "happy") {
      g += `<path d="M -22 -6 a 6.5 6.5 0 0 1 12 0" stroke="${C.charcoal}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
      g += `<path d="M 10 -6 a 6.5 6.5 0 0 1 12 0" stroke="${C.charcoal}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
      g += `<path d="M -10 10 a 11 9 0 0 0 20 0 z" fill="${C.charcoal}"/>`;
      g += `<path d="M -4 16 a 6 3.5 0 0 0 8 0 z" fill="${C.blush || "#D6785C"}"/>`;
    } else {
      g += `<ellipse cx="-16" cy="-8" rx="7" ry="7" fill="${C.charcoal}"/>`;
      g += `<ellipse cx="16" cy="-8" rx="7" ry="7" fill="${C.charcoal}"/>`;
      g += `<ellipse cx="-18.5" cy="-10.5" rx="2.4" ry="2.4" fill="${C.cream}"/>`;
      g += `<ellipse cx="13.5" cy="-10.5" rx="2.4" ry="2.4" fill="${C.cream}"/>`;
      g += `<path d="M -16 18 a 16 16 0 0 0 32 0" stroke="${C.charcoal}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    }
    g += `<circle cx="-31" cy="10" r="5.5" fill="#D6785C"/><circle cx="31" cy="10" r="5.5" fill="#D6785C"/>`;
    if (mood === "wave") g += `<polygon points="${sparkPts(9, 78, -50)}" fill="${C.cream}"/>`;
    if (mood === "cheer") {
      g += `<polygon points="${sparkPts(9, 86, -52)}" fill="${C.cream}"/>`;
      g += `<polygon points="${sparkPts(7, -88, -8)}" fill="${C.cream}"/>`;
      g += `<polygon points="${sparkPts(6, 58, -78)}" fill="${C.cream}"/>`;
    }
    g += "</g>";
    return g;
  };
  s += mascot(x0 + 70, 170, 0.62, "smile") + label(x0 + 30, 250, "idle", 12, "rgba(247,239,223,0.5)", 600);
  s += mascot(x0 + 210, 170, 0.62, "wave") + label(x0 + 176, 250, "wave", 12, "rgba(247,239,223,0.5)", 600);
  s += mascot(x0 + 350, 170, 0.62, "cheer") + label(x0 + 312, 250, "cheer", 12, "rgba(247,239,223,0.5)", 600);
  s += label(x0 + 24, 310, "9 animated moods ship as GIFs (idle wave cheer think sad", 11, "rgba(247,239,223,0.45)", 600);
  s += label(x0 + 24, 328, "sleep listen speak point). Edit them in the Mascot Studio", 11, "rgba(247,239,223,0.45)", 600);
  s += label(x0 + 24, 346, "at the /mascot gallery.", 11, "rgba(247,239,223,0.45)", 600);
  s += label(x0 + 24, 380, "Vector here is for Figma stylingkeep GIF exports in sync.", 11, "rgba(247,239,223,0.45)", 600);
}

/* ── 6 · patterns (explicit tilesFigma ignores SVG <pattern>) ── */
{
  const x0 = 2960;
  s += board(x0, 460, "6 · Kente Patterns");
  const kenteTile = (x, y, col) =>
    `<g transform="translate(${x} ${y})">` +
    `<path d="M0 24 L24 0 L48 24 L24 48 Z" fill="none" stroke="${col}" stroke-width="2"/>` +
    `<path d="M12 24 L24 12 L36 24 L24 36 Z" fill="${col}"/>` +
    `<circle cx="24" cy="24" r="3" fill="none" stroke="${col}" stroke-width="2"/></g>`;
  const geoTile = (x, y, col) =>
    `<g transform="translate(${x} ${y})">` +
    `<path d="M0 30 L30 0 L60 30 L30 60 Z" fill="none" stroke="${col}" stroke-width="2"/>` +
    `<path d="M15 30 L30 15 L45 30 L30 45 Z" fill="${col}" fill-opacity="0.3"/>` +
    `<rect x="25" y="25" width="10" height="10" fill="${col}"/></g>`;
  s += `<rect x="${x0 + 24}" y="80" width="192" height="144" rx="12" fill="${C.indigo}"/>`;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) s += kenteTile(x0 + 24 + c * 48, 80 + r * 48, C.gold);
  s += `<rect x="${x0 + 240}" y="80" width="192" height="144" rx="12" fill="${C.indigo}"/>`;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) s += kenteTile(x0 + 240 + c * 48, 80 + r * 48, C.cream);
  s += `<rect x="${x0 + 24}" y="248" width="192" height="144" rx="12" fill="${C.cream}"/>`;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) s += geoTile(x0 + 24 + c * 48, 248 + r * 48, C.charcoal);
  s += label(x0 + 24, 424, "48px kente diamond (gold / cream on indigo) · 60px kente geo", 11, "rgba(247,239,223,0.45)", 600);
  s += label(x0 + 24, 442, "(charcoal on cream). Opacity in-app: 10% / 8%.", 11, "rgba(247,239,223,0.45)", 600);
}

/* ── 7 · sun emblem ── */
{
  const x0 = 3440;
  s += board(x0, 260, "7 · Sun Emblem");
  const cx = x0 + 110, cy = 190;
  s += `<g opacity="0.85"><circle cx="${cx}" cy="${cy}" r="64" fill="none" stroke="${C.gold}" stroke-width="13" stroke-dasharray="19 10"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="32" fill="${C.gold}"/>`;
  s += `<rect x="${cx - 6}" y="${cy - 100}" width="13" height="200" fill="${C.gold}"/>`;
  s += `<rect x="${cx - 100}" y="${cy - 6}" width="200" height="13" fill="${C.gold}"/></g>`;
  s += label(x0 + 200, 140, "dashed sun ring + cross,", 11, "rgba(247,239,223,0.45)", 600);
  s += label(x0 + 200, 158, "spins 42s behind the hero.", 11, "rgba(247,239,223,0.45)", 600);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="3720" height="620" viewBox="0 0 3720 620">
<title>Hunukasa Design Kit</title>
<desc>Palette, Nunito type scale, key-3d buttons, path nodes, star mascot, kente patterns, sun emblem. Companion: FIGMA.md</desc>
${s}
</svg>`;

writeFileSync(new URL("../public/hunukasa-design-kit.svg", import.meta.url), svg);
console.log(`hunukasa-design-kit.svg: ${(svg.length / 1024).toFixed(1)} KB`);
