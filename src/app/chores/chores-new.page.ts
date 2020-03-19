import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChoreService } from '../services/chore.service';
import { Chore } from '../interfaces/chore.interface';
import { TaskService } from '../services/task.service';
import { ChildrenService } from '../services/children.service';
import { Child } from '../interfaces/child.interface';
import { Task } from '../interfaces/task.interface';

interface TaskForChild {
  task: Task;
  enabled: boolean;
  choreId: number;
}

@Component({
  selector: 'app-chores-new',
  templateUrl: 'chores-new.page.html',
  styleUrls: ['chores-new.page.scss']
})
export class ChoresNewPage {
  public child: Child;
  public choresEnabled: Map<number, number>;
  public tasksForChild: Array<TaskForChild>;

  private childId: number;
  private tasksLoaded: boolean = false;

  constructor(
    private choreService: ChoreService,
    private taskService: TaskService,
    private childrenService: ChildrenService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ionViewDidEnter() {
    this.childId = Number(this.activatedRoute.snapshot.paramMap.get('childId'));

    this.loadChild();
    this.loadChores();
    this.loadTasks();
  }

  loadChild() {
    this.childrenService.get(this.childId).then((child: Child) => {
      this.child = child;
    });
  }

  loadChores() {
    this.choresEnabled = new Map<number, number>();
    this.choreService.allForChild(this.childId).then((chores: Array<Chore>) => {
      chores.forEach((chore: Chore) => {
        this.choresEnabled.set(chore.task.id, chore.id);
      });
    });
  }

  loadTasks() {
    this.tasksForChild = [];
    this.taskService.getAll().then((tasks: Array<Task>) => {
      tasks.forEach(task => {
        this.tasksForChild.push({
          task: task, 
          enabled: this.choresEnabled.has(task.id), 
          choreId: this.choresEnabled.get(task.id)
        });
      });

      this.tasksLoaded = true;
    });
  }

  toggleTask(taskForChild: TaskForChild) {
    if (!this.tasksLoaded)
      return;
      
    if (this.choresEnabled.has(taskForChild.task.id)) {
      // Disable it
      this.choreService.delete(taskForChild.choreId).then((value) => {
        taskForChild.enabled = false;
        taskForChild.choreId = null;
      });
    } else {
      // Enable it
      let chore: Chore = <Chore>{ task_id: taskForChild.task.id, child_id: this.childId };
      this.choreService.create(chore).then((createdChore: Chore) => {
        taskForChild.enabled = true;
        taskForChild.choreId = chore.id;
      });
    }
  }
}