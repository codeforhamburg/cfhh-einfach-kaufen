import { TestBed, async, inject } from '@angular/core/testing';

import { CanDeactivateAfterChangeDetectionGuard } from './can-deactivate-after-change-detection.guard';

describe('CanDeactivateAfterChangeDetectionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateAfterChangeDetectionGuard]
    });
  });

  it('should ...', inject([CanDeactivateAfterChangeDetectionGuard], (guard: CanDeactivateAfterChangeDetectionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
