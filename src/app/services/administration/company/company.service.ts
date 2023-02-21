import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { CompanyModel } from 'src/app/models/administration/company.model';
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
export class CompanyService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  private defaultAPIURLHost: string = this.appSettings.APIURLHost;

  // Get all Company list

  getAllCompanies(page: string, keywords: string): Observable<[boolean, PaginationModel]> {
    return new Observable<[boolean, PaginationModel]>((observer) => {
      let companyList: CompanyModel[] = [];
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
        .get<any>(this.defaultAPIURLHost + '/api/companies?' + page + '&keywords='+ keywords, httpOptions)
        .subscribe(
          (response) => {
            let results = response;
            let results_data = response['data'];
            let results_meta = response['meta'];


            if (results != null) {
              var data = results_data;

              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  companyList.push({
                    id: data[i].id,
                    company: data[i].company,
                    address: data[i].address,
                  });
                }
              }
            }
      
            pagination.meta = results_meta
            pagination.first = results["links"]["first"] != null ? results["links"]["first"].split('?')[1] : null;
            pagination.prev = results["links"]["prev"] != null ? results["links"]["prev"].split('?')[1] : null;
            pagination.next = results["links"]["next"] != null ? results["links"]["next"].split('?')[1] : null;
            pagination.last = results["links"]["last"] != null ? results["links"]["last"].split('?')[1] : null;
            pagination.current_page = 'page=' + pagination.meta.current_page;
            pagination.data = companyList;

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


  // get all comapny list for branches

  getAllCompaniesBranches(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {
      let companyList: CompanyModel[] = [];

      this.http
        .get<any>(this.defaultAPIURLHost + '/api/companies', httpOptions)
        .subscribe(
          (response) => {

            let results = response;
            let results_data = response['data'];
           
            if (results != null) {
              var data = results_data;
              if (results_data.length > 0) {
                for (let i = 0; i <= results_data.length - 1; i++) {
                  companyList.push({
                    id: data[i].id,
                    company: data[i].company,
                    address: data[i].address,
                  });
                }
              }
            }

            observer.next([true, companyList]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  // Get branch by ID
  getCompanyById(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let company: CompanyModel;

      this.http
        .get<any>(this.defaultAPIURLHost + '/api/companies/' + id, httpOptions)
        .subscribe(
          (response) => {
            let result = response['data'];
            if (result != null) {
              company = {
                id: result.id,
                company: result.company,
                address: result.address,
              };
            }

            observer.next([true, company]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  // Register new Company
  addCompany(data: CompanyModel): Observable<[boolean, CompanyModel]> {
    let company: CompanyModel = {
      id: data.id,
      company: data.company == '' ? '-' : data.company,
      address: data.address == '' ? '-' : data.address,
    };
    return new Observable<[boolean, CompanyModel]>((observer) => {
      this.http
        .post<CompanyModel>(
          this.defaultAPIURLHost + '/api/companies',
          company,
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

  // Updated Exsisting Company
  updateCompany(
    id: number,
    data: CompanyModel
  ): Observable<[boolean, CompanyModel]> {
    let company: CompanyModel = {
      id: data.id,
      company: data.company == '' ? '-' : data.company,
      address: data.address == '' ? '-' : data.address,
    };
    return new Observable<[boolean, CompanyModel]>((observer) => {
      this.http
        .put<CompanyModel>(
          this.defaultAPIURLHost + '/api/companies/' + id,
          company,
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

  // Delete Company By ID
  deleteCompany(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.http
        .delete<CompanyModel>(
          this.defaultAPIURLHost + '/api/companies/' + id,
          httpOptions
        )
        .subscribe(
          (response) => {
            observer.next([true, response]);
            observer.complete();
          },
          (error) => {
            observer.next([false,error.status]);
            observer.complete();
          }
        );
    });
  }

  searchCompanies(keywords: string): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {
      let companyList: CompanyModel[] = [];

      this.http
        .get<any>(
          this.defaultAPIURLHost + '/api/companies?&keywords=' + keywords,
          httpOptions
        )
        .subscribe(
          (response) => {
            let results = response['data'];
            if (results != null) {
              var data = results;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  companyList.push({
                    id: data[i].id,
                    company: data[i].company,
                    address: data[i].address,
                  });
                }
              }
            }

            observer.next([true, companyList]);
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
