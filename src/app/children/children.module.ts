import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ChildrenListPage } from './children-list.page';
import { ChildrenNewPage } from './children-new.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([
      { path: '', component: ChildrenListPage },
      { path: 'new', component: ChildrenNewPage }
    ])
  ],
  declarations: [ChildrenListPage, ChildrenNewPage]
})
export class ChildrenModule {}
