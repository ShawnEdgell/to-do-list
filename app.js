// Define an array to store tasks
let tasks = [];

// Function to add a new task
function addTask(task) {
    tasks.push(task);
    displayTasks();
}

function displayTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  // Reverse the tasks array
  const reversedTasks = tasks.slice().reverse();

  reversedTasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.className = 'todo-card';
      taskItem.textContent = task;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.className = 'remove-button';

      // Add a click event listener to remove the task
      removeButton.addEventListener('click', () => {
          removeTask(index);
      });

      taskItem.appendChild(removeButton);
      todoList.appendChild(taskItem);
  });
}

// Function to remove a task
function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// Function to open the add task form with animation
function openTodoForm() {
  const todoForm = document.getElementById('todo-form');
  todoForm.style.maxHeight = '500px'; // Set the maximum height as per your design
  todoForm.style.display = 'block';
}

// Function to close the add task form with animation
function closeTodoForm() {
  const todoForm = document.getElementById('todo-form');
  todoForm.style.maxHeight = '0'; // Set the maximum height to 0 to close it
  setTimeout(() => {
      todoForm.style.display = 'none';
  }, 300); // Delay removal of the form for a smooth animation
}

// Event listener for clicking the "Add Task" button
document.getElementById('new-todo-button').addEventListener('click', () => {
    openTodoForm();
});

// Event listener for clicking the "Cancel" button in the form
document.querySelector('.close-form-button').addEventListener('click', () => {
    closeTodoForm();
});

// Event listener for submitting the add task form
document.getElementById('add-todo-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const taskMessage = document.getElementById('todo-message').value;
    if (taskMessage.trim() !== '') {
        addTask(taskMessage);
        document.getElementById('todo-message').value = '';
    }
});


