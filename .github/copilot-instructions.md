# Copilot Instructions for Todo App

## Architecture Overview

This is a **TypeScript + Vite** frontend app using a **layered architecture** with three tiers:

```
Components (UI) → TodoService (Business Logic) → ITodoRepository (Data Access)
```

All code resides in `frontend/src/`. The app uses **dependency injection** - `TodoService` receives its repository via constructor, enabling easy backend swaps.

## Key Patterns

### Repository Pattern
Data access is abstracted through `ITodoRepository` interface in [frontend/src/repositories/ITodoRepository.ts](frontend/src/repositories/ITodoRepository.ts). To add a new storage backend:
1. Create a class implementing `ITodoRepository`
2. Inject it into `TodoService` in [frontend/src/main.ts](frontend/src/main.ts)

### Component Factory Functions
UI components are **pure factory functions** returning DOM elements, not classes:
```typescript
// Pattern: createXxx(data, callbacks) → HTMLElement
export function createTodoItem(todo: Todo, callbacks: TodoItemCallbacks): HTMLLIElement
```

Components receive callbacks for user actions—never directly import services.

### Type Definitions
- Define types in `frontend/src/types/` 
- Use DTOs: `CreateTodoDTO` for creation, `UpdateTodoDTO` for partial updates
- Use `Pick<>` and `Partial<Omit<>>` for DTO derivation (see [frontend/src/types/todo.ts](frontend/src/types/todo.ts))

## Code Conventions

### Imports
- Use `type` keyword for type-only imports: `import type { Todo } from '../types/todo'`
- Relative paths within `src/`; no path aliases configured

### Async/Await
All repository methods return `Promise<T>` even for sync operations (LocalStorage). This ensures consistent API when swapping to async backends.

### Validation
Business validation belongs in `TodoService`, not components or repositories. Example: title trimming and empty-check in `addTodo()`.

### CSS Classes
Components set semantic class names matching component purpose:
- `.todo-form`, `.todo-input`, `.todo-submit`
- `.todo-list`, `.todo-item`, `.todo-checkbox`, `.todo-title`, `.todo-delete`
- `.completed` modifier for done items

## Developer Workflow

### Commands (run from `frontend/` directory)
```bash
npm install      # Install dependencies
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Type-check + production build → dist/
npm run preview  # Preview production build
```

### TypeScript
- Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`
- Target ES2022; uses `verbatimModuleSyntax` (explicit `type` imports required)

## File Organization

| Directory | Purpose |
|-----------|---------|
| `components/` | UI factory functions (DOM manipulation) |
| `services/` | Business logic, validation, orchestration |
| `repositories/` | Data persistence abstraction |
| `types/` | Shared TypeScript interfaces and DTOs |

## Extending the App

### Adding a new entity (e.g., "Project")
1. Define types in `types/project.ts` (entity + DTOs)
2. Create `IProjectRepository` interface in `repositories/`
3. Implement repository (e.g., `LocalStorageProjectRepository`)
4. Create `ProjectService` with injected repository
5. Build component factories in `components/`
6. Wire up in `main.ts`
