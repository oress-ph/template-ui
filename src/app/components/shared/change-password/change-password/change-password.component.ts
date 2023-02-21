import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserListService } from 'src/app/services/administration/users/user-list.service';
interface Data {
  new_password: any,
  confirm_password: any,
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  data: Data = {new_password: "", confirm_password: ""}
  constructor(
    private userListService: UserListService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
  ) { }

  changePassword() { 
    let id = this.config.data.data;
    if(this.data.confirm_password == this.data.new_password){
    this.userListService.changePassword(id, this.data)
      .subscribe((response: any) => {
        let result = response;
        if (result[0] == true) {
          this.messageService.add({
            severity: 'success',
            summary: '200',
            detail: 'Successfully changed the password!',
          });
        } else {
          this.messageService.add({
            severity: result[1] == 401 ? 'info' : 'error',
            summary: result[1],
            detail: result[1] == 401 ? 'Unauthorized' : 'Server Error',
          });
        }
      });
    }
    else if(this.data.confirm_password == '' || this.data.confirm_password == null){
      this.messageService.add({
        severity: 'error',
        summary: '',
        detail: 'Confirm password is required!',
      });
    }
    else{
      this.messageService.add({
        severity: 'error',
        summary: '',
        detail: 'Confirm password does not match!',
      });
    }
  }

  ngOnInit(): void {
  }

}
