// Initialize an array to hold to-do list items
let toDoListArray = [];

// Get task input and task list elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.querySelector('button');

// Load tasks from local storage when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (storedTasks.length > 0) {
        toDoListArray = storedTasks;
        storedTasks.forEach(task => {
            appendTaskToList(task);
        });
    }
});

// Add event listener to the form for submit event
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const toDoItem = taskInput.value.trim();
    if (toDoItem !== '') {
        const newTask = {
            id: String(Date.now()),
            text: toDoItem
        };

        toDoListArray.push(newTask);
        appendTaskToList(newTask);
        saveTasksToLocalStorage();

        taskInput.value = '';
    }
});

// Function to append a task to the task list
function appendTaskToList(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    taskList.appendChild(li);
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(toDoListArray));
}

// Add event listener to the Add Task button for click event
addButton.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = {
            id: String(Date.now()),
            text: taskText
        };

        toDoListArray.push(newTask);
        appendTaskToList(newTask);
        saveTasksToLocalStorage();

        taskInput.value = '';
    }
}

// Add event listener to the input field for keypress event (Enter key)
taskInput.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) { // Check if Enter key is pressed
        addButton.click(); // Simulate a click on the Add Task button
    }
});

// Function to copy tasks as plain text
function copyTasks() {
    const tasksText = toDoListArray.map(task => task.text).join('\n');
    navigator.clipboard.writeText(tasksText)
        .then(() => {
            alert('Tasks copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy tasks: ', err);
        });
}
