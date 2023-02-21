import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SelectionService } from 'src/app/services/administration/selection/selection.service';
import { SelectionModel } from 'src/app/models/administration/selection.model';
import { SelectionDetailComponent } from '../selection-detail/selection-detail.component';
import { PaginationModel } from 'src/app/models/shared/pagination.model';
import { UserRigthUiService } from './../../../services/security/user-right-ui/user-rigth-ui.service';
import { UserRightModel } from 'src/app/models/administration/user-right.model';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.scss']
})
export class SelectionsComponent implements OnInit {

  home!: MenuItem;
  items: MenuItem[] = [];

  user_right: UserRightModel = new UserRightModel();
  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private dynamicDialogRef: DynamicDialogRef,
    private selectionService: SelectionService,
    private userRigthUiService: UserRigthUiService
  ) {
    let _userRight = this.userRigthUiService.pageRight("Administration - Selections");
    if (_userRight != null) this.user_right = _userRight;
    else this.router.navigate(['/admin/page-forbidden']);
  }

  position!: string;
  selections: SelectionModel[] = [];
  lazyEvent: LazyLoadEvent | any;
  isLoading: boolean = false;
  keywords: string = '';
  totalRecords: number = 0;

  pagination: PaginationModel = new PaginationModel();
  page_detail: string = "";
  default_page: string = "page=1";
  current_page: string = "page=1";

  public firstPage() { this.getSelectionData(this.pagination.first); }
  public prevPage() { this.getSelectionData(this.pagination.prev); }
  public nextPage() { this.getSelectionData(this.pagination.next); }
  public lastPage() { this.getSelectionData(this.pagination.last); }

  getSelectionLazyEvent(event: LazyLoadEvent | any): void {
    this.getSelectionData(this.pagination.first);
  }

  getSelectionData(page: string) {

    this.pagination = new PaginationModel()
    this.isLoading = true;
    this.selections = [];
    this.totalRecords = 0;
    this.page_detail = '0 / 0';

    this.selectionService.getSelections(page, this.keywords).subscribe(
      (response: any) => {

        let results = response;
        if (results[0] == true) {

          this.pagination = response[1];
          this.page_detail = this.pagination.meta.current_page + ' / ' + this.pagination.meta.last_page;
          this.current_page = this.pagination.current_page;
          this.totalRecords = this.pagination.meta.total;

          this.selections = this.pagination.data

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

  searchSelection() {
    this.getSelectionData(this.default_page);
  }

  timeout: any = null;
  onSearchSelections(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.searchSelection();
      }
    }, 500);
  }

  addSelections() {

    let selection: SelectionModel = new SelectionModel();
    this.dynamicDialogRef = this.dialogService.open(SelectionDetailComponent, {
      header: 'Selection',
      width: '480px',
      contentStyle: { "max-height": "600px", "overflow": "auto", "border-radius": "0 0 6px 6px" },
      baseZIndex: 10000,
      data: { data: selection },
    });

    this.dynamicDialogRef.onClose.subscribe((data) => {
      if (data == 200) {
        this.getSelectionData(this.default_page);
      }
    });
  }

  editSelection(id: number) {

    this.selectionService.getSelectionById(id).subscribe({
      next: (response: any) => {

        let result = response;
        if (result[0] == true) {

          let selection: SelectionModel = result[1];
          this.dynamicDialogRef = this.dialogService.open(SelectionDetailComponent, {
            header: 'Selection',
            width: '480px',
            contentStyle: { "max-height": "600px", "overflow": "auto", "border-radius": "0 0 6px 6px" },
            baseZIndex: 10000,
            data: { data: selection },
          });

          this.dynamicDialogRef.onClose.subscribe((data) => {
            if (data == 200) {
              this.getSelectionData(this.current_page);
            }
          });
        } else {

          this.isLoading = false;
          this.messageService.add({
            severity: response[1] == 401 ? 'info' : 'error',
            summary: response[1],
            detail: response[1] == 401 ? 'Unauthorized' : 'Server Error',
          });
        }
      }
    });
  }

  deleteSelection(id: number) {

    this.position = 'top';
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectVisible: false,
      accept: () => {

        this.selectionService.deleteSelection(id).subscribe(
          (response: any) => {

            let result = response;
            if (result[0] == true) {

              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: '200',
                detail: 'Deleted Successfully',
              });

              let dataLength = this.selections.length - 1;
              let current_page = dataLength == 0 ? this.pagination.prev : this.current_page;
              this.current_page = current_page;

              this.getSelectionData(this.current_page);
            } else {

              this.confirmationService.close();
              this.isLoading = false;

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
  ngOnInit(): void {
   }
}
