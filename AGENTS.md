# Project Instructions

These rules apply to all future edits in this project.

## Figma

- Figma is a reference map, not a 1:1 implementation target.
- Do not copy Figma literally when that would hurt responsiveness, performance, maintainability, or the existing structure of the site.
- Use Figma to understand hierarchy, spacing intent, composition, proportions, and visual relationships.
- Adapt layouts to the web properly instead of freezing them into rigid canvas coordinates.

## Layout And Grid

- All sections and components must follow the site's grid system.
- Respect the site's existing content box, gutters, and margin logic at all times.
- New elements must align to the same left and right margins used by the rest of the site.
- Do not place important content by eye using arbitrary offsets if it should belong to the site grid.
- Treat the grid as structural, not decorative.
- Follow the principles from `C:\Users\pc\.codex\skills\muller-brockmann-grid-systems\SKILL.md` when making layout decisions:
  - one source of truth for spacing and structure
  - consistent margins and gutters
  - modular placement
  - alignment that is intentional and measurable

## Responsiveness

- Every implementation must be responsive by default.
- Do not build fixed desktop-only compositions copied from design tools.
- Layouts must adapt cleanly across desktop, tablet, and mobile without breaking hierarchy.
- If a composition from Figma does not translate well directly, preserve the intent and recompose it for the viewport.

## Performance

- Prefer lightweight solutions.
- Do not add heavy effects, libraries, animations, or components unless they are clearly necessary.
- Avoid unnecessary runtime complexity when CSS or simpler structure solves the problem.
- Prefer local static assets over dynamic or indirect delivery paths when possible.
- Keep media loading practical and fast.
- After iterative UI exploration, remove failed attempts, obsolete styles, unused helpers, and dead code paths.
- Keep only code that is actively used by the final implementation.

## Visual Implementation

- Keep the site flexible and production-appropriate, not overfit to mockup artifacts.
- Preserve the established visual language of the project.
- Avoid decorative additions that were not requested.
- When reproducing a design detail, match the real intent of the section instead of approximating it with unrelated effects.
- When a requested interaction or animation already exists elsewhere in the project, prefer reusing the existing pattern instead of creating a parallel variation.

## Assets

- Use local project assets whenever available.
- Do not rely on external asset URLs for final implementation unless explicitly approved as a temporary placeholder.

## Interaction Behavior

- Preserve the site's existing global interaction patterns unless the user explicitly asks to change them.
- The navbar logo is a reset action: it should return the experience to its initial state from the top.
- Re-clicking the current top-level page link in the navbar should reload that page from its initial state.
- Prevent accidental text selection in intentionally non-selectable UI such as the main hero and navbar text, unless a task explicitly requires selection there.

## Editing Behavior

- Prefer changing the root cause instead of adding local overrides or one-off fixes.
- If a style should be global, implement it globally.
- If a section belongs to the site grid, solve it through the grid, not through ad hoc positioning.
- When a requested behavior applies across pages, implement it at the shared layer instead of duplicating page-specific fixes.
