# Edit Command Pipeline Rules

Every committed edit must identify:

- source
- target IDs
- viewport scope
- base revision
- typed property changes

Every committed edit must pass:

1. Structural validation
2. ID validation
3. Selection validation when applicable
4. Editable field validation
5. Viewport validation
6. Revision validation
7. Commit

No editing surface may bypass this pipeline.
