var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ul = document.querySelector("ul");
var input = document.querySelector("#new-todo-text");
var completedInput = document.querySelector("#new-todo-completed");
var addBtn = document.querySelector("#add-btn");
function getTodos() {
    try {
        return JSON.parse(localStorage.getItem("todos") || "[]");
    }
    catch (_a) {
        return [];
    }
}
function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function addTodo(text, completed) {
    var todos = getTodos();
    var newTodo = {
        id: Date.now(),
        text: text,
        completed: completed,
    };
    todos.push(newTodo);
    saveTodos(todos);
    displayTodos();
}
function removeTodo(id) {
    var todos = getTodos();
    var updated = todos.filter(function (t) { return t.id !== id; });
    saveTodos(updated);
    displayTodos();
}
function toggleTodo(id, completed) {
    var todos = getTodos();
    var updated = todos.map(function (t) { return (t.id === id ? __assign(__assign({}, t), { completed: completed }) : t); });
    saveTodos(updated);
    displayTodos();
}
function displayTodos() {
    if (!ul)
        return;
    ul.innerHTML = "";
    var todos = getTodos();
    if (todos.length === 0) {
        var empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "No tasks pending";
        ul.appendChild(empty);
        return;
    }
    todos.forEach(function (todo) {
        var li = document.createElement("li");
        li.className = "todo-item ".concat(todo.completed ? "completed" : "");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.checked = todo.completed;
        checkbox.onchange = function () { return toggleTodo(todo.id, checkbox.checked); };
        var text = document.createElement("span");
        text.className = "todo-text";
        text.textContent = todo.text;
        var deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "✖";
        deleteBtn.onclick = function () {
            alert("Are you sure you want to delete this todo?");
            removeTodo(todo.id);
        };
        li.append(checkbox, text, deleteBtn);
        ul.appendChild(li);
    });
}
if (addBtn) {
    addBtn.onclick = function () {
        var text = ((input === null || input === void 0 ? void 0 : input.value) || "").trim();
        if (!text)
            return;
        addTodo(text, !!(completedInput === null || completedInput === void 0 ? void 0 : completedInput.checked));
        if (input)
            input.value = "";
        if (completedInput)
            completedInput.checked = false;
    };
}
displayTodos();
