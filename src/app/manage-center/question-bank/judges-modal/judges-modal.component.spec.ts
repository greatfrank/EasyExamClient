import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgesModalComponent } from './judges-modal.component';

describe('JudgesModalComponent', () => {
  let component: JudgesModalComponent;
  let fixture: ComponentFixture<JudgesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
