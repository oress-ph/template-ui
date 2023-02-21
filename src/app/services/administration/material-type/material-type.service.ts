import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { MaterialTypeModel } from 'src/app/models/administration/material-type.model';
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
export class MaterialTypeService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  // Get all material Type list
  getAllMaterialTypes(
    page: string,
    keywords: string
  ): Observable<[boolean, any]> {
    return new Observable<[boolean, PaginationModel]>((observer) => {
      let materialTypeList: MaterialTypeModel[] = [];
      let pagination: PaginationModel = {
        data: [],
        first: null,
        prev: null,
        next: null,
        last: null,
        current_page: null,
        meta: null,
      };

      this.http
        .get<any>(
          this.defaultAPIURLHost +
            '/api/material_types?' +
            page +
            '&keywords=' +
            keywords,
          httpOptions
        )
        .subscribe(
          (response) => {
            let results = response;
            let result_data = results['data'];
            if (result_data != null) {
              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  materialTypeList.push({
                    id: data[i].id,
                    material_type: data[i].material_type,
                    storage_type_id: data[i].storage_type_id,
                    storage_type: data[i].storage_type,
                    code: data[i].code,
                    groupings: data[i].groupings,
                    pallet_packaging: data[i].pallet_packaging,
                    particulars: data[i].particulars,
                  });
                }
              }

              pagination.meta = results['meta'];
              pagination.first =
                results['links']['first'] != null
                  ? results['links']['first'].split('?')[1]
                  : null;
              pagination.prev =
                results['links']['prev'] != null
                  ? results['links']['prev'].split('?')[1]
                  : null;
              pagination.next =
                results['links']['next'] != null
                  ? results['links']['next'].split('?')[1]
                  : null;
              pagination.last =
                results['links']['last'] != null
                  ? results['links']['last'].split('?')[1]
                  : null;
              pagination.current_page = 'page=' + pagination.meta.current_page;

              pagination.data = materialTypeList;
            }

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

  // Get Material Type by ID
  getMaterialTypeById(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let materialType: MaterialTypeModel;

      this.http
        .get<any>(
          this.defaultAPIURLHost + '/api/material_types/' + id,
          httpOptions
        )
        .subscribe(
          (response) => {
            let result = response['data'];
            if (result != null) {
              materialType = {
                id: result.id,
                material_type: result.material_type,
                storage_type_id: result.storage_type_id,
                storage_type: result.storage_type,
                code: result.code,
                groupings: result.groupings,
                pallet_packaging: result.pallet_packaging,
                particulars: result.particulars,
              };
            }

            observer.next([true, materialType]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  // Register new Material Type
  addMaterialType(
    data: MaterialTypeModel
  ): Observable<[boolean, MaterialTypeModel]> {
    let materialTypeModel: MaterialTypeModel = {
      id: data.id,
      storage_type_id: data.storage_type_id,
      storage_type: null,
      code: data.code == '' ? '-' : data.code,
      material_type: data.material_type == '' ? '-' : data.material_type,
      groupings: data.groupings == '' ? '-' : data.groupings,
      pallet_packaging: data.pallet_packaging == '' ? '-' : data.pallet_packaging,
      particulars: data.groupings == '' ? '-' : data.particulars,
    };

    return new Observable<[boolean, MaterialTypeModel]>((observer) => {
      this.http
        .post<MaterialTypeModel>(
          this.defaultAPIURLHost + '/api/material_types',
          materialTypeModel,
          httpOptions
        )
        .subscribe(
          (response) => {
            let data = response;
            observer.next([true, data]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error['error'].message]);
            observer.complete();
          }
        );
    });
  }

  // Updated Exsisting Material Type
  updateMaterialType(
    id: number,
    data: MaterialTypeModel
  ): Observable<[boolean, MaterialTypeModel]> {
    let materialTypeModel: MaterialTypeModel = {
      id: data.id,
      storage_type_id: data.storage_type_id,
      storage_type: data.storage_type,
      code: data.code == '' ? '-' : data.code,
      material_type: data.material_type == '' ? '-' : data.material_type,
      groupings: data.groupings == '' ? '-' : data.groupings,
      pallet_packaging: data.pallet_packaging == '' ? '-' : data.pallet_packaging,
      particulars: data.groupings == '' ? '-' : data.particulars,
    };

    return new Observable<[boolean, MaterialTypeModel]>((observer) => {
      this.http
        .put<MaterialTypeModel>(
          this.defaultAPIURLHost + '/api/material_types/' + id,
          materialTypeModel,
          httpOptions
        )
        .subscribe(
          (response) => {
            let data = response;
            observer.next([true, data]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error['error'].message]);
            observer.complete();
          }
        );
    });
  }

  // Delete Material Type By ID
  deleteMaterialType(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, MaterialTypeModel]>((observer) => {
      this.http
        .delete<MaterialTypeModel>(
          this.defaultAPIURLHost + '/api/material_types/' + id,
          httpOptions
        )
        .subscribe(
          (response) => {
            observer.next([true, response]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.error]);
            observer.complete();
          }
        );
    });
  }

  getAllMaterialType(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let materialTypeList: MaterialTypeModel[] = [];

      this.http
        .get<any>(this.defaultAPIURLHost + '/api/material_types', httpOptions)
        .subscribe(
          (response) => {
            let results = response;

            let result_data = results['data'];

            if (result_data != null) {
              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  materialTypeList.push({
                    id: data[i].id,
                    material_type: data[i].material_type,
                    storage_type_id: data[i].storage_type_id,
                    storage_type: data[i].storage_type,
                    code: data[i].code,
                    groupings: data[i].groupings,
                    pallet_packaging: data[i].pallet_packaging,
                    particulars: data[i].particulars,
                  });
                }
              }
            }

            observer.next([true, materialTypeList]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  // Get Material Type by Storage Type Id
  getMaterialTypeByStorageTypeId(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let materialType: MaterialTypeModel[] = [];

      this.http
        .get<any>(
          this.defaultAPIURLHost + '/api/material_types/by-storageType/' + id,
          httpOptions
        )
        .subscribe(
          (response) => {
            let result = response['data'];

            if (result.length > 0) {
              let data = result;
              for (let i = 0; i < data.length; i++) {
                materialType.push({
                  id: data[i].id,
                  material_type: data[i].material_type,
                  storage_type_id: data[i].storage_type_id,
                  storage_type: data[i].storage_type,
                  code: data[i].code,
                  groupings: data[i].groupings,
                  pallet_packaging: data[i].pallet_packaging,
                  particulars: data[i].particulars,
                });
              }
            }

            observer.next([true, materialType]);
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
