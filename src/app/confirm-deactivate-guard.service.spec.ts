import { TestBed } from '@angular/core/testing';

import { ConfirmDeactivateGuardService } from './confirm-deactivate-guard.service';

describe('ConfirmDeactivateGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmDeactivateGuardService = TestBed.get(ConfirmDeactivateGuardService);
    expect(service).toBeTruthy();
  });
});
