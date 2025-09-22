const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks
window.onload = () => {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.completed));
};

function addTask() {
  if (taskInput.value.trim() === "") return;

  renderTask(taskInput.value, false);
  saveTasks();
  taskInput.value = "";
}

function renderTask(taskText, completed) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (completed) li.classList.add("completed");

  // Toggle complete
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "×";
  deleteBtn.classList.add("delete");
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.childNodes[0].nodeValue,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}