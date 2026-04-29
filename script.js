let tasks = [];
let id = 1;

function addTask() {
  let name = document.getElementById("taskName").value;
  let priority = document.getElementById("priority").value;
  let isImportant = document.getElementById("important").checked;
  let isCompleted = document.getElementById("completed").checked;

  if (name.trim() === "") {
    alert("Task cannot be empty!");
    return;
  }

  let task = {
    id: id++,
    name: name,
    priority: priority,
    isImportant: isImportant,
    isCompleted: isCompleted,
    date: new Date().toLocaleDateString()
  };

  tasks.push(task);

  document.getElementById("taskName").value = "";
  document.getElementById("important").checked = false;
  document.getElementById("completed").checked = false;

  renderTasks();
  console.log(JSON.stringify(tasks, null, 2));
}

function renderTasks() {
  let output = "";

  for (let i = 0; i < tasks.length; i++) {
    output += `
      <div class="task" id="task-${tasks[i].id}">
        <p><b>${tasks[i].name}</b></p>
        <p>Priority: ${tasks[i].priority}</p>
        <p>Date: ${tasks[i].date}</p>

        <button onclick="toggleTask(${tasks[i].id})">Toggle</button>
        <button onclick="deleteTask(${tasks[i].id})">Delete</button>
      </div>
    `;
  }

  document.getElementById("taskmanager").innerHTML = output;

  applyStyles();
}

function applyStyles() {
  for (let i = 0; i < tasks.length; i++) {
    let t = document.getElementById("task-" + tasks[i].id);


    t.style.backgroundColor = "white";
    t.style.textDecoration = "none";
    t.style.opacity = "1";

    // High priority
    if (tasks[i].priority === "High") {
      t.style.backgroundColor = "#ffd6d6";
    }
    else if (tasks[i].priority === "Medium") {
      t.style.backgroundColor = "#fff3cd";
    }
    else {
      t.style.backgroundColor = "#d6eaff";
    }

    // Importat = Even more red
    if (tasks[i].isImportant) {
      t.style.backgroundColor = "#290505";
    }

    // Strickthrough --> completed
    if (tasks[i].isCompleted) {
      t.style.textDecoration = "line-through";
      t.style.opacity = "0.6";
    }
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
  console.log(JSON.stringify(tasks, null, 2));
}

function toggleTask(id) {
  for (let t of tasks) {
    if (t.id === id) {
      t.isCompleted = !t.isCompleted;
    }
  }

  renderTasks();
  console.log(JSON.stringify(tasks, null, 2));
}