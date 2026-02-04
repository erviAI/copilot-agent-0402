# Architecture Overview

This document describes the architecture and design patterns used in the Todo App.

## Project Structure

```
frontend/
├── src/
│   ├── main.ts              # Application entry point
│   ├── style.css            # Global styles
│   ├── components/          # UI components
│   │   ├── TodoForm.ts      # Form for adding new todos
│   │   ├── TodoItem.ts      # Individual todo item component
│   │   └── TodoList.ts      # Container for todo items
│   ├── repositories/        # Data access layer
│   │   ├── ITodoRepository.ts           # Repository interface
│   │   └── LocalStorageTodoRepository.ts # LocalStorage implementation
│   ├── services/            # Business logic layer
│   │   └── TodoService.ts   # Todo operations and validation
│   └── types/               # TypeScript type definitions
│       └── todo.ts          # Todo-related types and DTOs
├── public/                  # Static assets
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Layered Architecture

The application follows a layered architecture pattern that separates concerns and promotes maintainability:

```
┌─────────────────────────────────────┐
│           Components                │  ← UI Layer
│  (TodoForm, TodoList, TodoItem)     │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│           TodoService               │  ← Service Layer
│    (Business logic & validation)    │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│         ITodoRepository             │  ← Repository Layer
│   (LocalStorageTodoRepository)      │
└─────────────────────────────────────┘
```

### 1. UI Layer (Components)

The components are responsible for rendering the user interface and handling user interactions. They are pure functions that create DOM elements.

- **TodoForm** - Handles user input for creating new todos
- **TodoList** - Renders the list of todos
- **TodoItem** - Displays individual todo items with toggle and delete actions

Components communicate with the service layer through callbacks passed as props.

### 2. Service Layer

The `TodoService` contains all business logic and validation:

- Validates todo titles (non-empty, trimmed)
- Orchestrates CRUD operations
- Acts as a facade over the repository layer

This layer ensures that business rules are enforced regardless of which UI or data source is used.

### 3. Repository Layer

The repository pattern abstracts data persistence:

- **ITodoRepository** - Interface defining the contract for data operations
- **LocalStorageTodoRepository** - Implementation that persists data to browser LocalStorage

This abstraction allows easy swapping of storage implementations (e.g., switching to an API backend) without changing service or component code.

## Data Types

### Todo Entity

```typescript
interface Todo {
  id: string;           // Unique identifier (UUID)
  title: string;        // Todo description
  completed: boolean;   // Completion status
  createdAt: Date;      // Creation timestamp
}
```

### Data Transfer Objects (DTOs)

- **CreateTodoDTO** - Data needed to create a new todo (just `title`)
- **UpdateTodoDTO** - Partial data for updating a todo (`title` and/or `completed`)

## Design Patterns

### Repository Pattern

The repository pattern provides a clean separation between the data access logic and the business logic. The `ITodoRepository` interface defines the contract:

```typescript
interface ITodoRepository {
  getAll(): Promise<Todo[]>;
  getById(id: string): Promise<Todo | null>;
  create(data: CreateTodoDTO): Promise<Todo>;
  update(id: string, data: UpdateTodoDTO): Promise<Todo | null>;
  delete(id: string): Promise<boolean>;
}
```

### Dependency Injection

The `TodoService` receives its repository through constructor injection, making it easy to test and swap implementations:

```typescript
const repository = new LocalStorageTodoRepository();
const todoService = new TodoService(repository);
```

### Component Factory Pattern

UI components are created using factory functions that accept configuration and callbacks:

```typescript
const form = createTodoForm({
  onSubmit: async (title) => {
    await todoService.addTodo(title);
    render();
  },
});
```

## Extending the Application

### Adding a New Storage Backend

1. Create a new class implementing `ITodoRepository`
2. Inject the new repository into `TodoService`

Example for an API backend:

```typescript
class ApiTodoRepository implements ITodoRepository {
  async getAll(): Promise<Todo[]> {
    const response = await fetch('/api/todos');
    return response.json();
  }
  // ... implement other methods
}
```

### Adding New Features

1. Add types to `types/todo.ts` if needed
2. Extend `ITodoRepository` interface if new data operations are required
3. Implement the new operations in the repository
4. Add business logic to `TodoService`
5. Create or update components to expose the feature in the UI
