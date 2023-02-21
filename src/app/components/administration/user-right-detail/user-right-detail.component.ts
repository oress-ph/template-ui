import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SystemModuleModel } from 'src/app/models/administration/system-module.model';
import { UserRightModel } from 'src/app/models/administration/user-right.model';
import { SystemModuleService } from 'src/app/services/administration/system-module/system-module.service';
import { UserRightService } from 'src/app/services/administration/user-right/user-right.service';

@Component({
  selector: 'app-user-right-detail',
  templateUrl: './user-right-detail.component.html',
  styleUrls: ['./user-right-detail.component.scss']
})

export class UserRightDetailComponent implements OnInit {

  constructor(
    private userRightService: UserRightService,
    private systemModuleService: SystemModuleService,
    public dialogService: DialogService,
    private ref: DynamicDialogRef,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
  ) { }

  lastTableLazyLoadEvent!: LazyLoadEvent;
  moduleDropdownList: SystemModuleModel[] = [];

  isComponentShown: boolean = false;

  userRightModel: UserRightModel = new UserRightModel();

  btnlabel: string = 'Save';

  save() {
    if (this.userRightModel.id == 0) {
      this.userRightService.adduserRights(this.userRightModel).subscribe({
        next: (response: any) => {
          let result = response;
          if (result[0] === true) {
            this.messageService.add({
              severity: 'success',
              summary: '200',
              detail: 'Added Successfully',
            });
            this.ref.close(200);
          } else {

            let message = 'Server Error';
            if(result[1] == 401) message = 'Unauthorized';
            if(result[1] == 409) message = 'Duplicate Rights';
            this.messageService.add({
              severity: result[1] == 401 || result[1] == 409? 'info' : 'error',
              summary: result[1],
              detail: message,
            });
          }
        }
      })
    } else {
      this.userRightService.updateUserRights(this.userRightModel.id, this.userRightModel).subscribe({
        next: (response: any) => {

          let result = response;
          if (result[0] === true) {

            this.messageService.add({
              severity: 'success',
              summary: '200',
              detail: 'Updated Successfully',
            });
            this.ref.close(200);
          } else {

            this.ref.close('failed')
            this.messageService.add({
              severity: result[1] == 401 ? 'info' : 'error',
              summary: result[1],
              detail: result[1] == 401 ? 'Unauthorized' : 'Server Error',
            });
          }
        }
      })
    }
  }


  getAllModule() {

    this.systemModuleService.getAllSystemModulesDropdown().subscribe(
      (response: any) => {
        let results = response
        if (results[0] == true) {
          this.moduleDropdownList = response[1];
          this.loadComponent();
        }
      }
    )
  }

  loadComponent() {
    this.userRightModel = this.config.data;
    this.userRightModel.can_add = this.userRightModel.can_add == true ? true : false;
    this.userRightModel.can_edit = this.userRightModel.can_edit == true ? true : false;
    this.userRightModel.can_save = this.userRightModel.can_edit == true ? true : false;
    this.userRightModel.can_delete = this.userRightModel.can_delete == true ? true : false;
    this.userRightModel.can_print = this.userRightModel.can_print == true ? true : false;
    this.userRightModel.can_lock = this.userRightModel.can_lock == true ? true : false;
    this.userRightModel.can_unlock = this.userRightModel.can_unlock == true ? true : false;
    if (this.userRightModel.id != 0) this.btnlabel = 'Update';
    setTimeout(() => {
      this.isComponentShown = true;
    }, 500);
  }

  ngOnInit(): void {
    this.getAllModule();
  }
}
