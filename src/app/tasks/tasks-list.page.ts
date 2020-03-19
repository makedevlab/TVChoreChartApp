import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task.interface';

@Component({
  selector: 'app-tasks-list',
  templateUrl: 'tasks-list.page.html',
  styleUrls: ['tasks-list.page.scss']
})
export class TasksListPage {
  public tasks : Array<Task> = [];

  constructor(
    public taskService : TaskService
    ) {}

  async loadTasks() {
    return new Promise(resolve => {
      this.taskService.getAll().then((tasks: Array<Task>) => {
        this.tasks = tasks;
      });
    });
  }

  refresh(event) {
    this.loadTasks().then(() => {
      event.target.complete();
    });
  }

  ionViewDidEnter() {
    this.loadTasks();
  }

  deleteTask(task: Task) {
    this.taskService.delete(task).then((data) => {
      console.log("Deleted task " + task.id);
      console.log(data);

      this.tasks = this.tasks.filter((element: Task) => {
        return element.id != task.id;
      });
    }).catch((error) => {
      console.log("Error deleting task " + task.id);
      console.log(error);
    });
  }
}
