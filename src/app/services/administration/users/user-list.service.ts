import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppSettings } from '../../../app-settings';
import { RegisterModel } from 'src/app/models/security/register.model';
import { UserModel } from 'src/app/models/administration/user.model';
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
export class UserListService {
  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  defaultAPIURLHost: string = this.appSettings.APIURLHost;
  options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  // Get all User list

  getAllUsers(
    page: string,
    keywords: string
  ): Observable<[boolean, PaginationModel]> {
    return new Observable<[boolean, PaginationModel]>((observer) => {
      let userList: UserModel[] = [];
      let pagination: PaginationModel = {
        data: [],
        first: null,
        prev: null,
        next: null,
        last: null,
        current_page: null,
        meta: null,
      };

      this.httpClient
        .get<any>(
          this.defaultAPIURLHost +
          '/api/users?' +
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
                  userList.push({
                    id: data[i].id,
                    username: data[i].username,
                    name: data[i].name,
                    email: data[i].email,
                    user_type: data[i].user_type,
                    warehouse_id: data[i].warehouse_id,
                    warehouse: data[i].warehouse,
                    is_active: data[i].is_active === 0 ? false : true,
                    password: data[i].password,
                    password_confirmation: data[i].password_confirmation,
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
            pagination.data = userList;

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

  getAllUsersList(): Observable<[boolean, UserModel[]]> {
    return new Observable<[boolean, UserModel[]]>((observer) => {
      let userList: UserModel[] = [];
      this.httpClient
        .get<any>(this.defaultAPIURLHost + '/api/users/get_user_dropdowns', httpOptions)
        .subscribe(
          (response) => {
            let results = response;

            let result_data = results['data'];
            if (result_data != null) {
              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  userList.push({
                    id: data[i].id == '' ? '-' : data[i].id,
                    username: data[i].username == '' ? '-' : data[i].username,
                    name: data[i].name == '' ? '-' : data[i].name,
                    email: data[i].email == '' ? '-' : data[i].email,
                    user_type: data[i].user_type == '' ? '-' : data[i].user_type,
                    warehouse_id: data[i].warehouse_id,
                    warehouse: data[i].warehouse,
                    is_active: data[i].is_active === 0 ? false : true,
                    password: data[i].password == '' ? '-' : data[i].password,
                    password_confirmation: data[i].password_confirmation == '' ? '-' : data[i].password_confirmation,
                  });
                }
              }
            }

            observer.next([true, userList]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  public addUser(userModel: UserModel): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let url = this.defaultAPIURLHost + '/api/register';
      this.httpClient.post(url, userModel, this.options).subscribe(
        (response) => {
          let data = response;
          observer.next([true, data]);
          observer.complete();
        },
        (error) => {
          observer.next([false, error['error'].error_description]);
          observer.complete();
        }
      );
    });
  }
  getUsersByUserType(data: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + '/api/users/get_users_by_user_type', JSON.stringify(data), httpOptions).subscribe(
        (response:any) => {
          let data = response['data'];
          observer.next([true, data]);
          observer.complete();
        },
        (error) => {
          let _error = {
            status: error.status,
            message: error['error'].message,
          };
          observer.next([false, _error]);
          observer.complete();
        }
      );
    });
  }
  
  getUserById(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let user: UserModel;

      this.httpClient
        .get<any>(this.defaultAPIURLHost + '/api/users/' + id, httpOptions)
        .subscribe(
          (response) => {
            let result = response['data'];
            if (result != null) {
              user = {
                id: result.id,
                username: result.username,
                name: result.name,
                email: result.email,
                user_type: result.user_type,
                warehouse_id: result.warehouse_id,
                warehouse: result.warehouse == null ? '-' : result.warehouse.warehouse,
                is_active: result.is_active === 0 ? false : true,
                password: result.password,
                password_confirmation: result.password_confirmation
              };
            }

            observer.next([true, user]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }


  getAllUserIsActive(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let users: UserModel[] = []

      this.httpClient
        .get<any>(this.defaultAPIURLHost + '/api/get-all-users-active', httpOptions)
        .subscribe(
          (response) => {
            let result_data = response['data'];
            if (result_data != null) {
              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  users.push({
                    id: data[i].id == '' ? '-' : data[i].id,
                    username: data[i].username == '' ? '-' : data[i].username,
                    name: data[i].name == '' ? '-' : data[i].name,
                    email: data[i].email == '' ? '-' : data[i].email,
                    user_type: data[i].user_type == '' ? '-' : data[i].user_type,
                    warehouse_id: data[i].warehouse_id,
                    warehouse: data[i].warehouse,
                    is_active: data[i].is_active === 0 ? false : true,
                    password: data[i].password == '' ? '-' : data[i].password,
                    password_confirmation: data[i].password_confirmation == '' ? '-' : data[i].password_confirmation,
                  });
                }
              }
            }

            observer.next([true, users]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  // Updated Existing User
  updateUsers(id: number, data: UserModel): Observable<[boolean, UserModel]> {
    let user: UserModel = {
      id: data.id,
      username: data.username,
      name: data.name,
      email: data.email,
      user_type: data.user_type,
      warehouse_id: data.warehouse_id,
      warehouse: data.warehouse,
      is_active: data.is_active,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };
    return new Observable<[boolean, UserModel]>((observer) => {
      this.httpClient
        .put<UserModel>(
          this.defaultAPIURLHost + '/api/users/' + id,
          user,
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

  // Delete Branch By ID
  deleteUser(id: number): Observable<[boolean, UserModel]> {
    return new Observable<[boolean, UserModel]>((observer) => {
      this.httpClient
        .delete<UserModel>(
          this.defaultAPIURLHost + '/api/users/' + id,
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

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  searchUsers(keywords: string): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {
      let userList: UserModel[] = [];

      this.httpClient
        .get<any>(
          this.defaultAPIURLHost + '/api/users?&keywords=' + keywords,
          httpOptions
        )
        .subscribe(
          (response) => {
            let results = response['data'];
            if (results != null) {
              var data = results;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  userList.push({
                    id: data[i].id,
                    username: data[i].username,
                    name: data[i].name,
                    email: data[i].email,
                    user_type: data[i].user_type,
                    warehouse_id: data[i].warehouse_id,
                    warehouse: data[i].warehouse,
                    is_active: data[i].is_active === 0 ? false : true,
                    password: data[i].password,
                    password_confirmation: data[i].password_confirmation,
                  });
                }
              }
            }
            observer.next([true, userList]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  changePassword(id: number, data: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient
        .post<UserModel>(
          this.defaultAPIURLHost + '/api/change-password/' + id,
          data,
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

  checkTokenExpiration(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.httpClient.get<boolean>(`${this.defaultAPIURLHost}/api/check-token`, httpOptions).subscribe(
        (response: any) => {
          observer.next(response.authorized);
          observer.complete();
        },
        (error) => {
          observer.next(false);
          observer.complete();
        }
      )
    })
  }
}
