import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionToggleButtonsComponent } from './question-toggle-buttons.component';

describe('QuestionToggleButtonsComponent', () => {
  let component: QuestionToggleButtonsComponent;
  let fixture: ComponentFixture<QuestionToggleButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionToggleButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionToggleButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
