import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { UnitOfMeasuredModel } from 'src/app/models/administration/unit-of-measure.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class UnitOfMeasureService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;


  // Get all Unit of Measure List
  getAllUnitOfMeasure(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let unitOfmeasurement: UnitOfMeasuredModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/unit_of_measures', httpOptions).subscribe(
        response => {

          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {

                unitOfmeasurement.push({
                  id: data[i].id,
                  unit: data[i].unit,
                  particulars: data[i].particulars
                });
              }
            }
          }

          observer.next([true, unitOfmeasurement]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }


  // Get Unit of measure by ID
  getUnitOfMeasureById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let unitOfMeasure: UnitOfMeasuredModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/unit_of_measures/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {
            unitOfMeasure = {
              id: result.id,
              unit: result.unit,
              particulars: result.particulars,
            };
          }

          observer.next([true, unitOfMeasure]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }


  // Register new Unit of Measure
  addUnitOfMeasure(data: UnitOfMeasuredModel): Observable<[boolean, UnitOfMeasuredModel]> {

    let unitOfmeasure: UnitOfMeasuredModel = {
      id: data.id,
      unit: data.unit,
      particulars: data.particulars,
    };

    return new Observable<[boolean, UnitOfMeasuredModel]>((observer) => {

      this.http.post<UnitOfMeasuredModel>(this.defaultAPIURLHost + '/api/unit_of_measures', unitOfmeasure, httpOptions).subscribe(
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

  // Updated Exsisting Unit of measure
  updateUnitOfMeasure(id: number, data: UnitOfMeasuredModel): Observable<[boolean, UnitOfMeasuredModel]> {

    let unitOfMeasure: UnitOfMeasuredModel = {
      id: data.id,
      unit: data.unit,
      particulars: data.particulars,
    };
    return new Observable<[boolean, UnitOfMeasuredModel]>((observer) => {

      this.http.put<UnitOfMeasuredModel>(this.defaultAPIURLHost + '/api/unit_of_measures/' + id, unitOfMeasure, httpOptions).subscribe(
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


  // Delete Unit of Measure By ID
  deleteUnitOfMeasure(id: number): Observable<[boolean, UnitOfMeasuredModel]> {

    return new Observable<[boolean, UnitOfMeasuredModel]>((observer) => {

      this.http.delete<UnitOfMeasuredModel>(this.defaultAPIURLHost + '/api/unit_of_measures/' + id, httpOptions).subscribe(
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
