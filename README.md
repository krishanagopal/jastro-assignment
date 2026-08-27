# Scoped AI Template Editor

A browser-based Website Builder prototype featuring a canonical typed JSON template model, synchronized dual Canvas and Code editing surfaces, explicit responsive viewport scoping (`all`, `desktop`, `tablet`, `mobile`), a deterministic AI proposal scenario engine, a per-element proposal review/recovery stack, and candidate's custom visual scope safety feature.

---

## Quick Start & Local Setup

### 1. Installation
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Run Automated Test Suite
```bash
npm test
```
Runs all 5 focused Vitest test files testing validation bounds, responsive override isolation, AI selection authority, code/canvas consistency, and independent recovery.

### 4. Build Production Bundle & Type Check
```bash
npm run build
```

---

## Template Source & License

* **Template Source**: **Original template created for this assignment**
* **Template Name**: *"Apex Solutions - Business Landing Page"*
* **Structure**: A responsive single-page small business layout containing 5 modular, selectable sections:
  1. `hero-title` (Heading)
  2. `hero-subtitle` (Paragraph)
  3. `hero-cta-button` (Button)
  4. `service-card-1`, `service-card-2`, `service-card-3` (Cards Grid)
  5. `value-prop-card` (Value Proposition Banner)
  6. `cta-section-title` (Footer CTA Headline)
  7. `footer-text` (Footer Copyright)

---

## Architecture & Ownership Mapping

| Concept | Owning Module | Responsibilities |
| :--- | :--- | :--- |
| **Canonical Model** | [`src/state/templateStore.ts`](file:///c:/dev/jastro%20assignment/src/state/templateStore.ts) | Holds the single authoritative `TemplateModel` state. |
| **Responsive Resolution** | [`src/engine/resolution.ts`](file:///c:/dev/jastro%20assignment/src/engine/resolution.ts) | Resolves $\text{Base Value} \rightarrow \text{Viewport Override}$ without cross-viewport leakage. |
| **Validation Pipeline** | [`src/engine/validation.ts`](file:///c:/dev/jastro%20assignment/src/engine/validation.ts) | Validates ID existence, AI selection bounds, allowed fields, viewport scope, and revisions. |
| **Commit Boundary** | [`src/engine/commit.ts`](file:///c:/dev/jastro%20assignment/src/engine/commit.ts) | Applies scope-specific patches, increments version counter, logs history entries. |
| **Deterministic AI Engine** | [`src/engine/aiDemoEngine.ts`](file:///c:/dev/jastro%20assignment/src/engine/aiDemoEngine.ts) | Rule-based scenario engine returning typed proposal patches based on selected IDs & prompt. |
| **History & Recovery** | [`src/components/History/ElementHistoryDrawer.tsx`](file:///c:/dev/jastro%20assignment/src/components/History/ElementHistoryDrawer.tsx) | Inspects granular history and executes surgical per-element per-viewport recovery. |

### Architecture Trade-Off & Commit Boundaries

* **Trade-off**: **Scope-Specific Patches vs Full-Page Snapshots**.
  * Rather than cloning the entire page state into every revision history entry (which causes excessive memory usage and ambiguous rollbacks), history entries record exact scope-specific property patches (`previousState` vs `nextState`).
  * **Benefit**: Guarantees surgical recovery of one element at one viewport scope without accidentally resetting unrelated elements or other screen sizes.

---

## Libraries Used

* **React 18 & TypeScript**: Core component framework and strict static typing.
* **Vite**: Rapid development server and bundler.
* **Vitest**: Fast unit and integration testing runner.
* **Zustand**: Clean, unopinionated global state management for the canonical model.
* **Lucide React**: Clean SVG icon library.

---

## Documented Deterministic AI Demo Examples

Select one or more elements on the canvas, pick a target scope, and type or select any of these reviewer-visible instructions:

1. **Content Rewrite**: `"Make headline punchier and improve CTA button"`
2. **Style Change**: `"Apply dark indigo theme with rounded buttons"`
3. **Move, Resize, or Reorder**: `"Swap section layout and increase card width"`
4. **One-Viewport Responsive Adjustment**: `"Stack service cards vertically on mobile only"`
5. **Multi-Element Edit**: `"Update headline, button, and footer for summer promo"`
6. **Safe Failure Scenario**: `"Delete whole website"` *(Triggers safety validation alert without mutating state)*

---

## Requirement Mapping Checklist

- [x] Canonical typed, JSON-serializable template state (`TemplateModel`).
- [x] Stable element IDs.
- [x] Desktop (~1440px), Tablet (~768px), and Mobile (~375px) previews.
- [x] Single & Shift-click group selection, keyboard accessible.
- [x] Canvas visual editing controls.
- [x] Code editor with separate draft state & safe error boundaries.
- [x] Explicit responsive scope selector (`all`, `desktop`, `tablet`, `mobile`).
- [x] Deterministic AI scenario engine with strict selection & field bounds.
- [x] Side-by-side proposal review with independent per-element Accept/Reject.
- [x] Per-element per-viewport independent recovery logging a new history entry.
- [x] LocalStorage persistence & deliberate reset button.
- [x] 5 focused automated Vitest test files passing 100%.
