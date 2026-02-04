import type { Todo, CreateTodoDTO, UpdateTodoDTO } from '../types/todo';

export interface ITodoRepository {
  getAll(): Promise<Todo[]>;
  getById(id: string): Promise<Todo | null>;
  create(data: CreateTodoDTO): Promise<Todo>;
  update(id: string, data: UpdateTodoDTO): Promise<Todo | null>;
  delete(id: string): Promise<boolean>;
}
