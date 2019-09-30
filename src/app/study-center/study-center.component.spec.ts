import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCenterComponent } from './study-center.component';

describe('StudyCenterComponent', () => {
  let component: StudyCenterComponent;
  let fixture: ComponentFixture<StudyCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
