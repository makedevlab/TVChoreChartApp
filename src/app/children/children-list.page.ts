import { Component } from '@angular/core';
import { Child } from '../interfaces/child.interface';
import { ChildrenService } from '../services/children.service';

@Component({
  selector: 'app-children-list',
  templateUrl: 'children-list.page.html',
  styleUrls: ['children-list.page.scss']
})
export class ChildrenListPage {
  public children: Array<Child> = [];

  constructor(
    public childrenService: ChildrenService
  ) {}

  async loadChildren() {
    this.childrenService.getAll().then((children: Array<Child>) => {
      this.children = children;
    });
  }

  deleteChild(child: Child) {
    this.childrenService.delete(child).then((data) => {
      console.log("Deleted child " + child.id);
      console.log(data);

      this.children = this.children.filter((element: Child) => {
        return element.id != child.id;
      });
    }).catch((error) => {
      console.log("Error deleting child " + child.id);
      console.log(error);
    });
  }

  ionViewDidEnter() {
    this.loadChildren();
  }
}