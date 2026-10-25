/* Throwaway probe: verify mascot GIF transparency at the pixel level.
 * Parses header/GCE, decodes frame 0 via GIF LZW, reports how many pixels
 * map to the transparent index. Run: node probe-gif.mjs <file.gif>
 */
import { readFileSync } from "node:fs";

function probe(path) {
  const b = readFileSync(path);
  if (b.toString("ascii", 0, 6) !== "GIF89a") throw new Error("not GIF89a");
  let p = 6;
  const W = b.readUInt16LE(p), H = b.readUInt16LE(p + 2);
  const packed = b[p + 4];
  p += 7;
  const gctSize = packed & 0x80 ? 2 ** ((packed & 7) + 1) : 0;
  const gct = [];
  for (let i = 0; i < gctSize; i++) gct.push([b[p + i * 3], b[p + i * 3 + 1], b[p + i * 3 + 2]]);
  p += gctSize * 3;

  let transparentIndex = -1;
  // scan blocks
  while (p < b.length) {
    const kind = b[p];
    if (kind === 0x3b) break;
    if (kind === 0x21) {
      const label = b[p + 1];
      if (label === 0xf9) {
        // GCE: 21 F9 04 packed delay(2) tIdx 00
        const gPacked = b[p + 3];
        if (gPacked & 1) transparentIndex = b[p + 6];
      }
      p += 2;
      while (b[p] !== 0) p += b[p] + 1;
      p += 1;
    } else if (kind === 0x2c) {
      // image descriptor
      const iw = b.readUInt16LE(p + 5), ih = b.readUInt16LE(p + 7);
      const iPacked = b[p + 9];
      p += 10;
      if (iPacked & 0x80) {
        const lctSize = 2 ** ((iPacked & 7) + 1);
        p += lctSize * 3;
      }
      const minCode = b[p];
      p += 1;
      // gather LZW data sub-blocks
      const data = [];
      while (b[p] !== 0) {
        const len = b[p];
        for (let i = 0; i < len; i++) data.push(b[p + 1 + i]);
        p += len + 1;
      }
      p += 1;
      const indices = lzwDecode(data, minCode, iw * ih);
      const bgCount = indices.filter((i) => i === transparentIndex).length;
      const pct = ((bgCount / indices.length) * 100).toFixed(1);
      console.log(`${path}: ${W}x${H} | GCE transparent=${transparentIndex !== -1} idx=${transparentIndex} | palette[${transparentIndex}]=${JSON.stringify(gct[transparentIndex] ?? null)} | frame0 ${iw}x${ih} | transparent pixels: ${bgCount}/${indices.length} (${pct}%)`);
      const corners = [0, iw - 1, indices.length - iw, indices.length - 1].map((i) => indices[i]);
      console.log(`  corner pixel indices: ${corners.join(",")} (all should equal ${transparentIndex})`);
      return;
    } else {
      throw new Error(`unexpected block 0x${kind.toString(16)} at ${p}`);
    }
  }
}

function lzwDecode(data, minCode, expected) {
  const clear = 1 << minCode;
  const eoi = clear + 1;
  let codeSize = minCode + 1;
  let dict = [];
  const reset = () => {
    dict = [];
    for (let i = 0; i < clear; i++) dict.push([i]);
    dict.push(null); // clear
    dict.push(null); // eoi
    codeSize = minCode + 1;
  };
  reset();
  const out = [];
  let bitPos = 0, prev = null;
  const readCode = () => {
    let code = 0;
    for (let i = 0; i < codeSize; i++) {
      const byte = data[(bitPos >> 3) | 0];
      const bit = (byte >> (bitPos & 7)) & 1;
      code |= bit << i;
      bitPos++;
    }
    return code;
  };
  while (out.length < expected && bitPos < data.length * 8) {
    const code = readCode();
    if (code === clear) { reset(); prev = null; continue; }
    if (code === eoi) break;
    let entry;
    if (code < dict.length && dict[code] !== null) {
      entry = dict[code];
    } else if (prev !== null) {
      entry = [...prev, prev[0]];
    } else break;
    for (const px of entry) out.push(px);
    if (prev !== null) {
      dict.push([...prev, entry[0]]);
      if (dict.length === 1 << codeSize && codeSize < 12) codeSize++;
    }
    prev = entry;
  }
  return out;
}

probe(process.argv[2]);
