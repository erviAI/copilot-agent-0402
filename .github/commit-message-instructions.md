# Commit Message Instructions

Write commit messages following the Conventional Commits specification:

## Format

```
<type>(<scope>): <subject>

<body>
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

## Rules

1. Use the imperative mood in the subject line (e.g., "add feature" not "added feature")
2. Do not capitalize the first letter of the subject
3. Do not end the subject line with a period
4. Limit the subject line to 50 characters
5. Separate subject from body with a blank line
6. Wrap the body at 72 characters
7. Use the body to explain what and why, not how

## Scope

Use the following scopes when applicable:
- **frontend**: Changes to the frontend application
- **backend**: Changes to the backend API (future)
- **types**: Changes to type definitions
- **repo**: Changes to repository layer
- **service**: Changes to service layer
- **ui**: Changes to UI components

## Examples

```
feat(frontend): add todo app with repository pattern

Implement vanilla TypeScript todo application using Vite.
Includes LocalStorage repository for client-side persistence.
```

```
fix(ui): correct checkbox toggle behavior
```

```
refactor(service): extract validation to separate method
```
