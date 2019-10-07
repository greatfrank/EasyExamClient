import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortAnswersModalComponent } from './short-answers-modal.component';

describe('ShortAnswersModalComponent', () => {
  let component: ShortAnswersModalComponent;
  let fixture: ComponentFixture<ShortAnswersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortAnswersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortAnswersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
