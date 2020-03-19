import { Component } from '@angular/core';
import { ChildrenService } from '../services/children.service';
import { Child } from '../interfaces/child.interface';
import { ChoreService } from '../services/chore.service';
import { Chore } from '../interfaces/chore.interface';

@Component({
  selector: 'app-chores',
  templateUrl: 'chores.page.html',
  styleUrls: ['chores.page.scss']
})
export class ChoresPage {

  public children : Array<Child> = [];

  constructor(
    public childrenService : ChildrenService,
    public choreService: ChoreService
    ) {}

  async loadChildren() {
    return new Promise(resolve => {
      this.childrenService.getAll().then((childrenData) => {
        this.children = childrenData;
        resolve();
      })
    });
  }

  refresh(event) {
    this.loadChildren().then(() => {
      event.target.complete();
    });
  }

  ionViewDidEnter() {
    this.loadChildren();
  }
  
  toggleChoreComplete(chore: Chore) {
    if (chore.completeInUi == chore.complete)
      return;
    
    chore.isUpdating = true;
    this.choreService.toggleComplete(chore.id, chore.completeInUi).then(() => {
      chore.isUpdating = false;
      chore.complete = chore.completeInUi;
    }).catch(() => {
      chore.completeInUi = chore.complete;
      chore.isUpdating = false;
    });
  }

}
