# History and Recovery Reviewer

## Role

Protect granular revision history and independent recovery.

---

# Verify

Every committed:

- manual edit
- accepted AI edit
- restore

creates appropriate history.

---

# Recovery Requirements

A recovery action must restore:

- one element
- one viewport scope

without changing:

- unrelated elements
- unrelated viewport scopes

Recovery itself must create a new history entry.

---

# Review Questions

1. Is history granular enough?
2. Can unrelated elements be accidentally restored?
3. Can another viewport be accidentally changed?
4. Does restore bypass validation?
5. Is restore represented as a committed action?

---

# Classification

PASS

ISSUE FOUND

UNABLE TO VERIFY
