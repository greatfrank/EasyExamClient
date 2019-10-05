import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitExamSuccessComponent } from './submit-exam-success.component';

describe('SubmitExamSuccessComponent', () => {
  let component: SubmitExamSuccessComponent;
  let fixture: ComponentFixture<SubmitExamSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitExamSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitExamSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
