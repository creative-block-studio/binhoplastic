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
- On small screens, important content must stay inside the site grid with no accidental horizontal overflow or visual leaking past the content box.
- When content would otherwise exceed the available width, make it flexible inside the same component instead of letting it break the grid or overflow by default.
- Keep the mobile experience as visually consistent as possible across different phones; prefer controlled scaling and reflow over large composition changes.

## Mobile Implementation

- Mobile in this project is an adaptation of the existing site, not a separate version.
- Reuse the same components, markup structure, assets, and interaction logic whenever possible instead of creating parallel mobile-only components.
- The primary strategy for mobile is viewport-based responsive behavior using CSS media queries, not device detection.
- Prefer changing layout, spacing, sizing, alignment, and visibility through breakpoints instead of duplicating sections for mobile.
- Treat mobile breakpoints as layout decisions based on available width, not as assumptions about phone models or operating systems.
- Keep the desktop implementation as the base and layer mobile adjustments on top of it progressively.
- When a mobile interaction needs a different state pattern, keep the shared component and only swap the presentation or controls at the relevant breakpoint.
- Use JavaScript for mobile only when CSS alone is not enough, such as menu open/close state, scroll locking, escape handling, or viewport-specific interaction state.
- When implementing mobile-specific behavior, prefer shared root-cause fixes in the component itself over page-level overrides.
- Mobile changes must still respect the same site grid tokens, gutters, and content-box logic already used on desktop.
- If a request is explicitly for a mobile-only addition or change, implement it exclusively at mobile breakpoints by default.
- Do not let mobile-only additions leak into tablet or desktop unless the user explicitly asks for that extension.
- This applies to added assets, new visual effects, extra dividers or lines, button state changes, and any other new mobile-specific embellishment or behavior.
- If a desktop element should disappear on mobile, hide or reposition it through responsive rules instead of removing the underlying structure entirely unless there is a clear performance reason.
- Any new mobile styling should be written so another chat can continue the work by extending the same shared component and breakpoint logic, not by starting a parallel mobile rebuild.
- When mobile sections are visually separated, implement them as real structural sections or section-level blocks rather than making one section visually invade another.

## Tablet Implementation

- Tablet layouts must still respect the same site grid, gutters, and content-box logic as the rest of the site.
- Unless a page-specific request says otherwise, tablet should preserve the desktop structure as much as possible while remaining unbroken and grid-aligned.
- If a tablet-specific adaptation is requested for a section, keep it in shared responsive code and scope it only to the requested breakpoint range.
- For the process-stack area specifically, tablets should use normal vertical document flow instead of the stacked scroll effect unless a future request explicitly restores that behavior.

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
- Dropdowns, drawers, and expandable panels should animate in the direction of travel:
  - opening content that appears below should enter from top to bottom
  - closing that same content should return upward cleanly
- Scrollable areas inside cards, dropdowns, panels, and text fields must keep wheel scrolling trapped inside the component, including when the scroll reaches the top or bottom.
- Custom scroll areas should use subtle scrollbar styling that matches the UI and avoids heavy visual weight.

## Forms And Catalog Behavior

- Prefer concise, direct field microcopy. Avoid long placeholder sentences when a shorter label communicates the same intent more cleanly.
- When a form field supports selecting multiple items, keep the interaction explicit:
  - allow multiple selections
  - enforce at least one selection when the field is required
  - include an `Outro` option when it is relevant to the field's purpose
- When the catalog sends a sample request to the contact form, prefill the message with color codes only, not color names.

## Editing Behavior

- Prefer changing the root cause instead of adding local overrides or one-off fixes.
- If a style should be global, implement it globally.
- If a section belongs to the site grid, solve it through the grid, not through ad hoc positioning.
- When a requested behavior applies across pages, implement it at the shared layer instead of duplicating page-specific fixes.
