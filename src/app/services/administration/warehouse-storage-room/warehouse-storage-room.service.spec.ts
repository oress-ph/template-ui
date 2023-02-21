import { TestBed } from '@angular/core/testing';

import { WarehouseStorageRoomService } from './warehouse-storage-room.service';

describe('WarehouseStorageRoomService', () => {
  let service: WarehouseStorageRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseStorageRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
