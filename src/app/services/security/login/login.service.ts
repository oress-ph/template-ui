import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../../../app-settings';
import { LoginModel } from '../../../models/security/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private appSettings: AppSettings,
    private http: HttpClient
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any = {
    headers: new HttpHeaders({
      'Content-Type': ['application/x-www-form-urlencoded', 'application/json']
    })
  };

  userlogin(data: any): Observable<LoginModel | any> {
    return new Observable<LoginModel | any>((observer) => {
      this.http
        .post(
          this.defaultAPIURLHost + '/api/login', data
        )
        .subscribe(
          (response) => {
            observer.next([true, response]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error]);
            observer.complete();
          }
        );
    });
  }

  handleErrorLogin(error: HttpErrorResponse) {
    return throwError(error);
  }
}
