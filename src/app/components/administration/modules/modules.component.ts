import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MessageService,
  ConfirmationService,
  LazyLoadEvent,
} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SystemModuleModel } from 'src/app/models/administration/system-module.model';
import { UserRightModel } from 'src/app/models/administration/user-right.model';
import { PaginationModel } from 'src/app/models/shared/pagination.model';
import { SystemModuleService } from 'src/app/services/administration/system-module/system-module.service';
import { UserRigthUiService } from 'src/app/services/security/user-right-ui/user-rigth-ui.service';
import { ModuleDetailComponent } from '../module-detail/module-detail.component';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit {
  user_right: UserRightModel = new UserRightModel();

  constructor(
    private systemModuleService: SystemModuleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private ref: DynamicDialogRef,
    private router: Router,
    private userRigthUiService: UserRigthUiService

  ) {
    let _userRight = this.userRigthUiService.pageRight("Administration - Modules");
    if (_userRight != null) this.user_right = _userRight;
    else this.router.navigate(['/admin/page-forbidden']);
  }

  lastTableLazyLoadEvent!: LazyLoadEvent;
  moduleList: SystemModuleModel[] = [];
  isLoading: boolean = true;
  position!: string;
  totalRecords: number = 0;
  keywords: string = '';

  // Pagination #1 start here 
  pagination: PaginationModel = new PaginationModel();
  page_detail: string = "";
  default_page: string = "page=1";
  current_page: string = "page=1";

  public firstPage() { this.getModuleList(this.pagination.first); }
  public prevPage() { this.getModuleList(this.pagination.prev); }
  public nextPage() { this.getModuleList(this.pagination.next); }
  public lastPage() { this.getModuleList(this.pagination.last); }

  getModulesLazyEvent(event: LazyLoadEvent | any): void {
    this.getModuleList(this.pagination.first);
  }
  // Pagination #1 start here 
  getModuleList(page: string) {
    this.pagination = new PaginationModel()
    this.isLoading = true;
    this.moduleList = [];
    this.totalRecords = 0;
    this.page_detail = '0 / 0';

    this.systemModuleService
      .getAllSystemModulesPaginate(page, this.keywords).subscribe(
        (response: any) => {

          let results = response;
          if (results[0] == true) {

            // Pagination #2 
            this.pagination = response[1]
            this.page_detail = this.pagination.meta.current_page + ' / ' + this.pagination.meta.last_page;
            this.current_page = this.pagination.current_page;
            this.totalRecords = this.pagination.meta.total;
            // Pagination #2 

            this.moduleList = this.pagination.data

            setTimeout(() => {
              this.isLoading = false;
            }, 500)
          } else {
            this.isLoading = false;
            this.messageService.add({
              severity: results[1] == 401 ? 'info' : 'error',
              summary: results[1],
              detail: results[1] == 401 ? 'Unauthorized' : 'Server Error',
            });
          }
        });
  }

  addModule() {
    let module: SystemModuleModel = new SystemModuleModel();
    this.ref = this.dialogService.open(ModuleDetailComponent, {
      header: 'Module',
      width: '480px',
      contentStyle: {
        'max-height': '650px',
        overflow: 'auto',
        'border-radius': '0 0 6px 6px',
      },
      baseZIndex: 10000,
      data: { data: module },
    });

    this.ref.onClose.subscribe((data) => {
      if (data == 200) {
        // Pagination #3 
        this.pagination.first = this.default_page;
        this.getModuleList(this.pagination.first);
        // Pagination #3
      }
    });
  }

  editModule(id: number) {

    this.systemModuleService.getSystemModuleById(id).subscribe({
      next: (response) => {

        let result = response;
        if (result[0] == true) {

          let module: SystemModuleModel = result[1];
          this.ref = this.dialogService.open(ModuleDetailComponent, {
            header: 'Module',
            width: '480px',
            contentStyle: {
              'max-height': '600px',
              overflow: 'auto',
              'border-radius': '0 0 6px 6px',
            },
            baseZIndex: 10000,
            data: { data: module },
          });

          this.ref.onClose.subscribe((data) => {
            if (data == 200) {
              // Pagination #4
              this.getModuleList(this.current_page);
              // Pagination #4
            }
          });
        }
        else {

          this.messageService.add({
            severity: result[1] == 401 ? 'info' : 'error',
            summary: result[1],
            detail: result[1] == 401 ? 'Unauthorized' : 'Server Error',
          });
        }

      }
    });
  }

  deleteModule(id: number) {

    this.position = 'top';
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectVisible: false,
      accept: () => {
        this.systemModuleService.deleteSystemModule(id).subscribe({
          next: (response: any) => {
            let result = response;
            if (result[0] == true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: '200',
                detail: 'Deleted Successfully',
              });
              // Pagination #5
              let dataLength = this.moduleList.length - 1;
              let current_page = dataLength == 0 ? this.pagination.prev : this.current_page;
              this.current_page = current_page;

              this.getModuleList(this.current_page);
              // Pagination #5
            } else {
              this.confirmationService.close();
              this.messageService.add({
                severity: result[1] == 401 ? 'info' : 'error',
                summary: result[1],
                detail: result[1] == 401 ? 'Unauthorized' : 'Server Error',
              });
            }
          },
        });
      },
    });
  }

  searchModules() {
    // Pagination #6
    this.getModuleList(this.default_page);
    // Pagination #6
  }

  timeout: any = null;
  onSearchModules(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.searchModules();
      }
    }, 500);
  }

  ngOnInit(): void {
  }
}
