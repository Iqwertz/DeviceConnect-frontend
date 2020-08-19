import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionmenuComponent } from './sessionmenu.component';

describe('SessionmenuComponent', () => {
  let component: SessionmenuComponent;
  let fixture: ComponentFixture<SessionmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
