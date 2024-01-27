import { TestBed } from '@angular/core/testing';

import { AuthOwnerGuardGuard } from './auth-owner-guard.guard';

describe('AuthOwnerGuardGuard', () => {
  let guard: AuthOwnerGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthOwnerGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
