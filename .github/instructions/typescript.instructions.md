---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript Instructions

## General Rules

- Use **strict mode** (`"strict": true` in tsconfig.json)
- Prefer `interface` over `type` for object shapes (unless union types needed)
- Use `type` keyword for type-only imports: `import type { Foo } from './types'`
- Avoid `any`—use `unknown` when type is uncertain, then narrow with type guards

