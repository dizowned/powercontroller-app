import { TestBed } from '@angular/core/testing';

import { NewControllerService } from './newcontroller-service';

describe('NewControllerService', () => {
  let service: NewControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
