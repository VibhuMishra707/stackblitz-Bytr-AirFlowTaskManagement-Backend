const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;

// ********** DATA **********
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

// Endpoint - 1 (Add a Task to the Task List)

function addNewTask(tasks, task) {
  tasks.push(task);
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);

  let task = { taskId: taskId, text: text, priority: priority };

  let result = addNewTask(tasks, task);

  res.json(tasks);
});

// Path = /tasks/add?taskId=4&text=Review%20code&priority=1

// Endpoint - 2 (Read All Tasks in the Task List)

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Endpoint - 3 (Sort Tasks by Priority)

function sortTaskByPriority(task1, task2) {
  return task1.priority - task2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.sort(sortTaskByPriority);
  res.json(result);
});

// Endpoint - 4 (Edit task by Priority)

function editTaskPriority(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; ++i) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
      break;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);

  let result = editTaskPriority(tasks, taskId, priority);

  res.json(result);
});

// Path = /tasks/edit-priority?taskId=1&priority=1

// Endpoint - 5 ( Edit/Update Task Text )

function editUpdateTask(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; ++i) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
      break;
    }
  }
  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;

  let result = editUpdateTask(tasks, taskId, text);

  res.json(result);
});

// Path = /tasks/edit-text?taskId=3&text=Update%20documentation

// Endpoint - 6 (Delete a Task from the Task List)

function shouldDeleteTaskFromTasks(task, taskId) {
  return task.taskId !== taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);

  let result = tasks.filter((task) => shouldDeleteTaskFromTasks(task, taskId));

  res.json(result);
});

// Path = /tasks/delete?taskId=2

// Endpoint - 7 (Filter Tasks by Priority)

function filterByPriority(task, priority) {
  return task.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);

  let result = tasks.filter((task) => filterByPriority(task, priority));

  res.json(result);
});

// Path = /tasks/filter-by-priority?priority=1

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
