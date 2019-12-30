import { TestBed } from '@angular/core/testing';

import { SubtypeService } from './subtype.service';

describe('SubtypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubtypeService = TestBed.get(SubtypeService);
    expect(service).toBeTruthy();
  });
});
