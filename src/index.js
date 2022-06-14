// initiate imports
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
import { renderToday } from "./today.js";
import { renderThisWeek } from "./thisWeek.js";
import { renderAllTasks } from "./allTasks.js";

/* Next tasks:
- use local storage
*/

// cache the dom
const newTask = document.getElementById("new-task");
const grid = document.getElementById("grid");
const form = document.querySelector("form");
const submitTask = document.getElementById("submitTask");
const title = document.getElementById("title-dom");
const description = document.getElementById("description-dom");
const project = document.getElementById("project-dom");
const date = document.getElementById("date-dom");
const exampleButtonOne = document.getElementById("example-button-1");
const exampleButtonTwo = document.getElementById("example-button-2");
const thisWeekButton = document.getElementById("this-week-btn");
const todayButton = document.getElementById("today-btn");
const allButton = document.getElementById("all-btn");
const sidebar = document.getElementById("sidebar");
const gridContainer = document.getElementById("grid-container");
const removeProjectContainer = document.getElementById(
  "remove-project-container"
);

// create task array
const myTasks = [];
const projectList = [];

// create task class
class Task {
  constructor(title, description, project, date) {
    this.title = title;
    this.description = description;
    this.project = project;
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

  // create new task
  const task1 = new Task(
    title.value,
    description.value,
    project.value,
    date.value
    //project.value
  );

  // add ID to new task
  task1.id = `${task1.title}${task1.description}${task1.date}`;

  // add new task to myTasks
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
  theTitle.innerText = task1.title;
  theDescription.innerText = `${task1.description}`;
  theProject.innerText = task1.project;
  dateLabel.innerText = "Due date:";
  doneButton.innerText = "Done";
  doneButton.value = `${task1.title}`;
  dateInput.type = "date";
  dateInput.value = task1.date;
  dateInput.id = task1.title;
  removeButton.innerText = "Remove";
  removeButton.value = `${task1.title}`;

  // add event listener to dynamic task card to complete it
  doneButton.addEventListener("click", removeTask);

  // add event listener to dynamic task card to remove it
  removeButton.addEventListener("click", removeTask);

  // add event listener for date input
  dateInput.addEventListener("change", (e) => {
    let updateTaskDate = myTasks.forEach((task) => {
      if (e.target.id === task1.title) {
        task1.date = e.target.value;
      } else {
      }
    });
  });

  // create the new project button if it does not already exist
  if (projectList.includes(task1.project) === false) {
    // push the new project to list
    projectList.push(task1.project);

    // create the button element
    const newProject = document.createElement("button");

    // append the project tab
    sidebar.appendChild(newProject);
    newProject.classList.add("button-side");

    // set it's inner text
    newProject.innerText = task1.project;
    newProject.value = task1.project;
    newProject.id = task1.project;

    // add click event listener to the project in side bar
    newProject.addEventListener("click", viewProject);

    // save each task to local storage
    saveEachTask();
  } else {
  }
});

// enable user to delete tasks on window load
function removeDemoTask(e) {
  const target = e.target;
  target.parentNode.parentNode.parentNode.remove();
}

// enable user to delete dynamic tasks and remove from array
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
// done with modal

// enable clicking the 'This Week' button
thisWeekButton.addEventListener("click", (e) => {
  grid.innerHTML = "";
  removeProjectContainer.innerHTML = "";
  renderThisWeek();
});

//enable user to click 'today' button
todayButton.addEventListener("click", (e) => {
  grid.innerHTML = "";
  removeProjectContainer.innerHTML = "";
  renderToday();
});

//enable user to click 'all tasks' button
allButton.addEventListener("click", (e) => {
  grid.innerHTML = "";
  removeProjectContainer.innerHTML = "";
  renderAllTasks();
});

// enable user to click project buttons. try to move the grid aspect into the event listenr
const viewProject = (e) => {
  grid.innerHTML = "";
  // loop through the tasks
  let taskProject = myTasks.forEach((task) => {
    if (e.target.value === task.project) {
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

      // add event listener to dynamic task card to complete it
      doneButton.addEventListener("click", removeTask);

      // add event listener to dynamic task card to remove it
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

      // add a remove project button to this view
      //clear the container incase it has something in it already
      // the fix is likely to create a separate loop within this function. No if statement, just run the code below. Or loop through the project array instead. Sent the button name and remove functionality based on the button name. It would be a separate if statement. Likely on the click of the project name on sidebar
      removeProjectContainer.innerHTML = "";

      // create the remove project button
      const removeProject = document.createElement("button");

      // append the button below the grid
      removeProjectContainer.appendChild(removeProject);
      removeProject.classList.add("remove-project-button");

      // set it's inner text
      removeProject.innerText = `Remove project "${task.project}"`;
      removeProject.value = task.project;

      removeProject.addEventListener("click", () => {
        //removeTask(e);
        removeTheProject(e);
      });
    } else {
    }
  });
  // when the project is removed by the 'done' or 'remove' button under the 'all tasks'
  // 'today', or 'this week' view, create a button to still remove the project
  projectList.forEach((project) => {
    if (e.target.value === project) {
      //clear the existing remove project button
      removeProjectContainer.innerHTML = "";

      // create the remove project button
      const removeProject = document.createElement("button");

      // append the button below the grid
      removeProjectContainer.appendChild(removeProject);
      removeProject.classList.add("remove-project-button");

      // set it's inner text
      removeProject.innerText = `Remove project "${project}"`;
      removeProject.value = project;

      removeProject.addEventListener("click", () => {
        //removeTask(e);
        removeTheProject(e);
      });
    } else {
    }
  });
};

// remove the project and all associated tasks
const removeTheProject = (e) => {
  const target = e.target;
  // clear the project task grid
  grid.innerHTML = "";
  // delete this button
  removeProjectContainer.innerHTML = "";
  let removeThis = "";

  // remove the task from the myTasks object
  myTasks.forEach((task) => {
    if (e.target.value === `${task.project}`) {
      for (let i = myTasks.length - 1; i >= 0; --i) {
        if (myTasks[i].project === e.target.value) {
          removeThis = myTasks[i].project;
          myTasks.splice(i, 1);
        }
      }
    } else {
    }
  });
  // remove from project list array
  projectList.forEach((project) => {
    if (e.target.value === project) {
      const indexToRemove = projectList.indexOf(project);
      projectList.splice(indexToRemove, 1);
    } else {
    }
  });
  document.getElementById(e.target.value).remove();
};

// initiate exports
export { myTasks, projectList, removeTask };

// save each task to local storage
const saveEachTask = () => {
  myTasks.forEach((task) => {
    localStorage.setItem(task.title, JSON.stringify(task));
  });
};

// render each task from local storage
const loadEachTask = () => {
  Object.keys(localStorage).forEach((key) => {
    //console.log(key, Object[description])
    //console.log(localStorage.getItem(key));
    myTasks.push(JSON.parse(localStorage.getItem(key)));
    myTasks.forEach((task) => {
      console.log(myTasks);
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
      
    });
  });
};

window.addEventListener("load", (event) => {
  loadEachTask();
});

//localStorage.clear();
