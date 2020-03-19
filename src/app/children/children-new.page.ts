import { Component } from '@angular/core';
import { Child } from '../interfaces/child.interface';
import { ChildrenService } from '../services/children.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-children-new',
  templateUrl: 'children-new.page.html',
  styleUrls: ['children-new.page.scss']
})
export class ChildrenNewPage {
  public child: Child = <Child>{};

  constructor(
    public childrenService: ChildrenService,
    private router: Router
  ) {}

  postNewChild() {
    this.childrenService.create(this.child).then(data => {
      console.log("Result:");
      console.log(data);
      
      this.router.navigate(['/tabs/children']);
    });
  }
}