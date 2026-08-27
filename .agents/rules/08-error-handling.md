# Error Handling Rules

Never silently ignore errors.

Do not:

- use empty catch blocks
- suppress failures
- ignore rejected promises
- hide test failures

Invalid input must fail safely.

For this assignment specifically ensure:

- invalid code preserves last valid state
- invalid AI proposals do not reach current state
- stale revisions fail safely
- unknown IDs fail safely
- forbidden fields fail safely
