const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

// 1. generateUniqueId
function generateUniqueId() {
  const time = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `${time}${random}`;
}

// 2. addTodo
function addTodo() {
  const text = prompt("Enter a to-do: ");

  if (!text || text.trim() === "") {
    // reject empty
    return;
  }

  todos.push({
    id: generateUniqueId(),
    text: text.trim(),
    isCompleted: false,
  });
}

// 3. markTodoCompleted
function markTodoCompleted() {
  // display list
  listTodos();

  const input = prompt("Enter the NUMBER of the to-do to mark as completed: ");
  const num = parseInt(input);

  if (isNaN(num) || num < 1 || num > todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const todo = todos[num - 1];

  if (todo.isCompleted) {
    console.log(`To-do "${todo.text}" is already completed.`);
    return;
  }

  todo.isCompleted = true;
  console.log(`To-do "${todo.text}" marked as completed.`);
}

// 4. deleteTodo
function deleteTodo() {
  listTodos();

  const input = prompt("Enter the NUMBER of the to-do to delete: ");
  const num = parseInt(input);

  if (isNaN(num) || num < 1 || num > todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const deleted = todos.splice(num - 1, 1)[0];
  console.log(`To-do "${deleted.text}" deleted.`);
}

// 5. listTodos
function listTodos() {
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    return;
  }

  todos.forEach((todo, index) => {
    const status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
    console.log(`${index + 1}. ${status} | ${todo.text}`);
  });
}

// 6. runTodoApp 
function runTodoApp() {
  while (true) {
    const cmd = prompt("Command: ");

    switch (cmd) {
      case "add":
      case "1":
        addTodo();
        break;

      case "complete":
      case "2":
        markTodoCompleted();
        break;

      case "delete":
      case "3":
        deleteTodo();
        break;

      case "list":
      case "4":
        listTodos();
        break;

      case "exit":
      case "5":
        return;

      default:
        // Test pengujian tanpa terjadi crush
        break;
    }
  }
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
