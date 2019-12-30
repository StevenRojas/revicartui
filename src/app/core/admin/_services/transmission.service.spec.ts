import { TestBed } from '@angular/core/testing';

import { TransmissionService } from './transmission.service';

describe('TransmissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransmissionService = TestBed.get(TransmissionService);
    expect(service).toBeTruthy();
  });
});
