import { TestBed } from '@angular/core/testing';

import { SystemModuleService } from './system-module.service';

describe('SystemModuleService', () => {
  let service: SystemModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
