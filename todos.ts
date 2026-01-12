const ul = document.querySelector("ul") as HTMLUListElement | null;
const input = document.querySelector(
  "#new-todo-text"
) as HTMLInputElement | null;
const completedInput = document.querySelector(
  "#new-todo-completed"
) as HTMLInputElement | null;
const addBtn = document.querySelector("#add-btn") as HTMLButtonElement | null;

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function getTodos(): Todo[] {
  try {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(text: string, completed: boolean): void {
  const todos = getTodos();

  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed,
  };

  todos.push(newTodo);
  saveTodos(todos);
  displayTodos();
}

function removeTodo(id: number): void {
  const todos = getTodos();
  const updated = todos.filter((t) => t.id !== id);
  saveTodos(updated);
  displayTodos();
}

function toggleTodo(id: number, completed: boolean): void {
  const todos = getTodos();
  const updated = todos.map((t) => (t.id === id ? { ...t, completed } : t));
  saveTodos(updated);
  displayTodos();
}

function displayTodos(): void {
  if (!ul) return;
  ul.innerHTML = "";

  const todos = getTodos();
  if (todos.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No tasks pending";
    ul.appendChild(empty);
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = () => toggleTodo(todo.id, checkbox.checked);

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✖";
    deleteBtn.onclick = () => {
      alert("Are you sure you want to delete this todo?");
      removeTodo(todo.id);
    };

    li.append(checkbox, text, deleteBtn);
    ul.appendChild(li);
  });
}

if (addBtn) {
  addBtn.onclick = () => {
    const text = (input?.value || "").trim();
    if (!text) return;

    addTodo(text, !!completedInput?.checked);
    if (input) input.value = "";
    if (completedInput) completedInput.checked = false;
  };
}

displayTodos();
