import { TestBed } from '@angular/core/testing';

import { LyfeCycleLoggerService } from './lyfe-cycle-logger.service';

describe('LyfeCycleLoggerService', () => {
  let service: LyfeCycleLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LyfeCycleLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
