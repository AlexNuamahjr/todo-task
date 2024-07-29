let todos = [];
let filter = "All";

const newTodo = document.querySelector("#new-todo");
const filterAll = document.querySelector("#filter-all");
const filterActive = document.querySelector("#filter-active");
const filterCompleted = document.querySelector("#filter-completed");
const clearCompleted = document.querySelector("#clear-completed");
const todoList = document.querySelector("#todo-list");
const itemsLeft = document.querySelector("#items-left");
const toggledTheme = document.querySelector("#toggled-theme");

toggledTheme.addEventListener("click", function(){
  document.body.classList.toggle("dark");
})

newTodo.addEventListener("keypress", function(e) {
  if (e.key === "Enter" && this.value.trim()) {
    addTodo(this.value.trim());
    this.value = "";
  }
});

document.addEventListener("DOMContentLoaded", function(){
  const filterButtons = document.querySelectorAll(".filter-buttons");
  filterButtons.forEach(filterButton => {
    filterButton.addEventListener("click", function(){
      filterButtons.forEach(btn => btn.classList.remove("selected"));
      this.classList.add("selected")
    })
  })
})
filterAll.addEventListener("click", () => setFilter("All"));
filterActive.addEventListener("click", () => setFilter("Active"));
filterCompleted.addEventListener("click", () => setFilter("Completed"));
clearCompleted.addEventListener("click", clearedCompleted);

// Function to add a new todo
function addTodo(text) {
  todos.push({ text, completed: false });
  renderTodos();
}

// Function to clear completed todos
function clearedCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
}

// Function to set the current filter
function setFilter(newFilter) {
  filter = newFilter;
  renderTodos();
}

// Function to toggle the completed status of a todo
function toggleCompleted(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}



// Function to render the todos based on the current filter
function renderTodos() {
  const filteredTodos = todos.filter(todo => {
    if (filter === "All") return true;
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
  });

  const todoList = document.getElementById('todo-list');
  const itemsLeft = document.getElementById('items-left');

  todoList.innerHTML = filteredTodos
    .map(
      (todo, index) => `
      <li class="flex items-center justify-between mb-4 p-2 rounded-lg ${todo.completed ? ' dark:bg-gray-600' : ' dark:bg-gray-700'} shadow-sm" data-id="${index}">
        <label class="flex items-center">
          <input type="checkbox" class="mr-3" ${todo.completed ? 'checked' : ''} onclick="toggleCompleted(${index})">
          <span class="${todo.completed ? 'line-through text-gray-400' : ''} dark:text-white">${todo.text}</span>
        </label>
      </li>
      <hr class="dark:border-gray-700">
    `
    )
    .join("");

  itemsLeft.innerHTML = `
      ${todos.filter((todo) => !todo.completed).length} items left
  `;
}
renderTodos();
