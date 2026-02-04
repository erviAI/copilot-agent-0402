export interface TodoFormCallbacks {
  onSubmit: (title: string) => void;
}

export function createTodoForm(callbacks: TodoFormCallbacks): HTMLFormElement {
  const form = document.createElement('form');
  form.className = 'todo-form';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'todo-input';
  input.placeholder = 'What needs to be done?';
  input.autofocus = true;

  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'todo-submit';
  button.textContent = 'Add';

  form.appendChild(input);
  form.appendChild(button);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = input.value.trim();
    if (title) {
      callbacks.onSubmit(title);
      input.value = '';
    }
  });

  return form;
}
