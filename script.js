const input = document.querySelector(".entered-list");
const addBtn = document.querySelector(".add-list");
const tasks = document.querySelector(".tasks");

// Enable the Add button when input is not empty
input.addEventListener("input", () => {
  addBtn.disabled = input.value.trim().length === 0;
  addBtn.classList.toggle("active", input.value.trim().length !== 0);
});

// Add a new task
function addTask() {
  if (input.value.trim()) {
    const newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.innerHTML = `
            <input type="checkbox" class="task-complete" />
            <div id="content">
                <p id="text">${input.value}</p>
                <input type="text" id="editInput" />
            </div>
            <button class="editButton"><i class="fa-solid fa-pen-to-square"></i></button>
            <i class="fa-solid fa-xmark"></i>
        `;
    tasks.appendChild(newItem);
    input.value = "";
    addBtn.disabled = true;
    addBtn.classList.remove("active");
  } else {
    alert("Please enter a task.");
  }
}

// Add task on button click
addBtn.addEventListener("click", addTask);

// Add task on Enter key press
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Handle task actions
tasks.addEventListener("click", (e) => {
  const target = e.target;

  // Delete task
  if (target.classList.contains("fa-xmark")) {
    target.closest(".item").remove();
  }

  // Edit task
  if (target.closest(".editButton")) {
    const editButton = target.closest(".editButton");
    const contentDiv = editButton.previousElementSibling;
    const textElement = contentDiv.querySelector("#text");
    const inputElement = contentDiv.querySelector("#editInput");

    if (editButton.innerHTML.includes("fa-pen-to-square")) {
      inputElement.value = textElement.textContent;
      textElement.style.display = "none";
      inputElement.style.display = "block";
      editButton.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
    } else {
      textElement.textContent = inputElement.value;
      textElement.style.display = "block";
      inputElement.style.display = "none";
      editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    }
  }

  // Save edits on Enter key press
  tasks.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.id === "editInput") {
      const inputElement = e.target;
      const contentDiv = inputElement.parentElement;
      const textElement = contentDiv.querySelector("#text");
      const editButton = contentDiv.nextElementSibling;

      // Save changes
      textElement.textContent = inputElement.value;
      textElement.style.display = "block";
      inputElement.style.display = "none";
      editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    }
  });

  // Mark task as complete
  if (target.classList.contains("task-complete")) {
    const taskContent = target.nextElementSibling.querySelector("#text");
    taskContent.classList.toggle("completed", target.checked);
  }
});
