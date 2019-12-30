import { TestBed } from '@angular/core/testing';

import { UseTypeService } from './use-type.service';

describe('UseTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UseTypeService = TestBed.get(UseTypeService);
    expect(service).toBeTruthy();
  });
});
