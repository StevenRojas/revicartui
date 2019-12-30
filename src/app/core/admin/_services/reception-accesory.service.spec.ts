import { TestBed } from '@angular/core/testing';

import { ReceptionAccessoryService } from './reception-accessory.service';

describe('ReceptionAccesoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceptionAccessoryService = TestBed.get(ReceptionAccessoryService);
    expect(service).toBeTruthy();
  });
});
