import { TestBed } from '@angular/core/testing';

import { ConfirmScreenGuard } from './confirm-screen.guard';

describe('ConfirmScreenGuard', () => {
  let guard: ConfirmScreenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmScreenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
