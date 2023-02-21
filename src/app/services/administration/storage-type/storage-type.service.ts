import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { StorageTypeModel } from 'src/app/models/administration/storage-type.model';
import { PaginationModel } from 'src/app/models/shared/pagination.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class StorageTypeService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  // Get all Storage Type List
  getAllStorageTypesList(page: string, keywords: string): Observable<[boolean, PaginationModel]> {
    return new Observable<[boolean, PaginationModel]>((observer) => {
      let storageTypeList: StorageTypeModel[] = [];
      let pagination: PaginationModel = {
        data: [],
        first: null,
        prev: null,
        next: null,
        last: null,
        current_page: null,
        meta: null
      }

      this.http
        .get<any>(this.defaultAPIURLHost + '/api/storage_types?' + page + '&keywords='+ keywords, httpOptions)
        .subscribe(
          (response) => {
            let results = response;

            let result_data = results['data'];
            if (result_data != null) {

              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  storageTypeList.push({
                    id: data[i].id,
                    storage_type: data[i].storage_type,
                    code: data[i].code,
                    particulars: data[i].particulars,
                  });
                }
              }
            }
    
            pagination.meta = results['meta'];
            pagination.first = results["links"]["first"] != null ? results["links"]["first"].split('?')[1] : null;
            pagination.prev = results["links"]["prev"] != null ? results["links"]["prev"].split('?')[1] : null;
            pagination.next = results["links"]["next"] != null ? results["links"]["next"].split('?')[1] : null;
            pagination.last = results["links"]["last"] != null ? results["links"]["last"].split('?')[1] : null;
            pagination.current_page = 'page=' + pagination.meta.current_page;
            pagination.data = storageTypeList;

            observer.next([true, pagination]);
            observer.complete();
          },
          (error) => {
            
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  // Get all storage type list without parameter

 getAllStorageTypes(): Observable<[boolean, any]> {
    return new Observable<[boolean, any[]]>((observer) => {
      let storageTypeList: StorageTypeModel[] = [];
      this.http
        .get<any>(this.defaultAPIURLHost + '/api/storage_types', httpOptions)
        .subscribe(
          (response) => {

            let results = response;
            let results_data = response['data'];

            if (results != null) {
              var data = results_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  storageTypeList.push({
                    id: data[i].id,
                    storage_type: data[i].storage_type,
                    code: data[i].code,
                    particulars: data[i].particulars,
                  });
                }
              }
            }

            observer.next([true, storageTypeList]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  // Get Storage Type by ID
  getStorageTypeById(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let storagetype: StorageTypeModel;

      this.http
        .get<any>(
          this.defaultAPIURLHost + '/api/storage_types/' + id,
          httpOptions
        )
        .subscribe(
          (response) => {
            let result = response['data'];
            if (result != null) {
              storagetype = {
                id: result.id,
                storage_type: result.storage_type,
                code: result.code,
                particulars: result.particulars,
              };
            }

            observer.next([true, storagetype]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  addStorageType(data: StorageTypeModel): Observable<[boolean, any]> {

    let storageTypeModel: StorageTypeModel = {
      id: data.id,
      code: data.code == '' ? '-' : data.code,
      storage_type: data.storage_type == '' ? '-' : data.storage_type,
      particulars: data.particulars == '' ? '-' : data.particulars,
    };

    return new Observable<[boolean, any]>((observer) => {
      this.http
        .post(
          this.defaultAPIURLHost + '/api/storage_types',
          storageTypeModel,
          httpOptions
        )
        .subscribe(
          (response) => {
            let data = response;
            observer.next([true, data]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  updateStorageType(
    id: number,
    data: StorageTypeModel
  ): Observable<[boolean, StorageTypeModel]> {
    let storageTypeModel: StorageTypeModel = {
      id: data.id,
      code: data.code == '' ? '-' : data.code,
      storage_type: data.storage_type == '' ? '-' : data.storage_type,
      particulars: data.particulars == '' ? '-' : data.particulars,
    };

    return new Observable<[boolean, StorageTypeModel]>((observer) => {
      this.http
        .put<StorageTypeModel>(
          this.defaultAPIURLHost + '/api/storage_types/' + id,
          storageTypeModel,
          httpOptions
        )
        .subscribe(
          (response) => {
            let data = response;
            observer.next([true, data]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  // Delete Storage Type By ID
  deleteStorageType(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, StorageTypeModel]>((observer) => {
      this.http
        .delete<StorageTypeModel>(
          this.defaultAPIURLHost + '/api/storage_types/' + id,
          httpOptions
        )
        .subscribe(
          (response) => {
            observer.next([true, response]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }
}
