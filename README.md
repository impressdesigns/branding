# Branding

Static branding assets for Impress Designs (logos, icons, favicons).

## Layout

- `source/` — checked-in **SVG sources** (the source of truth) plus the generated
  PNGs and `index.html`.
- The PNGs and `index.html` are **build artifacts** and are not tracked in git
  (see `.gitignore`); CI regenerates and publishes them to GitHub Pages.

## Logos

The full logo lockup lives in a single `source/logos/logo-full.svg`. Its paths
are tagged with semantic classes — `background` (rounded square), `monogram`
(the "ID" mark), and `wordmark` (the text + ®) — and a default `<style>` block
renders the full-color version when the file is viewed directly.

Color variants are produced at build time rather than as separate files:
`scripts/build-assets.mjs` swaps that `<style>` block per target (see the
`colors` map), so e.g. the white variant recolors every layer to white and sets
`background` to `none` to drop the square. The single-color primary logo
(`logo-full-blue.svg`) is kept as its own file.

## Build

```sh
npm install
npm run build        # build:assets (PNGs) + build:index (index.html)
```

`npm run build:assets` rasterizes the PNGs with [sharp](https://sharp.pixelplumbing.com/);
`npm run build:index` regenerates `source/index.html` linking every asset.
