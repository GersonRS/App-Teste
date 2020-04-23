import { TestBed, async, inject } from '@angular/core/testing';

import { WelcomeGuard } from './welcome.guard';

describe('WelcomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WelcomeGuard]
    });
  });

  it('should ...', inject([WelcomeGuard], (guard: WelcomeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
