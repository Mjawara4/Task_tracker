// Section 1: App State Variables
let tasks = [];

// Section 2: Cached Element References
const taskForm = document.getElementById("taskForm");
const taskTable = document.getElementById("taskTable").getElementsByTagName('tbody')[0];

// Section 3: Functions and Event Listeners
// Function to handle form submissions
function handleSubmission(event) {
    event.preventDefault();
    
    // Get form input values
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDeadline = document.getElementById('taskDeadline').value;
    
    // Validate input fields
    if (!taskName || !taskDeadline) {
        alert('Task name and deadline are required!');
        return;
    }
    
    // Update the tasks array
    tasks.push({ 
        name: taskName, 
        description: taskDescription, 
        deadline: taskDeadline,
        completed: false
    });
    
    // Clear form fields
    taskForm.reset();
    
    // Render the updated task list
    render();
}

// Function to render tasks in the table
function render() {
    taskTable.innerHTML = tasks.map((task, index) => `
        <tr class="${task.completed ? 'completed' : ''}">
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.deadline}</td>
            <td>
                <button class="btn btn-complete" onclick="markTaskComplete(${index})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="btn btn-remove" onclick="removeTask(${index})">Remove</button>
            </td>
        </tr>
    `).join('');
}

// Function to mark a task as complete
function markTaskComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    render();
}

// Function to remove a task
function removeTask(index) {
    tasks.splice(index, 1);
    render();
}

// Function to initialize the table
function init() {
    taskTable.innerHTML = ''; // Clear the table
    tasks = []; // Reset the tasks array
    render(); // Call the render function
}

// Event listener for form submission
taskForm.addEventListener('submit', handleSubmission);

// Call the init function to set up the initial state of the app
init();