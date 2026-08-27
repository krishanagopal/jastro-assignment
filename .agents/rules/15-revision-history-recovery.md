# Revision History and Recovery Rules

Every committed:

- manual edit
- accepted AI edit
- restore

creates history.

Recovery must be:

- per element
- per viewport scope

Recovery must not alter unrelated:

- elements
- viewports

Restore is itself a committed action and must create
a new history entry.
