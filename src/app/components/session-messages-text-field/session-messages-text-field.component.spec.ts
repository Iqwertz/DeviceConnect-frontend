import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMessagesTextFieldComponent } from './session-messages-text-field.component';

describe('SessionMessagesTextFieldComponent', () => {
  let component: SessionMessagesTextFieldComponent;
  let fixture: ComponentFixture<SessionMessagesTextFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionMessagesTextFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionMessagesTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
