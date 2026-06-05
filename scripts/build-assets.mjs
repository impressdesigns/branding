#!/usr/bin/env node
/**
 * Rasterize the PNGs from their canonical SVG sources.
 *
 * SVGs are the source of truth; the PNGs below are derived build artifacts and
 * are NOT tracked in git (see .gitignore). Run `npm run build:logos` locally or
 * rely on the CI workflow to produce them.
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
// source aspect ratio.
const targets = [
  { dir: iconsDir, src: "icon.svg", out: "icon-512.png", width: 512, height: 512 },
  { dir: iconsDir, src: "icon.svg", out: "icon-192.png", width: 192, height: 192 },
  { dir: iconsDir, src: "icon.svg", out: "icon-180.png", width: 180, height: 180 },
  { dir: iconsDir, src: "icon.svg", out: "favicon-32.png", width: 32, height: 32 },
  { dir: logosDir, src: "logo-full-blue.svg", out: "logo-primary.png", width: 491 },
  { dir: logosDir, src: "logo-full-dark.svg", out: "logo-full-dark.png", width: 491 },
  { dir: logosDir, src: "logo-full-dark-alt.svg", out: "logo-full-dark-alt.png", width: 491 },
  { dir: logosDir, src: "logo-full-white.svg", out: "logo-full-white.png", width: 491 },
];

// High render density so the SVG is rasterized above the largest target size,
// then downscaled for crisp edges.
const DENSITY = 1200;

async function build() {
  for (const target of targets) {
    const svg = await readFile(join(target.dir, target.src));
    await sharp(svg, { density: DENSITY })
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
