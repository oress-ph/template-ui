import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { SelectionModel } from 'src/app/models/administration/selection.model';
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
export class SelectionService {

  constructor(private http: HttpClient, private appSettings: AppSettings) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;

  getSelections(page: string, keywords: string): Observable<[boolean, PaginationModel]> {
    return new Observable<[boolean, PaginationModel]>((observer) => {

      let selectionModel: SelectionModel[] = [];
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
        .get<any>(this.defaultAPIURLHost + '/api/selections?' + page + '&keywords=' + keywords, httpOptions)
        .subscribe(
          (response) => {

            let results = response;
            let result_data = results['data'];
            if (result_data != null) {

              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  selectionModel.push({
                    id: data[i].id,
                    code: data[i].code,
                    value: data[i].value,
                    category: data[i].category,
                    particulars: data[i].particulars,
                  });
                }
              }

              pagination.meta = results["meta"]
              pagination.first = results["links"]["first"] != null ? results["links"]["first"].split('?')[1] : null;
              pagination.prev = results["links"]["prev"] != null ? results["links"]["prev"].split('?')[1] : null;
              pagination.next = results["links"]["next"] != null ? results["links"]["next"].split('?')[1] : null;
              pagination.last = results["links"]["last"] != null ? results["links"]["last"].split('?')[1] : null;
              pagination.current_page = 'page=' + pagination.meta.current_page;
              pagination.data = selectionModel;
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

  getSelectionsByCategory(category: string): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {

      let selectionModelArray: SelectionModel[] = [];

      this.http
        .get<any>(this.defaultAPIURLHost + '/api/selections/by-category?' + 'category=' + category, httpOptions)
        .subscribe(
          (response) => {

            let results = response;
            let result_data = results['data'];
            if (result_data != null) {

              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  selectionModelArray.push({
                    id: data[i].id,
                    code: data[i].code,
                    value: data[i].value,
                    category: data[i].category,
                    particulars: data[i].particulars,
                  });
                }
              }

            }

            observer.next([true, selectionModelArray]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  getSelectionById(id: number): Observable<[boolean, SelectionModel]> {
    return new Observable<[boolean, SelectionModel]>((observer) => {
      let selection: SelectionModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/selections/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data'];
          if (result != null) {
            selection = {
              id: result.id,
              code: result.code,
              value: result.value,
              category: result.category,
              particulars: result.particulars,
            };
          }

          observer.next([true, selection]);
          observer.complete();
        },
        (error) => {
          observer.next([false, error.status]);
          observer.complete();
        }
      );
    });
  }

  addSelection(data: SelectionModel) {

    let selectionModel: SelectionModel = {
      id: data.id,
      code: data.code == '' ? '-' : data.code,
      value: data.value == '' ? '-' : data.value,
      category: data.category == '' ? '-' : data.category,
      particulars: data.particulars == '' ? '-' : data.particulars,
    };

    return new Observable<[boolean, SelectionModel]>((observer) => {
      this.http
        .post<SelectionModel>(
          this.defaultAPIURLHost + '/api/selections',
          selectionModel,
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


  updateSelection(id: number, data: SelectionModel): Observable<[boolean, SelectionModel]> {

    let selectionModel: SelectionModel = {
      id: data.id,
      code: data.code == '' ? '-' : data.code,
      value: data.value == '' ? '-' : data.value,
      category: data.category == '' ? '-' : data.category,
      particulars: data.particulars == '' ? '-' : data.particulars,
    };

    return new Observable<[boolean, SelectionModel]>((observer) => {
      this.http
        .put<SelectionModel>(
          this.defaultAPIURLHost + '/api/selections/' + id,
          selectionModel,
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

  deleteSelection(id: number): Observable<[boolean, SelectionModel]> {
    return new Observable<[boolean, SelectionModel]>((observer) => {
      this.http
        .delete<SelectionModel>(
          this.defaultAPIURLHost + '/api/selections/' + id,
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
