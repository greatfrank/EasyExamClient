import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCenterComponent } from './manage-center.component';

describe('ManageCenterComponent', () => {
  let component: ManageCenterComponent;
  let fixture: ComponentFixture<ManageCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
