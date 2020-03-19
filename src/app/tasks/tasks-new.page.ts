import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-new',
  templateUrl: 'tasks-new.page.html',
  styleUrls: ['tasks-new.page.scss']
})
export class TasksNewPage {
  public task: Task = <Task>{};

  constructor(public taskService: TaskService,
    private router: Router) { }
 
  postNewTask() {
    this.taskService.create(this.task).then((data) => {
      console.log("Result:");
      console.log(data);

      this.router.navigate(['/tabs/tasks']);
    });
  }
}