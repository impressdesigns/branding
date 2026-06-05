#!/usr/bin/env node
/**
 * Generate a root `index.html` that links to every asset under `source/`.
 *
 * The page is a plain list of links grouped by source subfolder. It is a
 * derived build artifact (it references the gitignored PNGs) and is NOT tracked
 * in git. Run `npm run build:index` after `npm run build:assets`.
 */
import { fileURLToPath } from "node:url";
import { dirname, join, relative, resolve } from "node:path";
import { readdir, writeFile } from "node:fs/promises";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(root, "source");
const outFile = join(root, "index.html");

// Only these extensions are treated as listable assets.
const ASSET_EXTENSIONS = new Set([".svg", ".png"]);

function isAsset(name) {
  const dot = name.lastIndexOf(".");
  return dot !== -1 && ASSET_EXTENSIONS.has(name.slice(dot).toLowerCase());
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Recursively collect asset files, grouped by their directory relative to root.
async function collectGroups(dir) {
  const groups = new Map();
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      for (const [key, files] of await collectGroups(full)) {
        groups.set(key, files);
      }
    } else if (entry.isFile() && isAsset(entry.name)) {
      const groupKey = relative(root, dir).split("\\").join("/");
      if (!groups.has(groupKey)) groups.set(groupKey, []);
      groups.get(groupKey).push(relative(root, full).split("\\").join("/"));
    }
  }
  return groups;
}

function renderHtml(groups) {
  const sections = [];
  let total = 0;
  for (const [groupKey, files] of groups) {
    const items = files
      .map((href) => {
        const safe = escapeHtml(href);
        return `      <li><a href="${safe}">${safe}</a></li>`;
      })
      .join("\n");
    sections.push(`    <h2>${escapeHtml(groupKey)}</h2>\n    <ul>\n${items}\n    </ul>`);
    total += files.length;
  }
  return {
    total,
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Impress Designs — Brand Assets</title>
  </head>
  <body>
    <h1>Impress Designs — Brand Assets</h1>
${sections.join("\n")}
  </body>
</html>
`,
  };
}

async function build() {
  const groups = await collectGroups(sourceDir);
  const { html, total } = renderHtml(groups);
  await writeFile(outFile, html);
  console.log(`\u2713 index.html \u2192 ${total} assets in ${groups.size} group(s)`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
