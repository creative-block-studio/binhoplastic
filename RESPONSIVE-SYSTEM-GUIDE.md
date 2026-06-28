# Responsive System Guide

Use this document as a reusable instruction guide for AI assistants and for future frontend projects.

The goal is to build websites that are:

- responsive by default
- visually consistent across screen sizes
- aligned to a real grid
- lightweight and performant
- clean in code and easy to extend
- faithful to the design intent without becoming rigid or fragile

This guide is written as practical implementation rules, not theory.

## Core Principle

A site should not be "the same in pixels" on every screen.

It should be the same in system:

- same content width logic
- same grid logic
- same spacing logic
- same type scale logic
- same proportions between sections
- same visual hierarchy

On a very wide monitor, the layout should stop expanding after a controlled max width.
On a smaller screen, the layout should shrink and reflow in a controlled way.

The result should feel like the same design, not a different site.

## Non-Negotiables

- All important content must stay inside the site grid.
- No accidental horizontal overflow.
- No layout decisions by eye when the grid should define them.
- No mobile-only rebuilds when shared responsive code solves the problem.
- No uncontrolled stretching on ultrawide screens.
- No fixed desktop compositions copied literally from Figma.
- No decorative additions unless explicitly requested.
- No unnecessary JS when CSS is enough.
- No dead code, abandoned overrides, or duplicate breakpoint logic after iteration.

## The Right Mental Model

Do not think in devices first.

Think in:

- available width
- content box width
- column span
- text measure
- spacing rhythm
- image ratio
- component behavior under compression

Breakpoints are layout decisions, not device labels.

## Layout System

Every project should have one source of truth for:

- page max width
- content max width
- gutter
- spacing scale
- radius scale
- type scale
- baseline rhythm if needed

Example:

```css
:root {
  --site-max-width: 1440px;
  --site-content-width: 1240px;
  --site-gutter: clamp(16px, 2vw, 48px);

  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 3rem;

  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
}
```

## Required Shell Structure

Every page should have at least one shared shell/container pattern.

Example:

```css
.site-shell {
  width: min(calc(100% - (var(--site-gutter) * 2)), var(--site-max-width));
  margin-inline: auto;
}

.site-content-shell {
  width: min(100%, var(--site-content-width));
  margin-inline: auto;
}
```

Why:

- on very wide screens, content stops expanding
- on small screens, content still respects gutters
- every section aligns to the same content logic

## Grid Rules

Use a real grid. Do not fake layout with arbitrary margins and offsets.

Preferred default:

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(12px, 1.5vw, 24px);
}
```

Rules:

- use `minmax(0, 1fr)` in grids
- place major blocks by column span
- let sections share a consistent column system
- do not let one section invent different left/right margins without reason

Good:

```css
.hero-copy {
  grid-column: 1 / 7;
}

.hero-media {
  grid-column: 7 / -1;
}
```

Bad:

- random `margin-left`
- random `translateX`
- `position: absolute` for structural placement

## Units

Use units intentionally.

### Use `rem` for

- font sizes
- spacing
- border radius
- min heights
- component sizing in most UI contexts

### Use `px` for

- borders
- hairlines
- tiny visual corrections
- shadow precision when needed

### Use `%`, `fr`, `minmax()` for

- layout width
- grid columns
- flexible distribution

### Use `clamp()` for

- fluid type
- fluid spacing
- fluid gaps
- fluid padding
- responsive widths that should grow only within limits

### Use `ch` for

- readable text measure
- line length control in body copy

### Use `aspect-ratio` for

- media wrappers
- cards that must maintain stable proportions

## Type System

Typography should scale predictably, not randomly.

Use `clamp()` for major text:

```css
.title {
  font-size: clamp(2rem, 4vw, 4rem);
}

.body {
  font-size: clamp(1rem, 1.1vw, 1.15rem);
}
```

Rules:

- avoid `vw` alone for font size
- always cap growth and shrink with `clamp()`
- define hierarchy through scale, weight, spacing, not noise
- control text width with `max-width` or `ch`
- do not let paragraphs run full width on large screens

## Spacing System

Spacing must come from a repeatable scale.

Good:

```css
padding: var(--space-4);
gap: var(--space-3);
margin-top: var(--space-5);
```

Bad:

- random values everywhere like `17px`, `29px`, `43px`
- repeated one-off spacing fixes

## Media and Images

Media should never control layout by accident.

Rules:

- define a wrapper first
- define its width behavior
- define its aspect ratio if needed
- make the image fit inside it

Example:

```css
.media {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 1rem;
}

.media img {
  object-fit: cover;
}
```

If the image is illustrative and must never crop:

```css
object-fit: contain;
```

Use:

- SVG for icons and vector illustrations
- WebP or AVIF for large raster images
- local assets by default

## Mobile Strategy

Mobile is an adaptation of the same site, not a parallel site.

Rules:

- keep shared markup whenever possible
- solve with CSS first
- use media queries for layout changes
- only use JS when interaction state truly changes
- mobile changes must stay inside the same grid logic
- if a mobile-only feature is requested, isolate it to the mobile breakpoint

On mobile:

- content must stay inside gutters
- cards should use full useful width of the grid
- text should remain readable without overflow
- sections should be structurally separated when visually separated

Do not:

- create duplicate mobile sections unless absolutely necessary
- hardcode around specific phone models

## Tablet Strategy

Tablet is not desktop by default and not mobile by default.

Tablet should be treated as a compression stage:

- preserve desktop structure as long as it remains stable
- if the desktop composition breaks, adapt selectively
- keep the same grid and shell logic
- avoid weird halfway states

If a section needs a specific tablet adaptation:

- scope it to the exact breakpoint range
- keep it in the shared component
- avoid copying the section

## Ultrawide Strategy

This is one of the most important points.

A site looks consistent on ultrawide screens because the layout does not keep expanding forever.

Use:

- `max-width`
- content shells
- consistent gutters
- controlled text measure
- controlled image widths

Example:

```css
.section-inner {
  width: min(100%, 1240px);
  margin-inline: auto;
}
```

Without that, layouts become stretched, weak, and inconsistent.

## Breakpoint Strategy

Do not start from many breakpoints.

Start from:

- base desktop or base layout
- one tablet range if needed
- one mobile range

Then add a breakpoint only when something truly breaks.

Typical philosophy:

- base styles
- medium compression
- small-screen stack

Avoid too many overlapping breakpoint patches.

## Container Queries

Whenever components can appear in different widths depending on context, prefer container queries.

Use them for:

- cards
- side panels
- reusable content blocks
- responsive components inside different layouts

Why:

- media queries react to viewport
- container queries react to actual available component space

This is often the cleanest way to make components robust.

## Performance Rules

Performance is a design rule, not a finishing step.

Always prefer:

- local assets
- SVG for icons
- WebP or AVIF for raster images
- minimal JS
- no heavy runtime layout tricks when CSS solves it
- fewer layers and fewer effects

Budgets to respect:

- total page weight under control
- above-fold imagery optimized
- CSS kept lean
- JS kept small
- third-party minimized

Avoid:

- oversized images
- duplicate assets
- decorative runtime effects everywhere
- unnecessary animation libraries
- complex DOM for simple UI

## Code Hygiene

Every iteration should end with cleanup.

Rules:

- remove dead CSS
- remove dead imports
- remove placeholder content
- remove duplicate media queries
- remove obsolete overrides
- keep one clear source of truth

Do not leave:

- “temporary” overrides stacked forever
- duplicated logic across sections
- mobile fixes that conflict with later mobile fixes

## Figma Usage

Figma is a visual map, not a literal implementation.

Use it for:

- hierarchy
- spacing intent
- proportions
- asset reference
- composition logic

Do not:

- freeze Figma coordinates into the page
- replicate canvas artifacts literally
- destroy responsiveness to match a frame

## Reusable Component Rules

Every reusable section or component should answer these questions:

- what is its max width?
- how does it behave when compressed?
- what collapses first?
- what can wrap?
- what must stay fixed?
- how do text, media, and actions reflow?

If you cannot answer these, the component is not system-ready.

## Practical CSS Patterns

### Prevent overflow in grids

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
}

.grid > * {
  min-width: 0;
}
```

### Stable card width

```css
.card {
  width: 100%;
}
```

### Full-width mobile cards

```css
@media (max-width: 640px) {
  .card {
    grid-column: 1 / -1;
  }
}
```

### Fluid but capped layout spacing

```css
padding: clamp(16px, 2vw, 32px);
gap: clamp(12px, 1.6vw, 24px);
```

### Good readable paragraph width

```css
max-width: 60ch;
```

## Review Checklist

Before considering a section done, verify:

- Does it respect the site shell?
- Does it align to the same left and right boundaries as the rest of the page?
- Does it overflow horizontally at any width?
- Does it stretch too much on ultrawide?
- Does it feel like the same design on smaller screens?
- Are spacing values consistent?
- Are image proportions stable?
- Are type sizes controlled with `clamp()` where appropriate?
- Are mobile-only changes isolated?
- Are there duplicate or dead styles left behind?

## Prompt Template For AI

Use this as a starting instruction for future projects:

```md
Build this site as a responsive system, not as fixed screen mockups.

Requirements:

- Respect one shared site grid and content shell across all sections.
- Keep all important content inside the grid with no horizontal overflow.
- Use responsive CSS, not device-specific hacks.
- Preserve the same visual hierarchy and composition logic across screen sizes.
- On large screens, stop expansion with max widths instead of stretching forever.
- On small screens, adapt layout, spacing, and type fluidly without breaking the design.
- Reuse shared markup and components whenever possible.
- Prefer root-cause fixes over local overrides.
- Prefer lightweight, performant solutions.
- Use SVG for icons, optimized raster formats for images, and avoid unnecessary JS.
- Remove dead code, duplicate breakpoints, obsolete overrides, and unused assets after iteration.
- Use `rem` for typography and spacing, `px` only for precision details, `%/fr/minmax()` for layout, and `clamp()` for fluid sizing.
- Treat Figma as design intent, not literal coordinates.
```

## Final Rule

If the layout only works at one width, it is not finished.

If it only looks right because of fragile overrides, it is not system-quality.

If it needs many exceptions to survive, the structure is wrong.

The goal is not to make a screenshot responsive.
The goal is to build a layout system that remains correct under change.
