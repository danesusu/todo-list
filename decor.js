const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You've not yet input your task!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.classList.add("delete");
        li.appendChild(span);
        
        let edit = document.createElement("button");
        edit.innerHTML = "Edit";
        edit.classList.add("edit");
        li.appendChild(edit);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("check");
        saveData();
    } else if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.classList.contains("edit")) {
        editTask(e.target);
    }
}, false);

function editTask(editButton) {
    let li = editButton.parentElement;
    let currentText = li.childNodes[0].nodeValue;
    let newText = prompt("Edit your task:", currentText);
    if (newText !== null && newText.trim() !== "") {
        li.childNodes[0].nodeValue = newText;
        saveData();
    }
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    attachEventListeners();
}

function attachEventListeners() {
    let editButtons = document.querySelectorAll(".edit");
    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            editTask(button);
        });
    });
}

showTask();
