import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMessagesComponent } from './session-messages.component';

describe('SessionMessagesComponent', () => {
  let component: SessionMessagesComponent;
  let fixture: ComponentFixture<SessionMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
