import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { WarehouseModel } from 'src/app/models/administration/warehouse.model';
import { PaginationModel } from 'src/app/models/shared/pagination.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  // Get all warehouses
  getAllwarehouses(): Observable<[boolean, any]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let warehouses: WarehouseModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/warehouses', httpOptions).subscribe(
        response => {

          let results = response;
          let results_data = response['data']
          if (results != null) {

            var data = results_data;
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {

                warehouses.push({
                  id: data[i].id,
                  branch_id: data[i].branch_id,
                  warehouse: data[i].warehouse,
                  particulars: data[i].particulars,
                });
              }
            }
          }

          observer.next([true, warehouses]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }

  
  getWarehouseByBranchId(branch_id: number, page: string): Observable<[boolean, PaginationModel]> {
    return new Observable<[boolean, PaginationModel]>((observer) => {

      let warehouseArray: WarehouseModel[] = [];
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
        .get<any>(this.defaultAPIURLHost + '/api/warehouses/by-branch/' + branch_id + '?' + page, httpOptions)
        .subscribe(
          (response) => {
            let results = response;

            let result_data = results['data'];
            if (result_data != null) {

              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  warehouseArray.push({
                    id: data[i].id,
                    branch_id: data[i].branch_id,
                    warehouse: data[i].warehouse,
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
            pagination.data = warehouseArray;

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
 

  // Get warehouse by ID
  getWarehouseById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let warehouse: WarehouseModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/warehouses/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {
            warehouse = {
              id: result.id,
              branch_id: result.branch_id,
              warehouse: result.warehouse,
              particulars: result.particulars,
            };
          }

          observer.next([true, warehouse]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }


  // Register new warehouse
  addWarehouse(data: WarehouseModel): Observable<[boolean, WarehouseModel]> {

    let warehouse: WarehouseModel = {
      id: data.id,
      branch_id: data.branch_id,
      warehouse: data.warehouse == '' ? '-' : data.warehouse,
      particulars: data.particulars == '' ? '-' : data.particulars,
    };

    return new Observable<[boolean, WarehouseModel]>((observer) => {

      this.http.post<WarehouseModel>(this.defaultAPIURLHost + '/api/warehouses', warehouse, httpOptions).subscribe(
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

  // Updated Exsisting warehouse
  updateWarehouse(id: number, data: WarehouseModel): Observable<[boolean, WarehouseModel]> {

    let warehouse: WarehouseModel = {
      id: data.id,
      branch_id: data.branch_id,
      warehouse: data.warehouse == '' ? '-' : data.warehouse,
      particulars: data.particulars == '' ? '-' : data.particulars,
    };
    return new Observable<[boolean, WarehouseModel]>((observer) => {

      this.http.put<WarehouseModel>(this.defaultAPIURLHost + '/api/warehouses/' + id, warehouse, httpOptions).subscribe(
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

  deleteWarehouse(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, WarehouseModel]>((observer) => {

      this.http.delete<WarehouseModel>(this.defaultAPIURLHost + '/api/warehouses/' + id, httpOptions).subscribe(
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


   // DOWNLOAD PDF

   generatePDF(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      
      let pdfOptions: any = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
        responseType: 'blob',
      };

      return this.http.get<any>(this.defaultAPIURLHost + '/api/warehouses/generate-pdf', pdfOptions).subscribe((response: any) => {
        observer.next([true, response])
        observer.complete()
      }, (error) => {
        observer.next([false, error.status])
        observer.complete()
      })
    })
  }


}
