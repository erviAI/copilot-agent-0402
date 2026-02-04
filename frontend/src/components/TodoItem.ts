import type { Todo } from '../types/todo';

export interface TodoItemCallbacks {
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function createTodoItem(todo: Todo, callbacks: TodoItemCallbacks): HTMLLIElement {
  const li = document.createElement('li');
  li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
  li.dataset.id = todo.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.className = 'todo-checkbox';
  checkbox.addEventListener('change', () => callbacks.onToggle(todo.id));

  const titleSpan = document.createElement('span');
  titleSpan.className = 'todo-title';
  titleSpan.textContent = todo.title;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'todo-delete';
  deleteBtn.textContent = '×';
  deleteBtn.addEventListener('click', () => callbacks.onDelete(todo.id));

  li.appendChild(checkbox);
  li.appendChild(titleSpan);
  li.appendChild(deleteBtn);

  return li;
}
