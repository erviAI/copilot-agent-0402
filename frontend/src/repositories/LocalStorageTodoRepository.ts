import type { Todo, CreateTodoDTO, UpdateTodoDTO } from '../types/todo';
import type { ITodoRepository } from './ITodoRepository';

const STORAGE_KEY = 'todos';

interface StoredTodo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export class LocalStorageTodoRepository implements ITodoRepository {
  private getTodos(): Todo[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const stored: StoredTodo[] = JSON.parse(data);
    return stored.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));
  }

  private saveTodos(todos: Todo[]): void {
    const toStore: StoredTodo[] = todos.map((todo) => ({
      ...todo,
      createdAt: todo.createdAt.toISOString(),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }

  async getAll(): Promise<Todo[]> {
    return this.getTodos();
  }

  async getById(id: string): Promise<Todo | null> {
    const todos = this.getTodos();
    return todos.find((todo) => todo.id === id) ?? null;
  }

  async create(data: CreateTodoDTO): Promise<Todo> {
    const todos = this.getTodos();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: data.title,
      completed: false,
      createdAt: new Date(),
    };
    todos.push(newTodo);
    this.saveTodos(todos);
    return newTodo;
  }

  async update(id: string, data: UpdateTodoDTO): Promise<Todo | null> {
    const todos = this.getTodos();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;

    todos[index] = { ...todos[index], ...data };
    this.saveTodos(todos);
    return todos[index];
  }

  async delete(id: string): Promise<boolean> {
    const todos = this.getTodos();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;

    todos.splice(index, 1);
    this.saveTodos(todos);
    return true;
  }
}
