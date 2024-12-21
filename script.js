document.getElementById("add-task").addEventListener("click", addTask);

function addTask() {
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;
  const date = document.getElementById("task-date").value;

  if (!title || !description || !date) {
    alert("Please fill in all fields");
    return;
  }

  const task = { title, description, date };

  fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  })
  .then(response => response.json())
  .then(data => {
    renderTask(data);
  })
  .catch(err => console.error(err));

  document.getElementById("task-title").value = "";
  document.getElementById("task-desc").value = "";
  document.getElementById("task-date").value = "";
}

function renderTask(task) {
  const tasksList = document.getElementById("tasks");
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${task.title}</strong> (${task.date})<br>
    ${task.description}
    <button onclick="deleteTask('${task.id}')">Delete</button>
  `;
  tasksList.appendChild(li);
}

function deleteTask(id) {
  fetch(`/tasks/${id}`, { method: "DELETE" })
    .then(() => {
      const tasksList = document.getElementById("tasks");
      tasksList.innerHTML = "";
      loadTasks();
    })
    .catch(err => console.error(err));
}

function loadTasks() {
  fetch("/tasks")
    .then(response => response.json())
    .then(data => {
      data.forEach(task => renderTask(task));
    })
    .catch(err => console.error(err));
}

// Initial Load
loadTasks();
