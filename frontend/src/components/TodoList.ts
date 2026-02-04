import type { Todo } from '../types/todo';
import { createTodoItem, type TodoItemCallbacks } from './TodoItem';

export function createTodoList(todos: Todo[], callbacks: TodoItemCallbacks): HTMLUListElement {
  const ul = document.createElement('ul');
  ul.className = 'todo-list';

  if (todos.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.className = 'todo-empty';
    emptyLi.textContent = 'No todos yet. Add one above!';
    ul.appendChild(emptyLi);
  } else {
    todos.forEach((todo) => {
      ul.appendChild(createTodoItem(todo, callbacks));
    });
  }

  return ul;
}
