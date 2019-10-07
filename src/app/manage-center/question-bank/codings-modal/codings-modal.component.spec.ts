import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingsModalComponent } from './codings-modal.component';

describe('CodingsModalComponent', () => {
  let component: CodingsModalComponent;
  let fixture: ComponentFixture<CodingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodingsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
