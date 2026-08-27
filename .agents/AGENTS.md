# Scoped AI Template Editor Agent System

## Purpose

This repository uses a structured multi-agent development system.

The system exists to ensure that development work is:

- requirement-driven
- architecture-first
- disciplined
- minimal in scope
- safe for existing functionality
- safe for user data and edits
- protected against regressions
- properly tested
- honestly verified
- aligned with assignment requirements

The agent must not behave as a simple code generator.

The agent must behave as a disciplined software engineering system.

---

# Primary Operating Principle

For every significant task:

UNDERSTAND
↓
ANALYZE REQUIREMENTS
↓
INSPECT REPOSITORY
↓
DESIGN ARCHITECTURE
↓
IDENTIFY SCOPE
↓
PLAN
↓
IMPLEMENT MINIMALLY
↓
VALIDATE
↓
TEST
↓
CHECK INTEGRATION
↓
CHECK UI
↓
CHECK REGRESSIONS
↓
REVIEW
↓
VERIFY REQUIREMENTS
↓
COMPLETE

Never use:

REQUEST
↓
GENERATE CODE
↓
DECLARE COMPLETE

---

# Assignment-Specific Architecture Contract

This project must maintain one canonical typed,
JSON-serializable template model.

The canonical model is the durable source of truth.

The following must operate through this same model:

- canvas editing
- code editing
- deterministic AI proposals
- accepted AI changes
- responsive overrides
- revision history
- recovery
- persistence

Do not create independent authoritative state for
different editing surfaces.

---

# Required Edit Pipeline

Every state-changing operation must conceptually follow:

Edit Source
↓
Typed Edit Command
↓
Structural Validation
↓
Target Validation
↓
Selection Validation when applicable
↓
Editable Field Validation
↓
Viewport Scope Validation
↓
Revision Validation
↓
Commit
↓
Canonical State Update
↓
History Entry
↓
Persistence
↓
React Rendering

No editing source may bypass this pipeline.

Edit sources include:

- canvas
- code
- AI acceptance
- restore

---

# Canonical State Rule

Never allow:

Canvas State
+
Separate Code State
+
Separate AI State

to become competing sources of truth.

The application may have temporary UI state for:

- open panels
- pending input
- selected tabs
- proposal review UI

but template content and committed edits must have one
authoritative canonical representation.

---

# Selection Authority Rule

Selection must be represented by stable element IDs.

AI authority is constrained by selection.

AI proposals may reference only:

- selected IDs
- allowed editable fields
- chosen viewport scope

Never infer selection from:

- DOM position
- CSS class
- text content
- rendered location

A multi-selection is a set of independent targets.

---

# AI Proposal Rule

AI output is always a proposal.

AI output must never automatically mutate current state.

Every proposal must be validated before it can be applied.

Each target must be independently reviewable.

Possible independent outcomes include:

- pending
- accepted
- rejected
- invalid
- restored

One target's outcome must not force another target's outcome.

---

# Responsive Scope Rule

Supported scopes:

ALL
DESKTOP
TABLET
MOBILE

Rules:

- ALL affects shared/base values.
- DESKTOP affects only desktop overrides.
- TABLET affects only tablet overrides.
- MOBILE affects only mobile overrides.
- A viewport-specific change must not alter other viewports.
- A viewport-specific change must not accidentally alter the base value.

Responsive correctness must be enforced in data and validation,
not only visually through CSS.

---

# Revision and Recovery Rule

Every committed:

- manual edit
- accepted AI edit
- restore

must create a history entry.

History must retain sufficient information to recover:

- one element
- at one viewport scope

without modifying unrelated:

- elements
- viewport scopes

A restore operation itself is a new committed action and must
create new history.

---

# Required Development Behavior

## Understand Before Editing

Before modifying code:

- read the complete request
- inspect relevant files
- identify dependencies
- identify consumers
- understand current behavior
- identify regression risks

Never modify code based only on filenames.

## Architecture Before Implementation

For significant changes involving state, editing, AI,
responsive behavior, history, or persistence:

design the contract before implementing UI.

## Minimal Surface Area

Change the smallest amount of code required.

Do not:

- rewrite unrelated systems
- change architecture unnecessarily
- upgrade dependencies without need
- redesign unrelated UI
- refactor unrelated code

## Evidence Before Assumption

Never assume:

- a component has no consumers
- a file is unused
- an API is isolated
- a style is local
- a state change is safe
- a viewport edit cannot affect other views

Inspect when possible.

---

# Mandatory Final Verification Questions

Before completion determine:

1. What was requested?
2. Which requirements were implemented?
3. Which files changed?
4. Did unrelated files change?
5. Is canonical state preserved?
6. Do canvas and code update the same state?
7. Does AI respect selection?
8. Does AI respect allowed fields?
9. Does AI respect viewport scope?
10. Are proposals non-destructive before acceptance?
11. Are viewport overrides isolated?
12. Is history recorded correctly?
13. Can one element be recovered independently?
14. What tests actually ran?
15. What could not be verified?

Never claim more certainty than the evidence supports.

---

# Agent Selection

## Assignment Planning

Requirement Analyst
↓
State Architect
↓
Repository Inspection
↓
Assignment Compliance Review

## New Feature

Requirement Analyst
↓
Repository Inspection
↓
Feature Developer
↓
Test Engineer
↓
Integration Reviewer
↓
Regression Tester

## AI Demo

Requirement Analyst
↓
State Architect
↓
Feature Developer
↓
AI Scope Safety Reviewer
↓
Test Engineer
↓
Regression Tester

## Responsive Change

Requirement Analyst
↓
Repository Inspection
↓
Feature Developer
↓
UI Reviewer
↓
Integration Reviewer
↓
Regression Tester

## Recovery or History Change

State Architect
↓
Feature Developer
↓
History Recovery Reviewer
↓
Test Engineer
↓
Regression Tester

## Final Assignment Review

Requirement Analyst
↓
Assignment Compliance Reviewer
↓
Test Engineer
↓
AI Scope Safety Reviewer
↓
History Recovery Reviewer
↓
UI Reviewer
↓
Integration Reviewer
↓
Regression Tester
↓
Code Reviewer

---

# Final Reporting Standard

Report:

## Completed

What was implemented.

## Changed Areas

Files and systems changed.

## Verification

Checks actually performed.

## Not Verified

Anything that could not be checked.

## Risks

Remaining known risks or limitations.

Do not claim:

- tested
- working
- complete
- regression-free

without actual evidence.
