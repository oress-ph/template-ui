import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { WarehouseStorageRoomModel } from 'src/app/models/administration/warehouse-storage-room.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class WarehouseStorageRoomService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  // Get all warehouse storage
  getAllwarehouseStorageRoom(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let warehouseStorage: WarehouseStorageRoomModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/warehouse_storage_rooms', httpOptions).subscribe(
        response => {

          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {

                warehouseStorage.push({
                  id: data[i].id,
                  warehouse_id: data[i].warehouse_id,
                  storage_type_id: data[i].storage_type_id,
                  storage_room_code: data[i].storage_room_code,
                  particulars: data[i].particulars,
                });
              }
            }
          }

          observer.next([true, warehouseStorage]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }

  // Get warehouse storage Room by ID
  getWarehouseStorageRoomById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let warehouseStorage: WarehouseStorageRoomModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/warehouse_storage_rooms/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {
            warehouseStorage = {
              id: result.id,
              warehouse_id: result.warehouse_id,
              storage_type_id: result.storage_type_id,
              storage_room_code: result.storage_room_code,
              particulars: result.particulars,
            };
          }

          observer.next([true, warehouseStorage]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }

  // Register new warehouse storage Room
  addWarehouseStorageRoom(data: WarehouseStorageRoomModel): Observable<[boolean, WarehouseStorageRoomModel]> {

    let warehouse: WarehouseStorageRoomModel = {
      id: data.id,
      warehouse_id: data.warehouse_id,
      storage_type_id: data.storage_type_id,
      storage_room_code: data.storage_room_code,
      particulars: data.particulars,
    };

    return new Observable<[boolean, WarehouseStorageRoomModel]>((observer) => {

      this.http.post<WarehouseStorageRoomModel>(this.defaultAPIURLHost + '/api/warehouse_storage_rooms', warehouse, httpOptions).subscribe(
        (response) => {
          let data = response;
          observer.next([true, data]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error['error'].message]);
          observer.complete();
        });
    });
  }

  // Updated Exsisting warehouse storage Room
  updateWarhouseStorageRoom(id: number, data: WarehouseStorageRoomModel): Observable<[boolean, WarehouseStorageRoomModel]> {

    let warehouseStorage: WarehouseStorageRoomModel = {
      id: data.id,
      warehouse_id: data.warehouse_id,
      storage_type_id: data.storage_type_id,
      storage_room_code: data.storage_room_code,
      particulars: data.particulars,
    };
    return new Observable<[boolean, WarehouseStorageRoomModel]>((observer) => {

      this.http.put<WarehouseStorageRoomModel>(this.defaultAPIURLHost + '/api/warehouse_storage_rooms/' + id, warehouseStorage, httpOptions).subscribe(
        (response) => {

          let data = response;
          observer.next([true, data]);
          observer.complete();
        }, (error) => {
          observer.next([false, error['error'].message]);
          observer.complete();
        })
    })
  }


  // Delete warehouse storage room By ID
  deleteWarehouseStorageRoom(id: number): Observable<[boolean, WarehouseStorageRoomModel]> {

    return new Observable<[boolean, WarehouseStorageRoomModel]>((observer) => {

      this.http.delete<WarehouseStorageRoomModel>(this.defaultAPIURLHost + '/api/warehouse_storage_rooms/' + id, httpOptions).subscribe(
        (response) => {

          observer.next([true, response]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.error]);
          observer.complete();
        })
    })
  }
}
