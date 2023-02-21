import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { MaterialCategoryModel } from 'src/app/models/administration/material-category.model';
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
export class MaterialCategoryService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  // Get all material category list
  getAllMaterialCategories(
    page: string,
    keywords: string
  ): Observable<[boolean, PaginationModel]> {
    return new Observable<[boolean, PaginationModel]>((observer) => {
      let materialCategoryList: MaterialCategoryModel[] = [];
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
            '/api/material_categories?' +
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
                  materialCategoryList.push({
                    id: data[i].id,
                    code: data[i].code,
                    material_category: data[i].material_category,
                    particulars: data[i].particulars,
                  });
                }
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
            pagination.data = materialCategoryList;

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

  // Get Material Category by ID
  getMaterialCategoryById(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let materialCategory: MaterialCategoryModel;

      this.http
        .get<any>(
          this.defaultAPIURLHost + '/api/material_categories/' + id,
          httpOptions
        )
        .subscribe(
          (response) => {
            let result = response['data'];
            if (result != null) {
              materialCategory = {
                id: result.id,
                code: result.code,
                material_category: result.material_category,
                particulars: result.particulars,
              };
            }

            observer.next([true, materialCategory]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  // Register new Material Category
  addMaterialCategory(
    data: MaterialCategoryModel
  ): Observable<[boolean, MaterialCategoryModel]> {
    let materialCategoryModel: MaterialCategoryModel = {
      id: data.id,
      code: data.code == '' ? '-' : data.code,
      material_category:
        data.material_category == '' ? '-' : data.material_category,
      particulars: data.particulars == '' ? '-' : data.particulars,
    };
    return new Observable<[boolean, MaterialCategoryModel]>((observer) => {
      this.http
        .post<MaterialCategoryModel>(
          this.defaultAPIURLHost + '/api/material_categories',
          materialCategoryModel,
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

  // Updated Exsisting Material Category
  updateMaterialCategory(
    id: number,
    data: MaterialCategoryModel
  ): Observable<[boolean, MaterialCategoryModel]> {
    let materialCategoryModel: MaterialCategoryModel = {
      id: data.id,
      code: data.code == '' ? '-' : data.code,
      material_category:
        data.material_category == '' ? '-' : data.material_category,
      particulars: data.particulars == '' ? '-' : data.particulars,
    };

    return new Observable<[boolean, MaterialCategoryModel]>((observer) => {
      this.http
        .put<MaterialCategoryModel>(
          this.defaultAPIURLHost + '/api/material_categories/' + id,
          materialCategoryModel,
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

  // Delete Material Category By ID
  deleteMaterialCategory(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, MaterialCategoryModel]>((observer) => {
      this.http
        .delete<MaterialCategoryModel>(
          this.defaultAPIURLHost + '/api/material_categories/' + id,
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

  getAllMaterial(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let materialCategoryList: MaterialCategoryModel[] = [];
      this.http
        .get<any>(
          this.defaultAPIURLHost + '/api/material_categories',
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
                  materialCategoryList.push({
                    id: data[i].id,
                    code: data[i].code,
                    material_category: data[i].material_category,
                    particulars: data[i].particulars,
                  });
                }
              }
            }

            observer.next([true, materialCategoryList]);
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
