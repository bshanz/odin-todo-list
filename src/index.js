import _, { find, findIndex, indexOf } from "lodash";
import "./style.css";
import {
  addDays,
  isThisWeek,
  isThisMonth,
  format,
  parseISO,
  isToday,
} from "date-fns";

/* Next tasks:
- Put today, this week, and all tasks into their own modules
- Be able to update the dates dynamically 
- Add functionality for different projects. Likely a dropdown selection
*/

// cache the dom
const newTask = document.getElementById("new-task");
const grid = document.getElementById("grid");
const form = document.querySelector("form");
const submitTask = document.getElementById("submitTask");
const title = document.getElementById("title-dom");
const description = document.getElementById("description-dom");
const date = document.getElementById("date-dom");
const exampleButtonOne = document.getElementById("example-button-1");
const exampleButtonTwo = document.getElementById("example-button-2");
const thisWeekButton = document.getElementById("this-week-btn");
const todayButton = document.getElementById("today-btn");
const allButton = document.getElementById("all-btn");

// create task array
const myTasks = [];

// create task class
class Task {
  constructor(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
    //this.project = project;
    this.info = function () {
      return `${title}, ${description}, ${date}`;
    };
  }
}

// enable user to click submitTask
form.addEventListener("submit", (e) => {
  // let page load first
  e.preventDefault();

  // create new book
  const task1 = new Task(
    title.value,
    description.value,
    date.value
    //project.value
  );

  // add ID to new task
  task1.id = `${task1.title}${task1.description}${task1.date}`;

  // add new book to myTasks
  myTasks.push(task1);

  // close the form modal
  modal.style.display = "none";

  // reset the form
  document.querySelector("form").reset();

  // create elements
  const toDoCard = document.createElement("div");
  const toDoContent = document.createElement("div");
  const upperCard = document.createElement("div");
  const theTitle = document.createElement("h3");
  const theDescription = document.createElement("p");
  const dateContainer = document.createElement("div");
  const dateLabel = document.createElement("label");
  const dateInput = document.createElement("input");
  const lowerCard = document.createElement("div");
  const doneButton = document.createElement("button");
  const removeButton = document.createElement("button");

  // append to DOM and add classes
  // create todo card
  grid.appendChild(toDoCard);
  toDoCard.classList.add("todo-card");

  // create content within card
  toDoCard.appendChild(toDoContent);
  toDoContent.classList.add("todo-content");

  // create the upper portion of the card
  toDoContent.appendChild(upperCard);
  upperCard.classList.add("upper-card");

  upperCard.appendChild(theTitle);
  upperCard.appendChild(theDescription);
  upperCard.appendChild(dateContainer);
  dateContainer.classList.add("date-container");
  dateContainer.appendChild(dateLabel);
  dateContainer.appendChild(dateInput);

  // create lower portion of the card
  toDoContent.appendChild(lowerCard);
  lowerCard.classList.add("lower-card");

  lowerCard.appendChild(doneButton);
  doneButton.classList.add("button");

  lowerCard.appendChild(removeButton);
  removeButton.classList.add("remove");

  // add values to title, description, date, and buttons
  theTitle.innerText = task1.title;
  theDescription.innerText = `${task1.description}`;
  dateLabel.innerText = "Due date:";
  doneButton.innerText = "Done";
  doneButton.value = `${task1.title}`;
  dateInput.type = "date";
  dateInput.value = task1.date;
  removeButton.innerText = "Remove";
  removeButton.value = `${task1.title}`;

  // add event listener to dynamic book card to complete it
  doneButton.addEventListener("click", removeTask);

  // add event listener to dynamic book card to remove it
  removeButton.addEventListener("click", removeTask);
});

//function to check if the task's due date is this week
const thisWeekCheck = () => {
  let taskDates = myTasks.forEach((task) => {
    if (isThisWeek(parseISO(task.date)) === true) {
      // create elements
      const toDoCard = document.createElement("div");
      const toDoContent = document.createElement("div");
      const upperCard = document.createElement("div");
      const theTitle = document.createElement("h3");
      const theDescription = document.createElement("p");
      const dateContainer = document.createElement("div");
      const dateLabel = document.createElement("label");
      const dateInput = document.createElement("input");
      const lowerCard = document.createElement("div");
      const doneButton = document.createElement("button");
      const removeButton = document.createElement("button");

      // append to DOM and add classes
      // create todo card
      grid.appendChild(toDoCard);
      toDoCard.classList.add("todo-card");

      // create content within card
      toDoCard.appendChild(toDoContent);
      toDoContent.classList.add("todo-content");

      // create the upper portion of the card
      toDoContent.appendChild(upperCard);
      upperCard.classList.add("upper-card");

      upperCard.appendChild(theTitle);
      upperCard.appendChild(theDescription);
      upperCard.appendChild(dateContainer);
      dateContainer.classList.add("date-container");
      dateContainer.appendChild(dateLabel);
      dateContainer.appendChild(dateInput);

      // create lower portion of the card
      toDoContent.appendChild(lowerCard);
      lowerCard.classList.add("lower-card");

      lowerCard.appendChild(doneButton);
      doneButton.classList.add("button");

      lowerCard.appendChild(removeButton);
      removeButton.classList.add("remove");

      // add values to title, description, date, and buttons
      theTitle.innerText = task.title;
      theDescription.innerText = `${task.description}`;
      dateLabel.innerText = "Due date:";
      doneButton.innerText = "Done";
      doneButton.value = `${task.title}`;
      dateInput.type = "date";
      dateInput.value = task.date;
      removeButton.innerText = "Remove";
      removeButton.value = `${task.title}`;

      // add event listener to dynamic book card to complete it
      doneButton.addEventListener("click", removeTask);

      // add event listener to dynamic book card to remove it
      removeButton.addEventListener("click", removeTask);
    } else {
    }
  });
};

//function to check if the task's due date is this today
const todayCheck = () => {
  let taskDates = myTasks.forEach((task) => {
    if (isToday(parseISO(task.date)) === true) {
      // create elements
      const toDoCard = document.createElement("div");
      const toDoContent = document.createElement("div");
      const upperCard = document.createElement("div");
      const theTitle = document.createElement("h3");
      const theDescription = document.createElement("p");
      const dateContainer = document.createElement("div");
      const dateLabel = document.createElement("label");
      const dateInput = document.createElement("input");
      const lowerCard = document.createElement("div");
      const doneButton = document.createElement("button");
      const removeButton = document.createElement("button");

      // append to DOM and add classes
      // create todo card
      grid.appendChild(toDoCard);
      toDoCard.classList.add("todo-card");

      // create content within card
      toDoCard.appendChild(toDoContent);
      toDoContent.classList.add("todo-content");

      // create the upper portion of the card
      toDoContent.appendChild(upperCard);
      upperCard.classList.add("upper-card");

      upperCard.appendChild(theTitle);
      upperCard.appendChild(theDescription);
      upperCard.appendChild(dateContainer);
      dateContainer.classList.add("date-container");
      dateContainer.appendChild(dateLabel);
      dateContainer.appendChild(dateInput);

      // create lower portion of the card
      toDoContent.appendChild(lowerCard);
      lowerCard.classList.add("lower-card");

      lowerCard.appendChild(doneButton);
      doneButton.classList.add("button");

      lowerCard.appendChild(removeButton);
      removeButton.classList.add("remove");

      // add values to title, description, date, and buttons
      theTitle.innerText = task.title;
      theDescription.innerText = `${task.description}`;
      dateLabel.innerText = "Due date:";
      doneButton.innerText = "Done";
      doneButton.value = `${task.title}`;
      dateInput.type = "date";
      dateInput.value = task.date;
      removeButton.innerText = "Remove";
      removeButton.value = `${task.title}`;

      // add event listener to dynamic book card to complete it
      doneButton.addEventListener("click", removeTask);

      // add event listener to dynamic book card to remove it
      removeButton.addEventListener("click", removeTask);
    } else {
    }
  });
};

//function to render all tasks
const allTasks = () => {
  let taskDates = myTasks.forEach((task) => {
    // create elements
    const toDoCard = document.createElement("div");
    const toDoContent = document.createElement("div");
    const upperCard = document.createElement("div");
    const theTitle = document.createElement("h3");
    const theDescription = document.createElement("p");
    const dateContainer = document.createElement("div");
    const dateLabel = document.createElement("label");
    const dateInput = document.createElement("input");
    const lowerCard = document.createElement("div");
    const doneButton = document.createElement("button");
    const removeButton = document.createElement("button");

    // append to DOM and add classes
    // create todo card
    grid.appendChild(toDoCard);
    toDoCard.classList.add("todo-card");

    // create content within card
    toDoCard.appendChild(toDoContent);
    toDoContent.classList.add("todo-content");

    // create the upper portion of the card
    toDoContent.appendChild(upperCard);
    upperCard.classList.add("upper-card");

    upperCard.appendChild(theTitle);
    upperCard.appendChild(theDescription);
    upperCard.appendChild(dateContainer);
    dateContainer.classList.add("date-container");
    dateContainer.appendChild(dateLabel);
    dateContainer.appendChild(dateInput);

    // create lower portion of the card
    toDoContent.appendChild(lowerCard);
    lowerCard.classList.add("lower-card");

    lowerCard.appendChild(doneButton);
    doneButton.classList.add("button");

    lowerCard.appendChild(removeButton);
    removeButton.classList.add("remove");

    // add values to title, description, date, and buttons
    theTitle.innerText = task.title;
    theDescription.innerText = `${task.description}`;
    dateLabel.innerText = "Due date:";
    doneButton.innerText = "Done";
    doneButton.value = `${task.title}`;
    dateInput.type = "date";
    dateInput.value = task.date;
    removeButton.innerText = "Remove";
    removeButton.value = `${task.title}`;

    // add event listener to dynamic book card to complete it
    doneButton.addEventListener("click", removeTask);

    // add event listener to dynamic book card to remove it
    removeButton.addEventListener("click", removeTask);
  });
};

// enable user to delete books on window load
function removeDemoTask(e) {
  const target = e.target;
  target.parentNode.parentNode.parentNode.remove();
  console.log(`run`);
}

// enable user to delete dynamic books and remove from array
const removeTask = (e) => {
  const target = e.target;

  myTasks.forEach((task) => {
    if (e.target.value === `${task.title}`) {
      for (let i = myTasks.length - 1; i >= 0; --i) {
        if (myTasks[i].title === e.target.value) {
          myTasks.splice(i, 1);
        }
        target.parentNode.parentNode.parentNode.remove();
      }
    } else {
    }
  });
};

//enable user to remove demo tasks from window load
function demoTaskRemover() {
  exampleButtonOne.addEventListener("click", removeDemoTask);
  exampleButtonTwo.addEventListener("click", removeDemoTask);
}
demoTaskRemover();

// creating the modal
// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// enable clicking the 'This Week' button
thisWeekButton.addEventListener("click", (e) => {
  grid.innerHTML = "";
  thisWeekCheck();
});

//enable user to click 'today' button
todayButton.addEventListener("click", (e) => {
  grid.innerHTML = "";
  todayCheck();
});

//enable user to click 'all tasks' button
allButton.addEventListener("click", (e) => {
  grid.innerHTML = "";
  allTasks();
});
