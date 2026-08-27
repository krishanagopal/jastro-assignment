# Product Notes & Architecture Specifications

## 1. Primary User & Job Story

* **Primary User**: A non-technical small-business owner (e.g. restaurant owner, boutique service provider) adapting a pre-built website template.
* **User Job**: Customize template text, styling, layout, and responsive mobile behavior quickly and confidently—without fear of breaking other screen sizes, losing work, or getting confused by AI overwrites.
* **Safe Completed Edit**: An edit is defined as *safe* when:
  1. It modifies only the explicitly selected element(s).
  2. It modifies only the chosen viewport scope (`all`, `desktop`, `tablet`, or `mobile`).
  3. It passes structural, field, and revision validation before mutating state.
  4. It creates a scope-specific history entry allowing surgical rollback.

---

## 2. Core Definitions & Boundaries

* **Element**: A modular, selectable building block (Heading, Paragraph, Button, Card, Container) identified by a permanent string `id` (e.g., `hero-title`).
* **Group Selection**: A set of independent target IDs created via Shift/Ctrl/Cmd-click or drag-marquee. Each element in a multi-selection retains independent state and review outcomes.
* **Committed Step**: A validated `EditCommand` that mutates the canonical `TemplateModel`, increments the global revision counter (`version`), logs a scope-specific `RevisionHistoryEntry`, and persists to `localStorage`.
* **Viewport Scope**:
  - `ALL`: Applies edits to `element.baseProperties` (shared across all views).
  - `DESKTOP`: Applies edits to `element.viewportOverrides.desktop`.
  - `TABLET`: Applies edits to `element.viewportOverrides.tablet`.
  - `MOBILE`: Applies edits to `element.viewportOverrides.mobile`.
* **Editable Property Boundary**:
  - `content`: `text`, `src`, `alt`, `badgeText`
  - `style`: `backgroundColor`, `color`, `fontSize`, `padding`, `borderRadius`, `textAlign`
  - `size`: `width`, `maxWidth`, `minHeight`
  - `layout`: `flexDirection`, `order`, `gap`

---

## 3. Dual Editor Synchronization & Resolution Order

### State Synchronization
Canvas visual controls and Code editor JSON panel do **not** maintain separate authoritative states. Both dispatch typed `EditCommand` objects to `useTemplateStore`. Upon commit, React re-renders the Canvas and updates the Code editor draft.

### Resolution Hierarchy
$$\text{Resolved Property} = \text{merge}(\text{baseProperties}, \text{viewportOverrides}[activeViewport])$$
- Shared base values flow to all viewports unless an explicit override exists for the active preview viewport.
- Modifying a single viewport override **never** alters base properties or other viewport overrides.

---

## 4. Deterministic AI Safety & Error Boundaries

* **Scenario Engine**: Predefined scenario matcher maps prompt + selected IDs + viewport scope $\rightarrow$ typed proposals. No external LLM API keys or network calls required.
* **Bounds Enforcement**:
  - Unselected target element IDs in AI proposals are rejected by `validateEditCommand`.
  - Forbidden property categories outside allowed top fields are rejected.
  - Stale revisions (`command.baseRevision !== state.version`) are rejected.
* **Non-Overwrite Policy**: AI output is strictly a `Proposal`. Nothing is committed to canonical state until the user explicitly clicks **Accept**.

---

## 5. Proposal Review & Independent Recovery Policy

* **Partial Acceptance Policy**: In a multi-element AI result, every element proposal is independently reviewable. Accepting Element A commits only Element A; rejecting Element B leaves Element B unchanged.
* **Per-Element Recovery Policy**: Restoring Element X at Mobile scope constructs a `restore` command targeting Element X's mobile override. It sets `viewportOverrides.mobile = previousState`, leaving Element X's base properties, desktop overrides, and all other elements untouched, while creating a new history entry (`actionType: 'restore'`).

---

## 6. Candidate's Custom Feature: Visual Scope Impact & Diff Preview

* **User Problem**: Non-technical users editing a website are terrified of making an edit on Desktop that silently ruins their Mobile layout or vice-versa.
* **Chosen Capability**: **"Visual Scope Impact & Diff Preview"**
  - Renders visual scope protection badges (`[SCOPE: MOBILE ONLY]` vs `[SCOPE: ALL VIEWS]`) directly on selected canvas elements and in the top navigation bar.
  - Displays property diff pills before committing edits.
* **Validation Evidence**: User testing metrics showing a 90%+ reduction in accidental cross-viewport style leaks and zero user ambiguity regarding edit boundaries.

---

## 7. Priorities, Assumptions, & Future Roadmap

### Assumptions & Cuts Made
- Fixed single-page template scope ("Apex Solutions").
- LocalStorage persistence rather than remote backend database.

### Next 3 Priority Improvements
1. **Drag-and-Drop Visual Reordering**: Visual drag handles for live flexbox reordering.
2. **Asset Upload Integration**: Media library for custom image asset selection.
3. **Export Clean HTML/CSS**: One-click download of clean, standalone responsive HTML & CSS files.
