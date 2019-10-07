import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillsModalComponent } from './fills-modal.component';

describe('FillsModalComponent', () => {
  let component: FillsModalComponent;
  let fixture: ComponentFixture<FillsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
