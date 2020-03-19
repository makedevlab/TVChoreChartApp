import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksListPage } from './tasks-list.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { TasksNewPage } from './tasks-new.page';
import { TasksEditPage } from './tasks-edit.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([
      { path: '', component: TasksListPage },
      { path: 'new', component: TasksNewPage },
      { path: 'edit/:id', component: TasksEditPage }
    ])
  ],
  declarations: [TasksListPage, TasksNewPage, TasksEditPage]
})
export class TasksModule {}
