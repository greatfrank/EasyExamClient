import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDesignComponent } from './exam-design.component';

describe('ExamDesignComponent', () => {
  let component: ExamDesignComponent;
  let fixture: ComponentFixture<ExamDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
