// create task class
export class Task {
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
