import type { Todo } from '../types/todo';
import type { ITodoRepository } from '../repositories/ITodoRepository';

export class TodoService {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.repository.getAll();
  }

  async addTodo(title: string): Promise<Todo> {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      throw new Error('Todo title cannot be empty');
    }
    return this.repository.create({ title: trimmedTitle });
  }

  async toggleTodo(id: string): Promise<Todo | null> {
    const todo = await this.repository.getById(id);
    if (!todo) return null;
    return this.repository.update(id, { completed: !todo.completed });
  }

  async removeTodo(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async updateTodoTitle(id: string, title: string): Promise<Todo | null> {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      throw new Error('Todo title cannot be empty');
    }
    return this.repository.update(id, { title: trimmedTitle });
  }
}
