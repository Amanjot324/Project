const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));
app.use(express.json());

let tasks = [];

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
  const task = { id: uuidv4(), ...req.body };
  tasks.push(task);
  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);
  res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
