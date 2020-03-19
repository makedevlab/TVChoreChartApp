import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ChoresPage } from './chores.page';

describe('ChoresPage', () => {
  let component: ChoresPage;
  let fixture: ComponentFixture<ChoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChoresPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
