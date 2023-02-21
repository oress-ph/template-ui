import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { YardModel } from 'src/app/models/administration/yard.model';
import { PaginationModel } from 'src/app/models/shared/pagination.model';
import { TruckArrivalModel } from 'src/app/models/yard-management/truck-arrival.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class YardService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  // Get all Yard
  getAllYards(): Observable<[boolean, any]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let yard: YardModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/yards', httpOptions).subscribe(
        response => {

          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {

                yard.push({
                  id: data[i].id,
                  branch_id: data[i].branch_id,
                  yard: data[i].yard,
                  particulars: data[i].particulars,
                });
              }
            }
          }

          observer.next([true, yard]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }

  // Get All yards by branch id
  getYardsByBranchId(branch_id: number, page: string): Observable<[boolean, PaginationModel]> {
    return new Observable<[boolean, PaginationModel]>((observer) => {

      let yardArray: YardModel[] = [];
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
        .get<any>(this.defaultAPIURLHost + '/api/yards/by-warehouse/' + branch_id + '?' + page, httpOptions)
        .subscribe(
          (response) => {
            let results = response;

            let result_data = results['data'];
            if (result_data != null) {

              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  yardArray.push({
                    id: data[i].id,
                    branch_id: data[i].branch_id,
                    yard: data[i].yard,
                    particulars: data[i].particulars
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
            pagination.data = yardArray;

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
  
  // Get wyard by ID
  getYardById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let yard: YardModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/yards/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {

            yard = {
              id: result.id,
              branch_id: result.branch_id,
              yard: result.yard,
              particulars: result.particulars,
            };
          }

          observer.next([true, yard]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }

  // Register new Yard
  addYard(data: YardModel): Observable<[boolean, YardModel]> {

    let yard: YardModel = {
      id: data.id,
      branch_id: data.branch_id,
      yard: data.yard == '' ? '-' : data.yard,
      particulars: data.particulars == '' ? '-' : data.particulars,
    };

    return new Observable<[boolean, YardModel]>((observer) => {

      this.http.post<YardModel>(this.defaultAPIURLHost + '/api/yards', yard, httpOptions).subscribe(
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

  // Updated Exsisting yard
  updateYard(id: number, data: YardModel): Observable<[boolean, YardModel]> {

    let yard: YardModel = {
      id: data.id,
      branch_id: data.branch_id,
      yard: data.yard == '' ? '-' : data.yard,
      particulars: data.particulars == '' ? '-' : data.particulars,
    };
    return new Observable<[boolean, YardModel]>((observer) => {

      this.http.put<YardModel>(this.defaultAPIURLHost + '/api/yards/' + id, yard, httpOptions).subscribe(
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

  // Delete Yard By ID
  deleteYard(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, YardModel]>((observer) => {

      this.http.delete<YardModel>(this.defaultAPIURLHost + '/api/yards/' + id, httpOptions).subscribe(
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
  getDashboardOfYardManagement(
    yard_id: number,
    date: Date,
    page: string
  ): Observable<[boolean, PaginationModel]> {
    return new Observable<[boolean, PaginationModel]>((observer) => {
      let truckArrival: TruckArrivalModel[] = [];
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
            '/api/dashboard/yard-management/' + yard_id +
            '?' +
            page+
            '&date=' + date
            ,
          httpOptions
        )
        .subscribe(
          (response) => {
            let results = response;
            if (results != null) {
              var data = results['data'];
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  truckArrival.push({
                    id: data[i].id,
                    branch_id: data[i].branch_id,
                    ta_number: data[i].ta_number,
                    ta_date: data[i].ta_date,
                    manual_doc_number: data[i].manual_doc_number,
                    customer_id: data[i].customer_id,
                    customer: data[i].customer.customer,
                    address: data[i].customer.address,
                    tr_id: data[i].tr_id,
                    tr_number: data[i].tr_number,
                    container_number: data[i].container_number,
                    trucking_company: data[i].trucking_company,
                    container_size: data[i].container_size,
                    container_type: data[i].container_type,
                    temperature: data[i].temperature,
                    arrival_time: data[i].arrival_time,
                    arrival_delivery_no: data[i].arrival_delivery_no,
                    arrival_delivery_type: data[i].arrival_delivery_type,
                    arrival_seal_no: data[i].arrival_seal_no,
                    arrival_driver: data[i].arrival_driver,
                    arrival_helper: data[i].arrival_helper,
                    departure_time: data[i].departure_time,
                    departure_delivery_no: data[i].departure_delivery_no,
                    departure_delivery_type: data[i].departure_delivery_type,
                    departure_seal_no: data[i].departure_seal_no,
                    departure_driver: data[i].departure_driver,
                    departure_helper: data[i].departure_helper,
                    total_number_of_hours: data[i].total_number_of_hours,
                    warehouse_loading_dock_id:data[i].warehouse_loading_dock_id,
                    loading_dock: data[i].warehouse_loading_dock!=null? data[i].warehouse_loading_dock.loading_dock : '',
                    yard_plugin_station_id: data[i].yard_plugin_station_id,
                    plugin_station: data[i].yard_plugin_station!=null? data[i].yard_plugin_station.plugin_station : '',
                    remarks: data[i].remarks,
                    status: data[i].status,
                    prepared_by_user_id: data[i].prepared_by_user_id,
                    checked_by_user_id: data[i].checked_by_user_id,
                    approved_by_user_id: data[i].approved_by_user_id,
                    released_by_user_id: data[i].released_by_user_id,
                    is_locked: data[i].is_locked,
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
            pagination.data = truckArrival;

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
}
