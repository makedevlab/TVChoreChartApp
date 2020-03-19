import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'chores',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../chores/chores.module').then(m => m.ChoresPageModule)
          }
        ]
      },
      {
        path: 'tasks',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tasks/tasks.module').then(m => m.TasksModule)
          }
        ]
      },
      {
        path: 'children',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../children/children.module').then(m => m.ChildrenModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/chores',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/chores',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
