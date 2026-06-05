# Impress Designs — Design System

> **the promotional solutions provider** — *since 1977*

Impress Designs (impressdesigns.com) is a full-service **promotional products & branded
apparel** company. They help organizations put their logo on the physical world:
custom screen-printed and embroidered apparel, headwear, drinkware, bags, signage,
trade-show gear and promotional merchandise — sourced, decorated and fulfilled. The
brand is corporate, dependable and craft-oriented: a four-decade Midwest print/embroidery
house that talks in plain, confident, service-first language.

This is the company branding specification: the canonical brand identity, design tokens
and official assets (logos, fonts, colors) so any team or agent can produce on-brand
interfaces, mockups, slides and assets.

---

## Source materials

Everything here was reverse-engineered from the brand assets the client provided
(no codebase or Figma was supplied — see **Caveats** at the bottom):

- **`assets/brand-guide.png`** — the official 1-page brand guide (ID 116705): logo
  lockups, icon variants, color chips, taglines and font specimens.
- **Logos** (`assets/logos/`) — primary horizontal lockup, blue / dark / white / gradient
  variants, and the standalone "jersey neck" icon mark in SVG + PNG (full favicon set).
- **Fonts** (`assets/fonts/`) — **Orkney** (Light/Regular/Medium/Bold) and **Freestyle
  Script** (Regular), the two typefaces named in the brand guide.
- **Color spec** — Pantone 7687 blue, true black ("AutoCAD Color"), Cool Gray 8C, white,
  with HEX/RGB/CMYK values transcribed into `tokens/colors.css`.

---

## The mark

The icon is a stylized **jersey / shirt neckline** that simultaneously reads as a serif
**"T"** (and echoes the "I" of Impress) inside a soft-cornered square — a direct nod to
the apparel-decoration core of the business. It always sits to the **left** of the
wordmark. The wordmark sets **IMPRESS** in solid Orkney caps with a small ® and
**D E S I G N S** beneath it in widely letter-spaced caps. That wide DESIGNS tracking is
the single most recognizable typographic move in the brand — reuse it for eyebrows and
section labels.

Lockups available: full-color blue, all-dark (black), all-white (knockout), and a subtle
vertical blue **gradient** treatment for digital/Office365 contexts.

---

## CONTENT FUNDAMENTALS

How Impress Designs writes:

- **Tone:** plain-spoken, confident, service-led. They are the helpful vendor who has
  done this since 1977 — reassuring, not flashy. No hype, no exclamation-mark spam.
- **Tagline:** *"the promotional solutions provider"* — always **lowercase**, often
  trailed by *"since 1977"*. This is the brand's signature line; render it in **Freestyle
  Script** when used as a flourish, or in Orkney lowercase when used as plain body.
- **Casing:** The wordmark is uppercase (IMPRESS / DESIGNS). Headlines are typically
  **Title Case** or sentence case; the tagline and supporting copy stay **lowercase /
  sentence case**. Reserve all-caps for short eyebrows and labels with wide tracking.
- **Voice / person:** Speaks to the customer as **"you"**, refers to itself as **"we"**
  ("we decorate it", "let us quote your project"). Warm but professional B2B register.
- **Vocabulary:** industry-correct and concrete — *screen printing, embroidery, promotional
  products, decoration, apparel, headwear, drinkware, fulfillment, branded merchandise,
  quote, art proof, minimums, turnaround*. Avoid startup jargon.
- **Numbers & proof:** leans on heritage ("since 1977", decades of experience) and
  service breadth rather than vanity metrics. Don't invent stats.
- **Emoji:** **none.** The brand is corporate; do not use emoji. Use the icon mark or
  simple line icons instead.
- **Example phrases:** "the promotional solutions provider", "since 1977", "Request a
  quote", "Browse products", "Your logo, beautifully decorated."

---

## VISUAL FOUNDATIONS

- **Color:** A disciplined, monochromatic-blue identity. **Pantone 7687 (`#264583`)** is
  the hero and does almost all the work — it's a deep, slightly muted navy-royal blue.
  **True black** and **Cool Gray 8C (`#888B8D`)** support it; **white** is the dominant
  ground. There are no secondary brand hues — color variety comes from tints/shades of the
  one blue and the cool-gray neutral ramp (`tokens/colors.css`). Status colors exist but
  are muted and kept in-family. The overall vibe is **clean, corporate, trustworthy, cool**.
- **Type:** **Orkney** everywhere — a geometric humanist sans with friendly round
  counters; it carries both display and body. Weights used: Light/Regular/Medium/Bold.
  **Freestyle Script** is an accent only, exclusively for the handwritten tagline flourish.
  The defining typographic motif is **wide-tracked uppercase** (the DESIGNS lockup) used
  for eyebrows and labels.
- **Backgrounds:** predominantly **flat white** or very light cool-gray (`--bg-subtle`).
  Brand blue is used as a confident **solid fill** for headers, hero bands and CTAs — the
  brand guide literally shows the logo on white / solid-blue / solid-black bands. The one
  sanctioned gradient is a **subtle vertical blue gradient** on the icon (digital contexts).
  No photographic texture, no noise/grain, no busy patterns. When apparel photography is
  used, it should be **clean, well-lit, neutral/cool** product shots on white.
- **Corners & cards:** soft but restrained — the mark's square has ~22% rounding, so cards
  use `--radius-lg`/`--radius-xl` (12–18px). Cards are **white, hairline cool-gray border,
  quiet low shadow** (`--shadow-sm`/`--shadow-md`); not heavily floating, not flat.
- **Borders:** 1px cool-gray hairlines (`--border-subtle`/`--border-default`) are the
  default separator; 2px brand-blue for emphasis/active states.
- **Shadows:** quiet, **cool-gray tinted**, low spread (never warm, never large blur).
  Elevation is communicated subtly. A `--shadow-brand` (blue-tinted) is reserved for
  primary CTAs / brand moments.
- **Hover states:** primary actions **darken** (blue-600 → blue-700/800). Ghost/secondary
  fill with `--blue-50`. Links darken + underline. Cards lift one shadow step.
- **Press states:** darken further (active) plus a subtle inset; no playful scale/bounce —
  the brand is composed, so keep motion minimal.
- **Motion:** brisk and direct. Short durations (120–280ms), standard/out easing
  (`--ease-standard`, `--ease-out`). Fades and small translates; **no bounce, no spin,
  no decorative looping**. Respect `prefers-reduced-motion`.
- **Transparency / blur:** sparingly. Light scrims over imagery, optional subtle backdrop
  blur on sticky headers. Not a glassmorphism brand.
- **Layout:** generous white space, clear hierarchy, content max-width ~1200px. Sticky
  white header with the horizontal lockup at left. Grid-based product layouts.

---

## ICONOGRAPHY

- **Brand mark:** the **jersey-neck "T" icon** is the primary brand glyph. It lives in
  `assets/logos/icon.svg` (+ a full PNG favicon set 16→512, apple-touch, mstile). Use it
  as the app/site favicon, avatar, loader and bug. Available in blue, dark, white and a
  subtle vertical-gradient PNG (`logo-gradient.png`).
- **UI icons:** the brand guide specifies **no proprietary UI icon set**. For interface
  iconography, **[Lucide](https://lucide.dev)** (1.75–2px stroke, rounded joins) is the
  recommended default — its clean, even-weight geometric line style pairs naturally with
  Orkney's humanist-geometric forms. **⚠️ This is a substitution** (no icon set was
  provided); swap for the brand's real set if one exists.
- **Style rules:** line icons, ~2px stroke, rounded caps/joins, drawn in `currentColor`
  so they inherit `--text-*`. Brand blue for active/selected, cool-gray for default.
  Keep icons functional and quiet — match Orkney's calm geometry.
- **Emoji / unicode:** not used as iconography. Stick to Lucide + the brand mark.

---

## Index / manifest

**Root**
- `styles.css` — import-only entry point (link this); pulls in all token files.
- `README.md` — this guide.

**`tokens/`** — `fonts.css` · `colors.css` · `typography.css` · `spacing.css`

**`assets/`** — `fonts/` (Orkney ×4, Freestyle Script) · `logos/` (lockups + icon + favicons)
· `brand-guide.png`

---

## Caveats

- Logos, fonts and colors **are** the client's real assets, transcribed from the official
  brand guide.
- **Lucide** icons are a documented substitution for an unspecified UI icon set.
- Fonts are the real provided files (Orkney, Freestyle Script) — no substitution needed.
