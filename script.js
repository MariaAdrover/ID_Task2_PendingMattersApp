const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

/* We wait for the browser to loaded the page to associate events 
   with the two buttons in the document */
window.onload = function () {
  document.getElementById("createNewTodo").onclick = function () {
    createNewTodo();
  }
  document.getElementById("deleteChecked").onclick = function () {
    deleteCheckedTasks();
  }
}

// -----> Called when clicking the button #createNewTodo
// Function to create the new tasks
/* First it requests the text for the task to the user calling getToDoText()
   Then it creates and add the task calling addTodo()
   Finally it refresh the counters 
*/
function createNewTodo() {
  // Ask user task's text
  var toDoText = getToDoText("Write your ToDo","Write here...");

  // Create and add elements to the task's list whith the text introduced by user
  if (toDoText != null) { // Only if user doesn't cancel action
    addTodo(toDoText);

    // Refresh counters
    itemCountSpan.innerHTML = getTotalTodo();
    uncheckedCountSpan.innerHTML = getTotalUnchecked();
  }
}

// -----> Called by createNewTodo()
// Create and add elements to the document for a new task
// It gets a parameter the text for the task introduced by user
/* I think it's more clear for the user having a button with the word edit in each task 
   to change the text of the task, instead of clicking on the text. Maybe if you don't 
   have the edit button, you don't know that you can edit the to do text. */
function addTodo(text) {
  // Create elements 
  var li = createLi();
  var inputCheckbox = createCheckbox();
  var inputText = createInputText(text);
  var editButton = createEditButton();
  var deleteButton = createDeleteButton();

  // Add elements to the document
  list.appendChild(li);
  li.appendChild(inputCheckbox);
  li.appendChild(inputText);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
}

// -----> Called when clicking on the button #deleteChecked
// It deletes all the checked tasks
function deleteCheckedTasks() {
  var checkBox = document.getElementsByClassName("todo-checkbox");
  for (i = checkBox.length - 1; i >= 0; i--) {
    if (checkBox[i].checked) {
      deleteTask(checkBox[i]);
    }
  }
}

// -----> Called when clicking the edit button of a task
// Used in createEditButton() to associate this method to the event produced when clicking the button
// It allows user changes the text of a task
/* It gets like paramenter the button source of the event, changing the text in the input text 
  with the same parent of the button */
function editTask(button) {
  // I get the text in the task to send as parameter when calling getToDoText()
  var actualText = button.parentNode.childNodes[1].value;

  // Request new text
  var toDoText = getToDoText("Introduce the new text for your ToDo", actualText);

  // Change the test
  if (toDoText != null) {
    var task = button.parentNode;
    task.childNodes[1].setAttribute("value", toDoText);
  }
}

// -----> Used by deleteCheckedTasks() and  createDeleteButton()
// It deletes a task (a <li> element)
// It gets like paramenter the element whose parent is the <li> to remove. Parameter can be a checkbox or a delete button
function deleteTask(item) {
  // Remove the task
  task = item.parentNode;
  list.removeChild(task);

  // Refresh counters
  itemCountSpan.innerHTML = getTotalTodo();
  uncheckedCountSpan.innerHTML = getTotalUnchecked();
}

// -----> Called by createNewTodo() and editTask()
// Function gets the  text for the task from user  with a non-modal dialog box and returns that
// message is the informative text to appear in the dialog
/* text is the text placed in the box where user types when the dialog is opened
   They both change depending on if user's creating a new task or editing one */
// If the user cancels the action then the function returns null
function getToDoText(message, text) {
  var text = prompt(message, text);

  return text;
}

// -----> Called by deleteTask() and createNewTodo()
// It gets the total to dos when we need to actualize the counters
function getTotalTodo() {
  var total = document.getElementsByTagName("li").length;

  return total;
}

// -----> Called by deleteTask(), createNewTodo() and createCheckbox()
// It gets the total unchecked  to dos when we need to actualize the counters
function getTotalUnchecked() {
  var checkBox = document.getElementsByClassName("todo-checkbox");
  var total = 0;
  for (i = 0; i < checkBox.length; i++) {
    if (!checkBox[i].checked) {
      total++;
    }
  }

  return total;
}

// Methods to create new elements for a new task
// ---------------------------------------------------------------------------
function createLi() {
  var li = document.createElement("li");
  li.setAttribute("class", "todo-container");

  return li;
}

function createCheckbox() {
  var inputCheckbox = document.createElement("input");
  inputCheckbox.type = "checkbox";
  inputCheckbox.setAttribute("class", "todo-checkbox");

  // Event when clicking to check or uncheck
  inputCheckbox.onchange = function () {
    uncheckedCountSpan.innerHTML = getTotalUnchecked();
  };
  return inputCheckbox;
}

function createInputText(text) {
  var inputText = document.createElement("input");
  inputText.type = "text";
  inputText.setAttribute("value", text);
  inputText.setAttribute("readonly", true);
  return inputText;
}

function createEditButton() {
  var editButton = document.createElement("button");
  editButton.innerHTML = "EDIT";

  // Event when clicking
  editButton.onclick = function () {
    editTask(this);
  };
  return editButton;
}

function createDeleteButton() {
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "DELETE";

  // Event when clicking
  deleteButton.onclick = function () {
    deleteTask(this);
  }
  return deleteButton;
}

