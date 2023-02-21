import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { SystemModuleModel } from 'src/app/models/administration/system-module.model';
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
export class SystemModuleService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  // Get all System Modules List

  getAllSystemModulesPaginate(page: string, keywords:string): Observable<[boolean, PaginationModel]> {
    return new Observable<[boolean, PaginationModel]>((observer) => {

      let systemModulesList: SystemModuleModel[] = [];
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
        .get<any>(this.defaultAPIURLHost + '/api/system_modules?' + page + '&keywords='+ keywords, httpOptions)
        .subscribe(
          (response) => {
            let results = response;

            let result_data = results['data'];
            if (result_data != null) {

              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  systemModulesList.push({
                    id: data[i].id,
                    system_module: data[i].system_module,
                    description: data[i].description,
                  });
                }
              }
            }

            pagination.meta = results["meta"]
            pagination.first = results["links"]["first"] != null ? results["links"]["first"].split('?')[1] : null;
            pagination.prev = results["links"]["prev"] != null ? results["links"]["prev"].split('?')[1] : null;
            pagination.next = results["links"]["next"] != null ? results["links"]["next"].split('?')[1] : null;
            pagination.last = results["links"]["last"] != null ? results["links"]["last"].split('?')[1] : null;
            pagination.current_page = 'page=' + pagination.meta.current_page;
            pagination.data = systemModulesList;

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

  getAllSystemModules(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {
      let systemModulesList: SystemModuleModel[] = [];

      this.http
        .get<any>(this.defaultAPIURLHost + '/api/system_modules', httpOptions)
        .subscribe(
          (response) => {
            let results = response['data'];

            if (results != null) {
              var data = results;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  systemModulesList.push({
                    id: data[i].id,
                    system_module: data[i].system_module,
                    description: data[i].description,
                  });
                }
              }
            }

            observer.next([true, systemModulesList]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }


  getAllSystemModulesDropdown(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {

      let systemModulesList: SystemModuleModel[] = [];

      this.http
        .get<any>(this.defaultAPIURLHost + '/api/system_modules/by-dropdown-list', httpOptions)
        .subscribe(
          (response) => {
            let results = response['data'];

            if (results != null) {
              var data = results;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  systemModulesList.push({
                    id: data[i].id,
                    system_module: data[i].system_module,
                    description: data[i].description,
                  });
                }
              }
            }

            observer.next([true, systemModulesList]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  // Get System Module by ID
  getSystemModuleById(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let systemModule: SystemModuleModel;

      this.http
        .get<any>(
          this.defaultAPIURLHost + '/api/system_modules/' + id,
          httpOptions
        )
        .subscribe(
          (response) => {
            let result = response['data'];
            if (result != null) {
              systemModule = {
                id: result.id,
                system_module: result.system_module,
                description: result.description,
              };
            }

            observer.next([true, systemModule]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  // Register new System Module
  addSystemModule(
    data: SystemModuleModel
  ): Observable<[boolean, SystemModuleModel]> {
    let systemModule: SystemModuleModel = {
      id: data.id,
      system_module: data.system_module == '' ? '-' : data.system_module,
      description: data.description == '' ? '-' : data.description,
    };

    return new Observable<[boolean, SystemModuleModel]>((observer) => {
      this.http
        .post<SystemModuleModel>(
          this.defaultAPIURLHost + '/api/system_modules',
          systemModule,
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

  // Updated Exsisting System Module
  updateSystemModule(
    id: number,
    data: SystemModuleModel
  ): Observable<[boolean, SystemModuleModel]> {
    let systemModule: SystemModuleModel = {
      id: data.id,
      system_module: data.system_module == '' ? '-' : data.system_module,
      description: data.description == '' ? '-' : data.description,
    };
    return new Observable<[boolean, SystemModuleModel]>((observer) => {
      this.http
        .put<SystemModuleModel>(
          this.defaultAPIURLHost + '/api/system_modules/' + id,
          systemModule,
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

  // Delete Storage Type Material By ID
  deleteSystemModule(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.http
        .delete<SystemModuleModel>(
          this.defaultAPIURLHost + '/api/system_modules/' + id,
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

  searchSystemModules(page: string, keywords: string): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {
      let systemModulesList: SystemModuleModel[] = [];

      this.http
        .get<any>(
          this.defaultAPIURLHost + '/api/system_modules?' + page + '&keywords=' + keywords,
          httpOptions
        )
        .subscribe(
          (response) => {
            let results = response['data'];

            if (results != null) {
              var data = results;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  systemModulesList.push({
                    id: data[i].id,
                    system_module: data[i].system_module,
                    description: data[i].description,
                  });
                }
              }
            }

            observer.next([true, systemModulesList]);
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
