import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SystemModuleModel } from 'src/app/models/administration/system-module.model';
import { UserRightModel } from 'src/app/models/administration/user-right.model';
import { SystemModuleService } from 'src/app/services/administration/system-module/system-module.service';
import { UserRightService } from 'src/app/services/administration/user-right/user-right.service';
import { UserListService } from 'src/app/services/administration/users/user-list.service';
import { UserModel } from 'src/app/models/administration/user.model';

@Component({
  selector: 'app-copy-user-rights',
  templateUrl: './copy-user-rights.component.html',
  styleUrls: ['./copy-user-rights.component.scss']
})
export class CopyUserRightsComponent implements OnInit {

  userRightModel: UserRightModel = new UserRightModel();
  isComponentShown: boolean = false;
  user_id: number = 0;
  userLists: UserModel[] = [];
  users: Array<{ value: string, name: string }> | any = [];

  constructor(
    private userRightService: UserRightService,
    private systemModuleService: SystemModuleService,
    public dialogService: DialogService,
    private ref: DynamicDialogRef,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    private userService: UserListService
  ) { }

  getAllUsers() {

    this.userService.getAllUserIsActive().subscribe(
      (response: any) => {
        let results = response;
        if (response[0] == true) {
          let data = results[1];
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              this.users.push({
                name: data[i].name + ' - ' + data[i].user_type,
                value: data[i].id
              });
            }
            this.user_id = this.users[0].value;
          }
        }
      })
  }

  copy() {
    let from_user_data = {
      from_user_id: this.user_id
    }
    this.userRightService.copyUserRights(this.userRightModel.user_id, from_user_data).subscribe((response: any) => {
      let result = response[1];
      if(response[0] == true) {
        this.messageService.add({
          severity: 'success',
          summary: 'User Rights Copied Succesfully',
          detail: result[1]
        })
        this.ref.close(200);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Selected User have no users',
          detail: result[1]
        })
        this.ref.close(200);
      }
    });
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
    // if (this.userRightModel.id != 0) this.btnlabel = 'Update';
    setTimeout(() => {
      this.getAllUsers()
      this.isComponentShown = true;
    }, 500);
  }

  ngOnInit(): void {
    this.loadComponent();
  }

}
