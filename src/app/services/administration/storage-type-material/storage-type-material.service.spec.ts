import { TestBed } from '@angular/core/testing';

import { StorageTypeMaterialService } from './storage-type-material.service';

describe('StorageTypeMaterialService', () => {
  let service: StorageTypeMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageTypeMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
