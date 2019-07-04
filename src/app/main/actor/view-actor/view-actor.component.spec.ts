import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActorComponent } from './view-actor.component';

describe('ViewActorComponent', () => {
  let component: ViewActorComponent;
  let fixture: ComponentFixture<ViewActorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewActorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
