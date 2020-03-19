import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: 'tasks-edit.page.html',
  styleUrls: ['tasks-edit.page.scss']
})
export class TasksEditPage {
  public id: number;
  public task: Task;
  
  constructor(
    public taskService: TaskService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadTask(this.id);
  }

  loadTask(id: number) {
    this.taskService.get(id).then((task: Task) => {
      this.task = task;
    }).catch((error) => {
      console.log("TODO: Error handling");
    })
  }

  updateTask() {
    this.taskService.update(this.task).then((task: Task) => {
      this.router.navigate(['/tabs/tasks']);
    }).catch((error) => {
      console.log("TODO: Error handling");
      console.log(error);
    })
  }
}