// initiate imports
import { parseISO, isThisWeek } from "date-fns";
import { myTasks, removeTask } from "./index.js";

export function renderThisWeek() {

// cache dom
const grid = document.getElementById("grid");
    // check if the task due date is this week
  let taskDates = myTasks.forEach((task) => {
    if (isThisWeek(parseISO(task.date)) === true) {
      // create elements
      const toDoCard = document.createElement("div");
      const toDoContent = document.createElement("div");
      const upperCard = document.createElement("div");
      const theTitle = document.createElement("h3");
      const theDescription = document.createElement("p");
      const theProject = document.createElement("p");
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
      upperCard.appendChild(theProject);
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
      theProject.innerText = task.project;
      dateLabel.innerText = "Due date:";
      doneButton.innerText = "Done";
      doneButton.value = `${task.title}`;
      dateInput.type = "date";
      dateInput.value = task.date;
      dateInput.id = task.title;
      removeButton.innerText = "Remove";
      removeButton.value = `${task.title}`;

      // add event listener to dynamic book card to complete it
      doneButton.addEventListener("click", removeTask);

      // add event listener to dynamic book card to remove it
      removeButton.addEventListener("click", removeTask);

      // add event listener for date input

      dateInput.addEventListener("change", (e) => {
        let updateTaskDate = myTasks.forEach((task) => {
          if (e.target.id === task.title) {
            task.date = e.target.value;
          } else {
          }
        });
      });
    } else {
    }
  });

};