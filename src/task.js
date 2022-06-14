import { removeTask } from './index.js';

export class Task {
  constructor(title, description, project, date) {
    this.title = title;
    this.description = description;
    this.project = project;
    this.date = date;
    //this.project = project;
  }

  info() {
    return `${this.title}, ${this.description}, ${this.date}`;
  }

  render() {
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
    theTitle.innerText = this.title;
    theDescription.innerText = `${this.description}`;
    theProject.innerText = this.project;
    dateLabel.innerText = "Due date:";
    doneButton.innerText = "Done";
    doneButton.value = `${this.title}`;
    dateInput.type = "date";
    dateInput.value = this.date;
    dateInput.id = this.title;
    removeButton.innerText = "Remove";
    removeButton.value = `${this.title}`;

    // add event listener to dynamic task card to complete it
    doneButton.addEventListener("click", removeTask);

    // add event listener to dynamic task card to remove it
    removeButton.addEventListener("click", removeTask);

    // add event listener for date input
    dateInput.addEventListener("change", (e) => {
      let updateTaskDate = myTasks.forEach((task) => {
        if (e.target.id === this.title) {
          this.date = e.target.value;
        }
      });
    });

    return toDoCard;
  }
}

