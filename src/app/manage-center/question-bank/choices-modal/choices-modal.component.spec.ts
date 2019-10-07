import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesModalComponent } from './choices-modal.component';

describe('ChoicesModalComponent', () => {
  let component: ChoicesModalComponent;
  let fixture: ComponentFixture<ChoicesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
