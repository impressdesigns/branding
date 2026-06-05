#!/usr/bin/env node
/**
 * Rasterize the PNGs from their canonical SVG sources.
 *
 * SVGs are the source of truth; the PNGs below are derived build artifacts and
 * are NOT tracked in git (see .gitignore). Run `npm run build:assets` locally or
 * rely on the CI workflow to produce them.
 *
 * The full logo lockup ships as a single `logo-full.svg` whose paths are tagged
 * with semantic classes (`background`, `monogram`, `wordmark`). Each color
 * variant is produced by swapping that SVG's <style> block at build time via the
 * per-target `colors` map below, so we keep one source of truth instead of one
 * SVG per color.
 */
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { readFile } from "node:fs/promises";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const iconsDir = join(root, "source", "icons");
const logosDir = join(root, "source", "logos");

// Each target maps a source SVG to a PNG output within a given directory.
// Square icons set both width & height; lockups set width and keep the
// source aspect ratio. A `colors` map (class name -> fill) recolors the source
// SVG before rasterizing; `none` hides a layer (e.g. the white variant drops
// the background square).
const targets = [
  { dir: iconsDir, src: "icon.svg", out: "icon-512.png", width: 512, height: 512 },
  { dir: iconsDir, src: "icon.svg", out: "icon-192.png", width: 192, height: 192 },
  { dir: iconsDir, src: "icon.svg", out: "icon-180.png", width: 180, height: 180 },
  { dir: iconsDir, src: "icon.svg", out: "favicon-32.png", width: 32, height: 32 },
  { dir: logosDir, src: "logo-full-blue.svg", out: "logo-primary.png", width: 491 },
  {
    dir: logosDir,
    src: "logo-full.svg",
    out: "logo-full-dark.png",
    width: 491,
    colors: { background: "#2b4287", monogram: "#ffffff", wordmark: "#2b4287" },
  },
  {
    dir: logosDir,
    src: "logo-full.svg",
    out: "logo-full-white.png",
    width: 491,
    colors: { background: "none", monogram: "#ffffff", wordmark: "#ffffff" },
  },
];

// Replace the SVG's <style> block with target-specific fills. Swapping (rather
// than appending) the block keeps CSS source order irrelevant.
function applyColors(svg, colors) {
  const rules = Object.entries(colors)
    .map(([cls, fill]) => `    .${cls} { fill: ${fill}; }`)
    .join("\n");
  return svg.replace(/<style[^>]*>[\s\S]*?<\/style>/, `<style>\n${rules}\n  </style>`);
}

// High render density so the SVG is rasterized above the largest target size,
// then downscaled for crisp edges.
const DENSITY = 1200;

async function build() {
  for (const target of targets) {
    let svg = await readFile(join(target.dir, target.src), "utf8");
    if (target.colors) svg = applyColors(svg, target.colors);
    await sharp(Buffer.from(svg), { density: DENSITY })
      .resize({
        width: target.width,
        height: target.height,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ compressionLevel: 9 })
      .toFile(join(target.dir, target.out));
    console.log(`\u2713 ${target.src} \u2192 ${target.out}`);
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
