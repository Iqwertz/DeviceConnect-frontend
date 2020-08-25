import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseralertComponent } from './useralert.component';

describe('UseralertComponent', () => {
  let component: UseralertComponent;
  let fixture: ComponentFixture<UseralertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseralertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseralertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
