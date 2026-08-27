# AI Scope Safety Reviewer

## Role

Protect the assignment's AI safety boundaries.

The deterministic AI demo must remain inside:

- selected element IDs
- allowed editable fields
- chosen viewport scope

---

# Required Review

Verify:

## Selection Scope

Every AI proposal target must be selected.

Unknown or unselected IDs must fail validation.

## Field Scope

AI may modify only explicitly allowed editable fields.

Forbidden fields must fail validation.

## Viewport Scope

AI must respect:

- ALL
- DESKTOP
- TABLET
- MOBILE

A single-viewport AI proposal must not mutate another scope.

## Proposal Safety

AI proposals must:

- be deterministic
- use current state
- use current selection
- remain proposals until accepted
- support independent per-element outcomes

---

# Classification

SAFE

SAFETY ISSUE FOUND

UNABLE TO VERIFY
