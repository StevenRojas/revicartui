import { TestBed } from '@angular/core/testing';

import { GasTypeService } from './gas-type.service';

describe('GasTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GasTypeService = TestBed.get(GasTypeService);
    expect(service).toBeTruthy();
  });
});
