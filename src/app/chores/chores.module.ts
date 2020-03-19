import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChoresPage } from './chores.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ChoresNewPage } from './chores-new.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([
      { path: '', component: ChoresPage },
      { path: ':childId/new', component: ChoresNewPage }
    ])
  ],
  declarations: [ChoresPage, ChoresNewPage]
})
export class ChoresPageModule {}
