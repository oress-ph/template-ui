import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { BranchModel } from 'src/app/models/administration/branch.models';
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
export class BranchService {

  constructor(
    private http: HttpClient,
    private appSettings: AppSettings
  ) { }

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  getBranchByCompanyId(company_id: number, page: string): Observable<[boolean, PaginationModel]> {
    return new Observable<[boolean, PaginationModel]>((observer) => {

      let branchList: BranchModel[] = [];
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
        .get<any>(this.defaultAPIURLHost + '/api/branches/by-company/' + company_id + '?' + page, httpOptions)
        .subscribe(
          (response) => {

            let results = response;
            let result_data = results['data'];
            if (result_data != null) {

              var data = result_data;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  branchList.push({
                    id: data[i].id,
                    company_id: data[i].company_id,
                    branch: data[i].branch,
                    contact_person: data[i].contact_person,
                    contact_number: data[i].contact_number,
                    address: data[i].address,
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
            pagination.data = branchList;

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

  getAllBranches(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let branchList: BranchModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/branches', httpOptions).subscribe(
        response => {
          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {
                branchList.push({
                  id: data[i].id,
                  company_id: data[i].company_id,
                  contact_person: data[i].contact_person,
                  contact_number: data[i].contact_number,
                  branch: data[i].branch,
                  address: data[i].address,
                });
              }
            }
          }

          observer.next([true, branchList]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }


  getAllBranch(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {

      let branchList: BranchModel[] = [];

      this.http.get<any>(this.defaultAPIURLHost + '/api/branches/get-all', httpOptions).subscribe(
        response => {
          let results = response['data']
          if (results != null) {

            var data = results
            if (data.length > 0) {

              for (let i = 0; i <= data.length - 1; i++) {
                branchList.push({
                  id: data[i].id,
                  company_id: data[i].company_id,
                  warehouses: data[i].warehouses,
                  contact_person: data[i].contact_person,
                  contact_number: data[i].contact_number,
                  branch: data[i].branch,
                  address: data[i].address,
                });
              }
            }
          }

          observer.next([true, branchList]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }

  // Get branch by ID
  getBranchById(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, any]>((observer) => {

      let branch: BranchModel;

      this.http.get<any>(this.defaultAPIURLHost + '/api/branches/' + id, httpOptions).subscribe(
        (response) => {
          let result = response['data']
          if (result != null) {
            branch = {
              id: result.id,
              company_id: result.company_id,
              contact_person: result.contact_person,
              contact_number: result.contact_number,
              branch: result.branch,
              address: result.address,
            };
          }

          observer.next([true, branch]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }


  // Register new branch
  addBranch(data: BranchModel): Observable<[boolean, BranchModel]> {
    let branch: BranchModel = {
      id: data.id,
      company_id: data.company_id,
      contact_person: data.contact_person == '' ? '-' : data.contact_person,
      contact_number: data.contact_number == '' ? '-' : data.contact_number,
      branch: data.branch == '' ? '-' : data.branch,
      address: data.address == '' ? '-' : data.address,
    };
    return new Observable<[boolean, BranchModel]>((observer) => {

      this.http.post<BranchModel>(this.defaultAPIURLHost + '/api/branches', branch, httpOptions).subscribe(
        (response: any) => {
          
          let data = response["data"];
          observer.next([true, data]);
          observer.complete();
        },
        (error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    });
  }

  // Updated Exsisting Branch
  updateBranch(id: number, data: BranchModel): Observable<[boolean, BranchModel]> {
    let branch: BranchModel = {
      id: data.id,
      company_id: data.company_id,
      contact_person: data.contact_person == '' ? '-' : data.contact_person,
      contact_number: data.contact_number == '' ? '-' : data.contact_number,
      branch: data.branch == '' ? '-' : data.branch,
      address: data.address == '' ? '-' : data.address,
    };
    return new Observable<[boolean, BranchModel]>((observer) => {

      this.http.put<BranchModel>(this.defaultAPIURLHost + '/api/branches/' + id, branch, httpOptions).subscribe(
        (response) => {

          let data = response;
          observer.next([true, data]);
          observer.complete();
        },(error) => {

          observer.next([false, error.status]);
          observer.complete();
        })
    })
  }

  

  // Delete Branch By ID
  deleteBranch(id: number): Observable<[boolean, any]> {

    return new Observable<[boolean, BranchModel]>((observer) => {

      this.http.delete<BranchModel>(this.defaultAPIURLHost + '/api/branches/' + id, httpOptions)
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
    })
  }
  
}
