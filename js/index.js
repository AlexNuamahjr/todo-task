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

  todoList.innerHTML = filteredTodos
    .map(
      (todo, index) => `
      <li class="flex items-center justify-between mb-4 p-2 rounded-lg ${todo.completed ? ' dark:bg-gray-600' : ' dark:bg-gray-700'} shadow-sm" data-id="${index}" draggable="true" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="drop(event)">
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

// Drag and Drop Handlers
let dragSrcEl = null;

function dragStart(e) {
  dragSrcEl = e.target;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.target.outerHTML);
  e.target.classList.add('dragElem');
}

function dragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function drop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl != e.target) {    
    dragSrcEl.outerHTML = e.target.outerHTML;
    e.target.outerHTML = e.dataTransfer.getData('text/html');
    const newTodos = Array.from(todoList.querySelectorAll('li')).map((li) => {
      const index = parseInt(li.getAttribute('data-id'));
      return todos[index];
    });
    todos = newTodos;
    renderTodos();
  }
  return false;
}
renderTodos();
