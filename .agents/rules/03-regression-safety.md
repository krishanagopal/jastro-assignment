# Regression Safety Rules

Before changes:

- inspect relevant implementation
- inspect dependencies
- identify consumers

After changes:

- inspect final diff
- check related functionality
- identify high-risk shared systems

High-risk areas include:

- canonical state
- shared components
- routing
- APIs
- persistence
- viewport resolution
- history
