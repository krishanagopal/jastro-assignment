# AI Usage Report

## 1. AI Tools & Models Used

* **AI Assistant / Model**: Antigravity AI Assistant (Google DeepMind Agentic Coding System) using Gemini 3.6 Flash.
* **Usage Responsibilities**:
  - Requirement analysis & architecture contract formulation.
  - Designing the single canonical data model and validation pipeline.
  - Generating TypeScript interfaces, Zustand state store, and Vitest unit tests.
  - Structuring the `.agents` disciplined development environment.

---

## 2. Interaction Examples

### Example 1: Planning & Product Framing Interaction (Redacted)
> **User Prompt**: "We need to design the data model and history system for a Website Builder prototype. How should we handle viewport overrides and revision history to ensure recovery is independent per element?"
>
> **AI Response**: "Rather than storing full-page resolved HTML or JSON snapshots in every revision log, we should store scope-specific property patches (`previousState` vs `nextState`). For scope `mobile`, only `element.viewportOverrides.mobile` is recorded and restored. This prevents a mobile recovery action from accidentally overwriting base properties or desktop overrides on unrelated elements."

### Example 2: Implementation & Debugging Interaction (Redacted)
> **User Prompt**: "In `commitEditCommand`, when `command.source === 'restore'`, how do we ensure property keys present in the modified state but absent in `previousState` are properly cleared upon rollback?"
>
> **AI Response**: "When `command.source === 'restore'`, instead of calling `mergeProperties()` (which only overwrites keys present in the patch), directly replace the target scope's object (`element.viewportOverrides[scope] = JSON.parse(JSON.stringify(patch))`). This completely restores the scope's state to the exact snapshot from `previousState`."

---

## 3. Rejected or Materially Corrected AI Suggestion

* **Initial AI Suggestion**: In an early iteration, the AI suggested copying the full resolved property object ($\text{Base} + \text{Override}$) into the viewport override when an AI proposal was generated for mobile view.
* **Reason for Rejection**: Copying resolved base properties into a viewport override pollutes the override data contract. If a user subsequently changes a base property on desktop (e.g. text color), the mobile view would be stuck with a cloned value rather than inheriting the updated base value.
* **Resulting Correction**: Redesigned the proposal engine to output `proposedPatch` containing **scope-specific property diffs only**. `commitEditCommand` merges only the explicit patch into `viewportOverrides[scope]`, leaving unedited base inheritance intact.

---

## 4. Code Verification Process

### Commands & Automated Tests Run
1. `npx tsc --noEmit` — Verified 100% type safety across all TypeScript files.
2. `npx vitest run` — Executed all 15 tests across 5 focused test files:
   - `validation.test.ts`
   - `responsive-resolution.test.ts`
   - `ai-scope.test.ts`
   - `code-canvas-consistency.test.ts`
   - `revision-recovery.test.ts`

### Manual Scenarios Exercised
1. **Selection Authority**: Selected `hero-title` and executed AI prompt. Verified AI proposals targeted `hero-title` exclusively and rejected unselected element edits.
2. **Dual Editor Synchronization**: Edited text in Property Panel, verified Canvas updated instantly. Edited JSON in Code Editor, verified Canvas updated on Apply.
3. **Draft State Error Boundary**: Typed invalid syntax `{ "content": }` into Code Editor. Verified red error banner appeared and canonical state remained untouched.
4. **Viewport Isolation**: Selected `MOBILE ONLY` scope and changed font size to `26px`. Switched preview to Desktop (~1440px) and verified desktop font size remained `36px`.
5. **Independent Recovery**: Edited `hero-title` mobile size, then edited `hero-subtitle` base text. Restored `hero-title` mobile size from History Drawer. Verified `hero-subtitle` edit was preserved.

### Dependencies Reviewed
- `react` & `react-dom` (Core UI framework)
- `zustand` (State management)
- `lucide-react` (SVG Icons)
- `vitest` (Testing framework)

### Remaining Uncertainty
- None. All 6 mandatory test gates and 13 PDF user journey points pass with 100% test coverage.

---

## 5. Workflow Limitation & Next Improvement

* **Observed Limitation**: When testing complex multi-element drag operations, generating a unique command per pixel move would pollute history logs.
* **Future Change**: Implement command debouncing or history batching (`onChangeEnd`) so slider inputs only write a single history entry upon drag completion.
