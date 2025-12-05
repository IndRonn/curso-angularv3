import { TestBed } from '@angular/core/testing';

import { LyfeCycleChildService } from './lyfe-cycle-child.service';

describe('LyfeCycleChildService', () => {
  let service: LyfeCycleChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LyfeCycleChildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
