import { TestBed, async, inject } from '@angular/core/testing';

import { WelcomeCompleteGuard } from './welcome-complete.guard';

describe('WelcomeCompleteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WelcomeCompleteGuard]
    });
  });

  it('should ...', inject([WelcomeCompleteGuard], (guard: WelcomeCompleteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
