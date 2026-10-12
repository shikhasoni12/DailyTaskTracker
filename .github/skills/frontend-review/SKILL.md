---
mode: 'agent'
name: 'frontend-review'
description: 'Review frontend code for accessibility, JavaScript quality, maintainability, responsiveness, and basic security issues.'
---

# Frontend Review

Use this skill to review frontend implementations for quality and correctness before considering them complete.

## Review focus

Review the code for the following areas:

### 1. HTML accessibility
- Use semantic elements like header, main, nav, section, article, and footer where appropriate.
- Ensure form controls have associated labels, including visible or programmatically associated labels.
- Check for meaningful button text, link text, and accessible names.
- Avoid using placeholder text as the only label.
- Validate image alt text, button labels, and form field instructions.
- Ensure focus states are visible and keyboard navigation works.
- Prefer native controls and ARIA only when it adds clear value.
- Check heading structure for logical order and avoid skipping levels unnecessarily.

### 2. JavaScript quality
- Keep functions small, readable, and single-purpose.
- Prefer direct DOM APIs over unnecessary abstraction or framework-like complexity in simple apps.
- Avoid brittle logic and duplicated event handlers when a shared helper can be used.
- Ensure event listeners are attached only once per element unless the behavior intentionally repeats.
- Use clear variable and function names.
- Avoid hidden side effects and keep state changes predictable.
- Prefer straightforward, maintainable patterns over clever but confusing code.

### 3. Duplicate code and maintainability
- Flag repeated logic, repeated markup patterns, or repeated style declarations.
- Consolidate repeated behaviors into shared functions or reusable patterns.
- Reuse values and constants instead of scattering repeated literals.
- Prefer maintainable structure over copy-paste implementations.

### 4. Unused variables, functions, and dead code
- Remove unused variables, dead branches, and unnecessary imports.
- Check for unused helper functions or temporary debugging code left behind.
- Ensure there are no stale variables that are assigned but never read.
- Keep the codebase clean and intentional.

### 5. Responsiveness and layout quality
- Ensure layouts adapt to smaller screens without overlapping or clipped content.
- Check spacing, font sizes, and tap targets on mobile devices.
- Prefer responsive units and flexible layouts where needed.
- Verify content does not become unreadable or inaccessible on narrow widths.
- Ensure controls remain usable on touch devices.

### 6. Basic security issues
- Do not expose secrets, keys, or tokens in client-side code.
- Avoid unsafe HTML injection patterns such as injecting raw user input into innerHTML where textContent or DOM APIs should be used.
- Sanitize or escape user-provided content before rendering it in the DOM.
- Validate user input before processing it, especially when it affects storage, URLs, or DOM rendering.
- Avoid using dangerous patterns like eval or other dynamic code execution.
- Be careful with external resource loading and only trust known-safe sources.

## Review output expectations

When reviewing, provide concise but specific feedback. Highlight:
- issues that block correct behavior or accessibility
- maintainability problems such as duplicate logic or unused code
- responsiveness problems on smaller screens
- any basic security concerns that should be fixed before shipping

## Review checklist

Before marking frontend work as complete, confirm all of the following:
- HTML is semantically structured and accessible.
- Labels and focus states exist for interactive elements.
- JavaScript is clear, small, and maintainable.
- Duplicate code has been reduced or justified.
- No unused variables or dead code remain.
- The UI works across common screen sizes.
- Basic security best practices are followed.

## Example red flags
- Inputs without labels
- Buttons with no accessible names
- Unused variables or dead code left in place
- Repeated logic copied across handlers
- Fixed-width layouts that break on mobile
- innerHTML used with user-controlled values
- Hardcoded secrets or sensitive values in front-end files
- Unclear, deeply nested, or fragile JavaScript logic
