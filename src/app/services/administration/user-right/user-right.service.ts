import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { UserRightModel } from 'src/app/models/administration/user-right.model';
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
export class UserRightService {
  constructor(private http: HttpClient, private appSettings: AppSettings) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  getAllUserRights(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {
      let userRights: UserRightModel[] = [];

      this.http
        .get<any>(this.defaultAPIURLHost + '/api/user_rights', httpOptions)
        .subscribe(
          (response) => {
            let results = response['data'];
            if (results != null) {
              var data = results;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  userRights.push({
                    id: data[i].id,
                    user_id: data[i].user_id,
                    system_module_id: data[i].system_module_id,
                    system_module: data[i].system_module,
                    can_add: data[i].can_add,
                    can_edit: data[i].can_edit,
                    can_save: data[i].can_save,
                    can_delete: data[i].can_delete,
                    can_print: data[i].can_print,
                    can_lock: data[i].can_lock,
                    can_unlock: data[i].can_unlock,
                  });
                }
              }
            }

            observer.next([true, userRights]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  getCurrentUserRight(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {

      let userRightsArray: UserRightModel[] = [];

      this.http
        .get<any>(this.defaultAPIURLHost + '/api/user-rights/by-login-user', httpOptions)
        .subscribe(
          (response) => {
            let results = response;

            let result_data = results['data'];
            if (result_data != null) {

              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  if (data[i].system_module != null) {
                    userRightsArray.push({
                      id: data[i].id,
                      user_id: data[i].user_id,
                      system_module_id: data[i].system_module_id,
                      system_module: data[i].system_module,
                      can_add: data[i].can_add,
                      can_edit: data[i].can_edit,
                      can_save: data[i].can_save,
                      can_delete: data[i].can_delete,
                      can_print: data[i].can_print,
                      can_lock: data[i].can_lock,
                      can_unlock: data[i].can_unlock,
                    });
                  }
                }
              }
            }

            observer.next([true, userRightsArray]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  getUserRightsByUserId(user_id: number, page: string): Observable<[boolean, PaginationModel]> {
    return new Observable<[boolean, PaginationModel]>((observer) => {

      let userRightsArray: UserRightModel[] = [];
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
        .get<any>(this.defaultAPIURLHost + '/api/user_rights/by-user/' + user_id + '?' + page, httpOptions)
        .subscribe(
          (response) => {
            let results = response;

            let result_data = results['data'];
            if (result_data != null) {

              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  if (data[i].system_module != null) {
                    userRightsArray.push({
                      id: data[i].id,
                      user_id: data[i].user_id,
                      system_module_id: data[i].system_module_id,
                      system_module: data[i].system_module,
                      can_add: data[i].can_add,
                      can_edit: data[i].can_edit,
                      can_save: data[i].can_save,
                      can_delete: data[i].can_delete,
                      can_print: data[i].can_print,
                      can_lock: data[i].can_lock,
                      can_unlock: data[i].can_unlock,
                    });
                  }
                }
              }
            }
            pagination.meta = results["meta"]
            pagination.first = results["links"]["first"] != null ? results["links"]["first"].split('?')[1] : null;
            pagination.prev = results["links"]["prev"] != null ? results["links"]["prev"].split('?')[1] : null;
            pagination.next = results["links"]["next"] != null ? results["links"]["next"].split('?')[1] : null;
            pagination.last = results["links"]["last"] != null ? results["links"]["last"].split('?')[1] : null;
            pagination.current_page = 'page=' + pagination.meta.current_page;
            pagination.data = userRightsArray;

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

  getUserRightsById(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let userRights: UserRightModel;

      this.http
        .get<any>(
          this.defaultAPIURLHost + '/api/user_rights/' + id,
          httpOptions
        )
        .subscribe(
          (response) => {
            let result = response['data'];
            if (result != null) {
              userRights = {
                id: result.id,
                user_id: result.user_id,
                system_module_id: result.system_module_id,
                system_module: result.system_module,
                can_add: result.can_add,
                can_edit: result.can_edit,
                can_save: result.can_save,
                can_delete: result.can_delete,
                can_print: result.can_print,
                can_lock: result.can_lock,
                can_unlock: result.can_unlock,
              };
            }

            observer.next([true, userRights]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  adduserRights(data: UserRightModel): Observable<[boolean, UserRightModel]> {
    let userRights: UserRightModel = {
      id: data.id,
      user_id: data.user_id,
      system_module_id: data.system_module_id,
      system_module: data.system_module,
      can_add: data.can_add,
      can_edit: data.can_edit,
      can_save: data.can_save,
      can_delete: data.can_delete,
      can_print: data.can_print,
      can_lock: data.can_lock,
      can_unlock: data.can_unlock,
    };

    return new Observable<[boolean, UserRightModel]>((observer) => {
      this.http
        .post<UserRightModel>(
          this.defaultAPIURLHost + '/api/user_rights',
          userRights,
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

  copyUserRights(current_id: number, from_user_id: any): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {
      this.http
        .post<any>(
          this.defaultAPIURLHost + '/api/user_rights/copy_user_rights/' + current_id,
          from_user_id,
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

  updateUserRights(
    id: number,
    data: UserRightModel
  ): Observable<[boolean, UserRightModel]> {
    let userRights: UserRightModel = {
      id: data.id,
      user_id: data.user_id,
      system_module_id: data.system_module_id,
      system_module: data.system_module,
      can_add: data.can_add,
      can_edit: data.can_edit,
      can_save: data.can_save,
      can_delete: data.can_delete,
      can_print: data.can_print,
      can_lock: data.can_lock,
      can_unlock: data.can_unlock,
    };
    return new Observable<[boolean, UserRightModel]>((observer) => {
      this.http
        .put<UserRightModel>(
          this.defaultAPIURLHost + '/api/user_rights/' + id,
          userRights,
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

  // Delete User Rights By ID
  deleteUserRight(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, UserRightModel]>((observer) => {
      this.http
        .delete<UserRightModel>(
          this.defaultAPIURLHost + '/api/user_rights/' + id,
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
