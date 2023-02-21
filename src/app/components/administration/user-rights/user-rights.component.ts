import { Component, OnInit, Input } from '@angular/core';
import {
  MessageService,
  ConfirmationService,
  LazyLoadEvent,
} from 'primeng/api';
import {
  DialogService,
  DynamicDialogRef,
  DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { RegisterModel } from 'src/app/models/security/register.model';
import { UserRightModel } from 'src/app/models/administration/user-right.model';
import { UserRightDetailComponent } from '../user-right-detail/user-right-detail.component';
import { UserRightService } from 'src/app/services/administration/user-right/user-right.service';
import { PaginationModel } from 'src/app/models/shared/pagination.model';
import { Router } from '@angular/router';
import { UserRigthUiService } from 'src/app/services/security/user-right-ui/user-rigth-ui.service';
import { CopyUserRightsComponent } from '../copy-user-rights/copy-user-rights.component';

@Component({
  selector: 'app-user-rights',
  templateUrl: './user-rights.component.html',
  styleUrls: ['./user-rights.component.scss'],
})
export class UserRightsComponent implements OnInit {
  @Input() userId: number = 0;

  user_right: UserRightModel = new UserRightModel();
  constructor(
    private userRightService: UserRightService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private userRigthUiService: UserRigthUiService
  ) { 
    let _userRight = this.userRigthUiService.pageRight("Administration - User Detail");
    if (_userRight != null) this.user_right = _userRight;
    else this.router.navigate(['/admin/page-forbidden']);
  }
  moduleList: Array<{ value: number; name: string }> | any = [];
  isProcessing: boolean = false;
  lastTableLazyLoadEvent!: LazyLoadEvent;
  userRightsList: UserRightModel[] = [];
  loading: boolean = true;
  position!: string;
  userModel: RegisterModel = new RegisterModel();
  totalRecords: number = 0;

  btnlabel: string = 'Save';

  pagination: PaginationModel = new PaginationModel();
  page_detail: string = "";
  default_page: string = "page=1";
  current_page: string = "page=1";

  public firstPage() { this.getUserRightsList(this.pagination.first); }
  public prevPage() { this.getUserRightsList(this.pagination.prev); }
  public nextPage() { this.getUserRightsList(this.pagination.next); }
  public lastPage() { this.getUserRightsList(this.pagination.last); }

  getUserRightsLazyEvent(event: LazyLoadEvent | any): void {
    this.getUserRightsList(this.pagination.first);
  }

  // Display all yards filtered by branch id 
  getUserRightsList(page: string){
    this.loading = true;
    this.userRightsList = [];
    this.totalRecords = 0;
    this.userRightService
      .getUserRightsByUserId(this.userId, page).subscribe(
      (response: any) => {
        let results = response;
        if (results[0] == true) {
         
          this.pagination = response[1];
          this.page_detail = this.pagination.meta.current_page + ' / ' + this.pagination.meta.last_page;
          this.current_page = this.pagination.current_page;
          this.totalRecords = this.pagination.meta.total;

          this.userRightsList = this.pagination.data;
          
          setTimeout(() => {
            this.loading = false;
          }, 500)
        } else {
          this.loading = false;
          this.messageService.add({
            severity: results[1] == 401 ? 'info' : 'error',
            summary: results[1],
            detail: results[1] == 401 ? 'Unauthorized' : 'Server Error',
          });
        }
      });
  }

  addRights() {
    let userRight: UserRightModel = {
      id: 0,
      user_id: this.userId,
      system_module_id: 0,
      system_module: null,
      can_add: false,
      can_edit: false,
      can_save: false,
      can_delete: false,
      can_print: false,
      can_lock: false,
      can_unlock: false,
    };
    this.ref = this.dialogService.open(UserRightDetailComponent, {
      header: 'User Right',
      width: '480px',
      contentStyle: {
        'max-height': '650px',
        overflow: 'auto',
        'border-radius': '0 0 6px 6px',
      },
      baseZIndex: 10000,
      data: userRight,
    });

    this.ref.onClose.subscribe((data) => {
      if (data == 200) {
        this.pagination.first = this.default_page;
        this.getUserRightsList(this.pagination.first);
      }
    });
  }

  CopyUserRights() {
    let userRight: UserRightModel = {
      id: 0,
      user_id: this.userId,
      system_module_id: 0,
      system_module: null,
      can_add: false,
      can_edit: false,
      can_save: false,
      can_delete: false,
      can_print: false,
      can_lock: false,
      can_unlock: false,
    };
    this.ref = this.dialogService.open(CopyUserRightsComponent, {
      header: 'User Right',
      width: '480px',
      contentStyle: {
        'max-height': '650px',
        overflow: 'auto',
        'border-radius': '0 0 6px 6px',
      },
      baseZIndex: 10000,
      data: userRight,
    });

    this.ref.onClose.subscribe((data) => {
      if (data == 200) {
        this.getUserRightsList(this.default_page);
      }
    });
  }

  editRight(id: number) {

    this.userRightService.getUserRightsById(id).subscribe({
      next: (response) => {

        let result = response;
        if (result[0] == true) {

          let userRight: UserRightModel  = result[1];
          this.ref = this.dialogService.open(UserRightDetailComponent, {
            header: 'User Right',
            width: '480px',
            contentStyle: {
              'max-height': '650px',
              overflow: 'auto',
              'border-radius': '0 0 6px 6px',
            },
            baseZIndex: 10000,
            data: userRight,
          });

          this.ref.onClose.subscribe((data) => {
            if (data == 200) {
              this.getUserRightsList(this.current_page);  
            }
          });
        } else {

          this.messageService.add({
            severity: 'error',
            summary: 'Error fetching data from database',
            detail: result[1]
          })
          
        }
      }
    })
  }

  deleteUserRight(id: number) {
    this.position = 'top';
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectVisible: false,
      accept: () => {
        this.userRightService.deleteUserRight(id).subscribe((response) => {
          let result = response;
          if (result[0] == true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: '200',
              detail: 'Deleted Successfully',
            });
            let dataLength = this.moduleList.length - 1;
            let current_page = dataLength == 0 ? this.pagination.prev : this.current_page;
            this.current_page = current_page;

            this.getUserRightsList(this.current_page);
          } else {
            this.confirmationService.close();
            this.messageService.add({
              severity: result[1] == 401 ? 'info' : 'error',
              summary: result[1],
              detail: result[1] == 401 ? 'Unauthorized' : 'Server Error',
            });
          }
        });
      },
    });
  }

  ngOnInit(): void { }
}
