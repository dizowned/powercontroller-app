import { TestBed } from '@angular/core/testing';

import { PowerControllerService } from './powercontroller-service';

describe('PowercontrollerService', () => {
  let service: PowerControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
