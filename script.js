const TASK_STORAGE_KEY = 'daily-task-tracker.tasks';
const THEME_STORAGE_KEY = 'daily-task-tracker.theme';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');

let tasks = loadTasks();

function loadTasks() {
  const savedTasks = localStorage.getItem(TASK_STORAGE_KEY);

  if (!savedTasks) {
    return [
      { id: 1, text: 'Review your priorities for the day', completed: false },
      { id: 2, text: 'Break down the biggest task into steps', completed: true },
    ];
  }

  try {
    const parsedTasks = JSON.parse(savedTasks);
    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    console.warn('Unable to parse saved tasks:', error);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    const emptyState = document.createElement('li');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No tasks yet. Add your first one above.';
    taskList.appendChild(emptyState);
    return;
  }

  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `task-item${task.completed ? ' is-complete' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = 'task-check';
    checkbox.setAttribute('aria-label', `Mark task as ${task.completed ? 'incomplete' : 'complete'}`);
    checkbox.addEventListener('change', () => toggleTask(task.id, checkbox.checked));

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', `Delete task: ${task.text}`);
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  });
}

function addTask(event) {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (!text) {
    taskInput.focus();
    return;
  }

  tasks.unshift({
    id: Date.now(),
    text,
    completed: false,
  });

  saveTasks();
  renderTasks();
  taskForm.reset();
  taskInput.focus();
}

function toggleTask(taskId, completed) {
  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return { ...task, completed };
  });

  saveTasks();
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
}

function applyTheme(theme) {
  const isDarkMode = theme === 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-pressed', String(isDarkMode));
  themeToggle.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
  themeLabel.textContent = isDarkMode ? 'Light mode' : 'Dark mode';
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function initialiseTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDarkMode ? 'dark' : 'light');

  applyTheme(initialTheme);
}

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
});

taskForm.addEventListener('submit', addTask);

initialiseTheme();
renderTasks();
