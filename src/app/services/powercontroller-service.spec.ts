import { TestBed } from '@angular/core/testing';

import { PowercontrollerService } from './powercontroller-service';

describe('PowercontrollerService', () => {
  let service: PowercontrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowercontrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
