import './style.css';
import { LocalStorageTodoRepository } from './repositories/LocalStorageTodoRepository';
import { TodoService } from './services/TodoService';
import { createTodoForm } from './components/TodoForm';
import { createTodoList } from './components/TodoList';

// Initialize repository and service
const repository = new LocalStorageTodoRepository();
const todoService = new TodoService(repository);

const app = document.querySelector<HTMLDivElement>('#app')!;

async function render(): Promise<void> {
  const todos = await todoService.getAllTodos();

  // Clear and rebuild the app
  app.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'todo-container';

  const header = document.createElement('h1');
  header.textContent = 'Todo App';
  container.appendChild(header);

  const form = createTodoForm({
    onSubmit: async (title) => {
      await todoService.addTodo(title);
      render();
    },
  });
  container.appendChild(form);

  const list = createTodoList(todos, {
    onToggle: async (id) => {
      await todoService.toggleTodo(id);
      render();
    },
    onDelete: async (id) => {
      await todoService.removeTodo(id);
      render();
    },
  });
  container.appendChild(list);

  app.appendChild(container);
}

// Initial render
render();
