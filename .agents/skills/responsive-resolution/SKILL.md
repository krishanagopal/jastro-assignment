# Responsive Resolution Skill

Define explicit resolution.

For a requested viewport:

1. Start with base/shared values.
2. Apply only that viewport's override.
3. Do not read another viewport override as current data.

Verify:

- base edits affect all views unless overridden
- desktop override affects desktop only
- tablet override affects tablet only
- mobile override affects mobile only
