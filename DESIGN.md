---
name: Kike Dev's — The Live Workstation
description: A developer's macOS workstation shown running — the craft proven by live terminals, not described.
colors:
  onyx-900: "#050607"
  onyx-850: "#070809"
  onyx-800: "#0a0c0e"
  onyx-750: "#0d1013"
  onyx-700: "#121619"
  onyx-600: "#1a2024"
  onyx-500: "#232b30"
  emerald-050: "#d6ffe9"
  emerald-100: "#8bffc4"
  emerald-200: "#4dffa6"
  emerald-300: "#00ff88"
  emerald-400: "#00e676"
  emerald-500: "#00c853"
  emerald-600: "#0b9e4e"
  emerald-700: "#0a6b3e"
  emerald-800: "#0a3b24"
  emerald-900: "#072318"
  ink-100: "#eef3f1"
  ink-200: "#d4ded9"
  ink-300: "#a7b6b0"
  ink-400: "#8a9992"
  ink-500: "#7d8c86"
  ink-600: "#727f79"
  syn-prompt: "#00ff88"
  syn-str: "#e5b769"
  syn-key: "#8aa2ff"
  syn-fn: "#5fd4d0"
  syn-num: "#e88c6a"
  syn-comment: "#7d8c86"
  syn-ok: "#00ff88"
  syn-warn: "#e5b769"
  mac-red: "#ec6a5e"
  mac-amber: "#f4bf4f"
  mac-green: "#61c554"
  hairline: "rgba(167, 182, 176, 0.09)"
  hairline-strong: "rgba(167, 182, 176, 0.16)"
  glow-line: "rgba(0, 255, 136, 0.14)"
typography:
  display:
    fontFamily: "Geist Sans, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.4rem, 6.4vw, 4.8rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist Sans, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.1rem, 5.2vw, 3.8rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist Sans, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.4rem, 2.6vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist Sans, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  mono:
    fontFamily: "Geist Mono, 'JetBrains Mono', ui-monospace, monospace"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0.01em"
  label:
    fontFamily: "Geist Mono, 'JetBrains Mono', ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "22px"
spacing:
  2xs: "0.5rem"
  xs: "0.75rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
  2xl: "6rem"
  3xl: "9rem"
components:
  button-primary:
    backgroundColor: "{colors.emerald-300}"
    textColor: "{colors.onyx-900}"
    rounded: "{rounded.sm}"
    padding: "0.9rem 1.6rem"
  button-primary-hover:
    backgroundColor: "{colors.emerald-300}"
    textColor: "{colors.onyx-900}"
  button-ghost:
    backgroundColor: "rgba(255, 255, 255, 0.015)"
    textColor: "{colors.ink-200}"
    rounded: "{rounded.sm}"
    padding: "0.9rem 1.6rem"
  button-ghost-hover:
    textColor: "{colors.emerald-100}"
  input:
    backgroundColor: "{colors.onyx-900}"
    textColor: "{colors.ink-100}"
    typography: "{typography.mono}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1rem"
  chip-dep:
    backgroundColor: "rgba(255, 255, 255, 0.015)"
    textColor: "{colors.ink-300}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.4rem 0.75rem"
  card-repo:
    backgroundColor: "{colors.onyx-750}"
    textColor: "{colors.ink-200}"
    rounded: "{rounded.lg}"
    padding: "clamp(1.4rem, 3vw, 2.2rem)"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-300}"
    padding: "0.3rem 0"
---

# Design System: Kike Dev's — The Live Workstation

## Overview

**Creative North Star: "The Live Workstation"**

The site *is* a developer's workstation, running. Rather than claiming skill with a headline over stock imagery, it proves the craft by showing the work execute: a looping macOS terminal types, builds, tests, and deploys in the hero; projects are presented as repo windows with branch paths and production status dots; skills are instrument gauges; the contact form is itself a terminal. The world refuses two clichés at once — the generic agency hero and the crude saturated-green "Matrix" terminal — and replaces them with a precise, premium, production-grade feel.

The personality is dark, exact, and alive. Deep layered onyx grounds (near-black with a cool green cast) recede behind content; a single disciplined emerald (#00ff88) is the signal — prompts, cursors, success states, and the one true action — never a fill-everything neon. Syntax color is a muted luxury palette (warm gold strings, periwinkle keywords, soft-cyan functions, warm-coral numbers, muted comments), so code reads rich rather than garish. Depth is physical: real soft shadows plus backdrop-blurred "vibrancy" on window chrome, glass panels, and the fixed header. Motion is load-bearing — the typed terminal stream, a cursor-tracked emerald spotlight that rims the terminal window, drifting particles with faint links, scroll reveals, gauge fills, and count-up metrics — and every effect degrades fully under `prefers-reduced-motion`.

Typography is a two-family system: Geist Sans carries display and body (tight, modern, negative tracking), and Geist Mono carries everything terminal — code, labels, measurements, section indices, and the `$`/`//` motifs. Icons are authored single-stroke SVG; there is no emoji and no icon font.

**Key Characteristics:**
- Layered onyx grounds with emerald glow pools and a faint measurement grid, not flat black.
- Emerald as a surgical signal (prompt, cursor, success, one action), muted luxury syntax palette for code.
- macOS window chrome everywhere: traffic lights, vibrancy/backdrop-blur, title bars, status dots.
- Geist Sans display+body paired with Geist Mono for all terminal/code/label text.
- Live, GPU-cheap motion (typed stream, cursor spotlight, particles, reveals, count-up) fully gated by reduced-motion.

## Colors

A disciplined dark palette: layered onyx grounds carry everything, one brand emerald supplies the signal, a muted syntax set colors code, and green-tinted ink neutrals carry text — never flat gray.

### Primary
- **Brand Emerald** (`emerald-300 #00ff88`): The signal. Reserved for the shell prompt and `$`, the blinking caret, live/success status dots, the primary button, gauge fills, section-accent words, and focus rings. Used surgically, not as a flood.
- **Emerald Ramp** (`emerald-900 #072318` → `emerald-300 #00ff88` → `emerald-050 #d6ffe9`): A ten-step ramp. Dark steps (`700`–`900`) are borders-on-hover, chip strokes, and the dark end of fills; mid steps (`400`–`600`) are secondary accents, indices, and gradient bodies; `100`/`200` are brightened accent text (project subtitles, terminal names, icon strokes); `050`/`100` are specular highlights in button gradients.

### Secondary (terminal syntax)
A muted, luxurious code palette — never a neon rainbow. Applied only inside terminal/code surfaces.
- **String Gold** (`syn-str #e5b769`): String literals; doubles as `syn-warn`.
- **Keyword Periwinkle** (`syn-key #8aa2ff`): JSON keys and language keywords.
- **Function Cyan** (`syn-fn #5fd4d0`): Function/step markers (`▸`).
- **Number Coral** (`syn-num #e88c6a`): Numeric values and percentages.
- **Comment Muted** (`syn-comment #7d8c86`): Comments, dim meta, `//` and `/* */` prefixes.
- **Prompt/OK Emerald** (`syn-prompt`/`syn-ok` = `#00ff88`): The `$` prompt, caret, and success output — aliases of the brand emerald.

### Tertiary (window chrome)
- **Traffic Lights** (`mac-red #ec6a5e`, `mac-amber #f4bf4f`, `mac-green #61c554`): The three macOS window-control dots on every terminal, repo panel, and contact-form title bar. Decorative, non-interactive, always this exact trio.

### Neutral
- **Onyx Grounds** (`onyx-900 #050607` → `onyx-500 #232b30`): Layered developer-dark near-blacks. `onyx-900` is the page floor and input ground; `onyx-850`/`onyx-750` are raised glass panels; `onyx-600` is the gauge track. Panels stack translucent gradients of these over the floor to build depth without hard borders.
- **Ink** (`ink-100 #eef3f1` → `ink-600 #727f79`): Cool, faintly green-tinted neutrals for text. `ink-100` headings, `ink-200` body, `ink-300`/`ink-400` secondary copy, `ink-500`/`ink-600` captions, mono meta, and placeholders. Never a pure gray.
- **Hairlines** (`hairline rgba(167,182,176,0.09)`, `hairline-strong …0.16`): Section dividers, window-chrome separators, panel and chip borders. The box is avoided; the hairline divides.
- **Glow Line** (`glow-line rgba(0,255,136,0.14)`): Low-alpha emerald for edge glows and rim light.

### Named Rules
**The Signal-Not-Flood Rule.** Fully saturated `emerald-300` appears as a solid fill on at most one or two elements per viewport — the primary action, a gauge fill, a live dot, the prompt. Everywhere else emerald is light: low-alpha glow pools, rim lights, hairlines, and the muted syntax accents. Its rarity is what makes it read as a signal.

**The No-Flat-Gray Rule.** Every neutral carries a faint green cast. Text uses the `ink` scale, grounds use `onyx`; a `#808080`-family gray never appears.

**The Muted-Syntax Rule.** Code color stays in the `syn-*` set (gold / periwinkle / cyan / coral / muted). No pure-primary RGB, no neon rainbow — syntax reads as luxury, not as a 1990s terminal.

## Typography

**Display & Body Font:** Geist Sans (with system-ui, -apple-system, sans-serif) — self-hosted.
**Terminal / Code / Label Font:** Geist Mono (with JetBrains Mono, ui-monospace, monospace) — self-hosted.

**Character:** Geist Sans is tight and modern — headings run at weight 600 with negative tracking (`-0.03em` to `-0.035em`) and balanced wrapping. Geist Mono is the voice of the machine: it sets every terminal line, code sample, measurement, section index, field label, and the `$`/`//` motifs, with tabular numerals for readouts.

### Hierarchy
- **Display** (Geist Sans 600, `clamp(2.4rem, 6.4vw, 4.8rem)`, line-height 1.02, tracking -0.035em): The hero name only, preceded by a mono `// hola, soy` comment-greeting.
- **Headline** (Geist Sans 600, `clamp(2.1rem, 5.2vw, 3.8rem)`, line-height 1.06, tracking -0.035em): Section titles (`h2`), with one word set in `emerald-300` as the `.accent`.
- **Title** (Geist Sans 600, `clamp(1.4rem, 2.6vw, 2rem)`, line-height ~1.1, tracking -0.03em): Project and panel headings (`h3`).
- **Body** (Geist Sans 400, `clamp(1rem, …, 1.0625rem)`, line-height 1.65–1.8): Reading copy; max measure ~44–68ch.
- **Mono** (Geist Mono 400, `~0.82rem`, line-height 1.75): Terminal stream and code lines; colored by the `syn-*` set.
- **Label** (Geist Mono 400, `~0.72rem`, tracking 0.04em): Section indices (`// 01 · sobre-mí`), field labels, meta/captions, status chips, repo paths, dependency chips, gauge percentages.

### Named Rules
**The Mono-Is-The-Machine Rule.** Geist Mono is reserved for machine voice — terminal output, code, measurements, indices, labels, and the `$`/`//` prompts. It never sets headings or reading prose; Geist Sans never sets code.

**The Prompt-And-Comment Rule.** Section eyebrows and inline meta use the terminal's own grammar: a `$` prefix (via the `.cmd` helper) for commands and `//` or `/* */` for comments/indices. These are the world's native material, not decorative kickers.

## Layout

A centered editorial column: `.shell` is `max-width: 1240px` with a fluid gutter `clamp(1.25rem, 5vw, 4rem)`. Section rhythm is tall — `var(--space-3xl)` (9rem) vertical padding between major sections, `var(--space-2xl)` (6rem) under section headers. The spacing scale runs `2xs 0.5 / xs 0.75 / sm 1 / md 1.5 / lg 2.5 / xl 4 / 2xl 6 / 3xl 9` (rem).

Signature two-column splits: hero `1fr 1.02fr` (copy / terminal); skills rows `0.42fr 1fr` (sticky category head / gauge grid); about `0.92fr 1.08fr` (credo / capability module list); contact `1fr 1.05fr` (info / terminal form). Projects stack as full-width repo panels in a single column. The primary breakpoint is `860px` (with `460px` touch-ups), where all splits collapse to one column, the hero reorders the terminal above the copy, and the nav becomes a full-screen slide-in drawer. Section headers are a baseline-aligned flex row with a hairline underline and a mono `// NN · section` index pinned to the right.

## Elevation & Depth

Hybrid, and physical. Depth comes from three layers working together: (1) **tonal layering** — stacked onyx grounds and low-alpha emerald glow pools behind content; (2) **vibrancy** — `backdrop-filter: blur(…) saturate(…)` on window chrome, glass panels, and the scrolled header, so surfaces read as frosted glass over the field; (3) **real soft shadows** on lifted material (terminals, repo panels, the contact form). Shadows are large, soft, and downward — ambient depth, never hard offset blocks.

### Shadow Vocabulary
- **sm** (`box-shadow: 0 2px 10px rgba(0,0,0,0.5)`): Small lifted elements.
- **md** (`0 18px 44px -14px rgba(0,0,0,0.7)`): Repo panels at rest.
- **lg** (`0 44px 100px -28px rgba(0,0,0,0.85)`): The hero terminal and contact-form panels.
- **inset** (`inset 0 1px 0 rgba(255,255,255,0.05)`): A top sheen line on glass panels and the primary button.
- **Emerald rim/glow** (terminal: `0 0 60px -20px rgba(0,255,136,0.25)` + a cursor-tracked `::before` rim `radial-gradient(18rem … at var(--mx) var(--my))`; button: `0 12px 30px -10px rgba(0,255,136,0.5)`; repo hover: `0 0 50px -24px rgba(0,255,136,0.5)`): Emerald bloom reserved for live surfaces and the primary action.

### Named Rules
**The Lifted-Glass Rule.** A surface earns a shadow and backdrop-blur only when it is a lifted "window" (a terminal, repo panel, form, or the scrolled header). Flat sections convey depth through onyx layering and glow pools, not drop shadows.

**The Soft-Light-Only Rule.** Shadows are large, soft, and ambient (big negative spread, downward). No hard offset block shadows — this is not a neobrutalist world.

## Shapes

Softly rounded, window-like. Radii: `sm 6px` (buttons, chips, inputs, icon tiles), `md 10px` (method tiles, metrics strip, category icons), `lg 16px` (terminal, repo, and form windows), `xl 22px` (reserved). Traffic-light dots, status dots, and functional tracks (gauge rails, scroll bead, status chips) are full `999px` pills/circles. Borders are hairlines; the recurring silhouette is the **macOS window** — a rounded rectangle with a title bar carrying three traffic-light dots, a centered mono title, and an optional status chip.

### Named Rules
**The Window Rule.** Any self-contained live surface (terminal, repo panel, contact form) is framed as a macOS window: `radius-lg` body, a hairline-separated title bar, the red/amber/green dot trio, and a mono title. New primary surfaces should inherit this chrome.

## Components

### Buttons
- **Shape:** `radius-sm` (6px); padding `0.9rem 1.6rem`; gap `0.55rem`; `:active` presses to `scale(0.97)`.
- **Primary:** Emerald gradient (`linear-gradient(135deg, #8bffc4, #00ff88 48%, #00c853)`) on `onyx-900` text, weight 600, with an emerald glow shadow + inset top sheen and a diagonal light sweep (`::after`) that rakes across on hover. Hover lifts `translateY(-2px)` and deepens the glow.
- **Ghost:** `ink-200` text in Geist Mono, 1px `hairline-strong` border, near-invisible fill; often prefixed with an emerald `$`. Hover shifts border to `emerald-600` and text to `emerald-100`, lifts `-2px`.

### Chips
- **Dependency chip (repo cards):** Geist Mono `~0.74rem`, `ink-300`, 1px `hairline-strong`, `radius-sm`, faint fill. Hover warms to `emerald-100`, border to `emerald-600`, faint emerald wash, lifts `-2px`.
- **Status chip (window bars):** Mono `~0.6rem`, uppercase, `emerald-200` on an `emerald-800` hairline with faint emerald fill, pill shape — e.g. `production`.

### Cards / Containers
- **Repo panel (project card):** `radius-lg`, translucent onyx gradient over the floor, `backdrop-filter: blur(10px)`, 1px `hairline-strong`, `shadow-md`. Title bar carries the traffic-light trio, a mono `kike/<slug> — main` path, and a live status dot + `producción`. Body shows a mono `[0N]` index, title, `//`-prefixed description, and a `dependencies (N)` chip list. Hover lifts `-4px`, border → `emerald-700`, adds emerald glow.
- **Method / social tiles:** `radius-md`, hairline border, faint gradient; hover shifts border to emerald, lifts, reveals an emerald arrow.
- **Metrics strip:** A 4-up bordered row divided by vertical hairlines, faint top gradient + light blur; values count up on reveal.

### Inputs / Fields
- **Style:** `onyx-900` ground, 1px `hairline-strong`, `radius-sm`, `ink-100` text in Geist Mono; mono label above with an emerald `$` prompt prefix.
- **Focus:** Border → `emerald-500`, ground → `onyx-850`, plus a 3px `rgba(0,255,136,0.12)` focus halo. Global `:focus-visible` is a 2px `emerald-300` outline, offset 3px.
- **Placeholder:** `ink-600`.

### Navigation
- **Style:** Fixed, transparent at top; on scroll it condenses and gains a blurred translucent onyx bar (`rgba(6,8,10,0.72)` + `backdrop-filter: blur(18px) saturate(160%)`) with a bottom hairline. Hides on scroll-down, returns on scroll-up (`ease-drawer`).
- **Links:** `ink-300`, each prefixed with a mono two-digit index (`01`, `02`…) in `emerald-600`. Hover brightens text to `ink-100` and draws an emerald underline (`scaleX` from left, with glow); index brightens to `emerald-300`.
- **Mobile:** Burger toggles a full-screen onyx drawer (`ease-drawer` slide, radial emerald wash) with Geist Sans uppercase links that stagger in; a primary `Hablemos` CTA pins below.

### Live macOS Terminal (signature)
The hero centerpiece: a `radius-lg` frosted window (`backdrop-filter: blur(14px) saturate(140%)`, `shadow-lg` + emerald bloom) with a title bar (traffic lights, `kike@dev — zsh — 80×24`, a `production` chip). Its body loops a typed build/deploy session char-by-char (`ssh` → `whoami` → `cat stack.json` → `./deploy` with an ASCII progress bar → `projects --list`), colored by the `syn-*` set, with `[✓]`/`[!]` status tags, a blinking `emerald-300` caret, a faint scanline overlay, and a `::before` emerald edge-light that tracks the pointer via `--mx/--my`. Under reduced motion it renders the whole program statically with a steady caret.

### Ambient field (signature)
Two fixed, pointer-driven background layers behind all content: **Particles** — a canvas of up to 70 emerald dots drifting with faint links between neighbors (static single frame under reduced motion); and **CursorGlow** — a fixed `radial-gradient` emerald spotlight that follows a smoothed `--mx/--my` set on `:root` by a shared rAF loop (hidden under reduced motion and on touch). Sections also layer blurred emerald glow pools and a masked measurement grid, moved at per-element speeds by a shared parallax ticker.

### Precision gauges (signature)
Skill levels as instrument readouts, not progress bars: a 3px `onyx-600` track filled by an emerald-gradient `scaleX` (origin left) driven by `--ratio`, glowing faintly, staggered on reveal. The percentage is Geist Mono `emerald-300` with an `ink-600` `%` suffix and tabular numerals.

## Do's and Don'ts

### Do:
- **Do** keep emerald a signal: reserve solid `emerald-300` for the prompt/caret, live dots, the primary action, and gauge fills (The Signal-Not-Flood Rule).
- **Do** color code with the muted `syn-*` set only, inside terminal/code surfaces (The Muted-Syntax Rule).
- **Do** frame self-contained live surfaces as macOS windows — traffic lights, mono title, hairline bar, `radius-lg` (The Window Rule).
- **Do** build depth from layered onyx, glow pools, backdrop-blur, and soft ambient shadows on lifted windows (The Lifted-Glass Rule).
- **Do** set all machine voice in Geist Mono and all headings/prose in Geist Sans (The Mono-Is-The-Machine Rule).
- **Do** use the terminal's own grammar for eyebrows and meta — `$` for commands, `//`·`/* */` for comments/indices (The Prompt-And-Comment Rule).
- **Do** author icons as single-stroke SVG and gate every motion behind `prefers-reduced-motion`.

### Don't:
- **Don't** flood surfaces with saturated `#00ff88` or set green as gradient body text — it is a surgical signal, not a fill.
- **Don't** render code in neon-rainbow or pure-RGB syntax; stay in the muted gold/periwinkle/cyan/coral/muted set.
- **Don't** use flat grays for text or grounds; every neutral is green-tinted (The No-Flat-Gray Rule).
- **Don't** apply hard offset block shadows; shadows here are soft and ambient (The Soft-Light-Only Rule).
- **Don't** use emoji or icon fonts anywhere in the chrome or UI.
