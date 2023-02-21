import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { StorageTypeMaterialModel } from 'src/app/models/administration/storage-type-material.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class StorageTypeMaterialService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;


  // Get all Storage Type Material List
  getAllStorageTypesMaterial(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let storageTypeMaterialList: StorageTypeMaterialModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/storage_type_materiales', httpOptions).subscribe(
        response => {

          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {
                storageTypeMaterialList.push({
                  id: data[i].id,
                  storage_type_id: data[i].storage_type_id,
                  material_type_id: data[i].material_type_id,
                  particulars: data[i].particulars
                });
              }
            }
          }

          observer.next([true, storageTypeMaterialList]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }


  // Get Storage Type Material by ID
  getStorageTypeMaterialById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let storagetypeMaterial: StorageTypeMaterialModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/storage_type_materiales/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {
            storagetypeMaterial = {
              id: result.id,
              storage_type_id: result.storage_type_id,
              material_type_id: result.material_type_id,
              particulars: result.particulars,
            };
          }

          observer.next([true, storagetypeMaterial]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }


  // Register new Storage Type Material
  addStorageTypeMaterial(data: StorageTypeMaterialModel): Observable<[boolean, StorageTypeMaterialModel]> {
    let storageTypeMaterial: StorageTypeMaterialModel = {
      id: data.id,
      storage_type_id: data.storage_type_id,
      material_type_id: data.material_type_id,
      particulars: data.particulars,
    };
    return new Observable<[boolean, StorageTypeMaterialModel]>((observer) => {

      this.http.post<StorageTypeMaterialModel>(this.defaultAPIURLHost + '/api/storage_type_materiales', storageTypeMaterial, httpOptions).subscribe(
        (response) => {
          let data = response;
          observer.next([true, data]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        });
    });
  }

  // Updated Exsisting Storage Type Material
  updateStorageTypeMaterial(id: number, data: StorageTypeMaterialModel): Observable<[boolean, StorageTypeMaterialModel]> {
    let materialTypeMaterial: StorageTypeMaterialModel = {
      id: data.id,
      storage_type_id: data.storage_type_id,
      material_type_id: data.material_type_id,
      particulars: data.particulars,
    };
    return new Observable<[boolean, StorageTypeMaterialModel]>((observer) => {

      this.http.put<StorageTypeMaterialModel>(this.defaultAPIURLHost + '/api/storage_type_materiales/' + id, materialTypeMaterial, httpOptions).subscribe(
        (response) => {

          let data = response;
          observer.next([true, data]);
          observer.complete();
        }, (error) => {
          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }


  // Delete Storage Type Material By ID
  deleteStorageTypeMaterial(id: number): Observable<[boolean, StorageTypeMaterialModel]> {

    return new Observable<[boolean, StorageTypeMaterialModel]>((observer) => {

      this.http.delete<StorageTypeMaterialModel>(this.defaultAPIURLHost + '/api/storage_type_materiales/' + id, httpOptions).subscribe(
        (response) => {

          observer.next([true, response]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }
}
