import { TestBed } from '@angular/core/testing';

import { UserRigthUiService } from './user-rigth-ui.service';

describe('UserRigthUiService', () => {
  let service: UserRigthUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRigthUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
