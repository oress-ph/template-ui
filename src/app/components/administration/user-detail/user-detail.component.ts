import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MessageService,
  ConfirmationService,
  LazyLoadEvent,
} from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { RegisterModel } from 'src/app/models/security/register.model';
import { UserListService } from 'src/app/services/administration/users/user-list.service';
import { RegisterService } from 'src/app/services/security/register/register.service';
import { SelectionService } from './../../../services/administration/selection/selection.service';
import { SelectionModel } from 'src/app/models/administration/selection.model';
import { UserRigthUiService } from 'src/app/services/security/user-right-ui/user-rigth-ui.service';
import { UserRightModel } from 'src/app/models/administration/user-right.model';
import { WarehouseService } from 'src/app/services/administration/warehouse/warehouse.service';
import { WarehouseModel } from 'src/app/models/administration/warehouse.model';
import { ChangePasswordComponent } from '../../shared/change-password/change-password/change-password.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user_right: UserRightModel = new UserRightModel();
  warehouse: any = localStorage.getItem('warehouse');
  constructor(
    private userListService: UserListService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private selectionService: SelectionService,
    private userRigthUiService: UserRigthUiService,
    private warehouseService: WarehouseService
    ) {
      let _userRight = this.userRigthUiService.pageRight("Administration - User Detail");
      if (_userRight != null) this.user_right = _userRight;
      else this.router.navigate(['/admin/page-forbidden']);
    }
  
  isProcessing: boolean = false;
  lastTableLazyLoadEvent!: LazyLoadEvent;
  isContentShown: boolean = false;
  position!: string;
  userModel: RegisterModel = new RegisterModel();
  btnlabel: string = ' User';
  headerTitle: string = 'REGISTER USER';
  reset_password: boolean = false;

  userTypeSelections: SelectionModel[] = [];
  warehouseSelections: WarehouseModel[] = [];

  user_type_list: Array<{ value: string, name: string }> = [];
  warehouse_list: Array<{ value: number, name: string }> = [];

  userTypeSelection(){
    this.selectionService.getSelectionsByCategory('User Type').subscribe(
      response => {
        let results = response[1];
        if(response[0] == true){
          // this.userTypeSelections = results[1];
          for (let i = 0; i < results.length; i++) {
            this.user_type_list.push({
              name: results[i].value,
              value: results[i].value
            })
          }
          this.userModel.user_type = this.user_type_list[0].value;
          
        } else {
          this.messageService.add({
            severity: results[1] == 401 ? 'info' : 'error',
            summary: results[1],
            detail: results[1] == 401 ? 'Unauthorized' : 'Server Error',
          });
        }
        this.warehouseSelection();
      })
  }

  warehouseSelection(){
    // let warehouse = this.warehouse != null ? JSON.parse(this.warehouse) : new WarehouseModel;
    this.warehouseService.getAllwarehouses().subscribe(
      (response: any) => {
        let results = response[1];
        if(response[0] == true){
          // this.warehouseSelections = results[1];
          for (let i = 0; i < results.length; i++) {
            this.warehouse_list.push({
              name: results[i].warehouse,
              value: results[i].id
            })
          }
          this.userModel.warehouse_id = this.warehouse_list[0].value;
          this.loadComponent();

        } else {
          this.messageService.add({
            severity: results[1] == 401 ? 'info' : 'error',
            summary: results[1],
            detail: results[1] == 401 ? 'Unauthorized' : 'Server Error',
          });
        }
      })
  }

  loadComponent() {
    this.userModel.id = this.route.snapshot.params.id;
    if (this.userModel.id == 0) {
      this.btnlabel = 'Save';
      setTimeout(() => {
        this.isContentShown = true;
      }, 1000);
    } else {
      this.userListService.getUserById(this.userModel.id).subscribe((response) => {
        let result = response;
        if (result[0] == true) {
          this.userModel = result[1];
          this.userModel.password_confirmation = this.userModel.password;
          setTimeout(() => {
            this.isContentShown = true;
          }, 1000); 
        } else  {
          this.messageService.add({
            severity: result[1] == 401 ? 'info' : 'error',
            summary: result[1],
            detail: result[1] == 401 ? 'Unauthorized' : 'Server Error',
          });
        }
      });
    }
  }

  registerPassword() {
    this.reset_password = true;
  }

  saveUser() {
    if (this.userModel.id == 0) {
      if(this.userModel.password === this.userModel.password_confirmation) {
        this.registerService
        .register(this.userModel)
        .subscribe((response: any) => {
          let result = response;
          if (result[0] == true) {
            this.userModel.id = result[1]['data']['id'];
            this.location.go('/admin/users/' + this.userModel.id);
            this.messageService.add({
              severity: 'success',
              summary: '200',
              detail: 'Added Successfully',
            });
          } else {
            this.messageService.add({
              severity: result[1] == 401 ? 'info' : 'error',
              summary: result[1],
              detail: result[1] == 401 ? 'Unauthorized' : 'Server Error',
            });
          }
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: '',
          detail: 'Password mismatch',
        });
      }
    } else {
      if(this.userModel.password === this.userModel.password_confirmation) {
        this.userListService
        .updateUsers(this.userModel.id, this.userModel)
        .subscribe({
          next: (response: any) => {
            let result = response[1];
            if (response[0] === true) {
              this.messageService.add({
                severity: 'success',
                summary: '200',
                detail: 'Updated Successfully',
              });   
            } else {
              this.ref.close('failed');   
              this.messageService.add({
                severity: result[1] == 401 ? 'info' : 'error',
                summary: result[1],
                detail: result[1] == 401 ? 'Unauthorized' : 'Server Error',
              });
            }
          },
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: '',
          detail: 'Password Mismatch',
        });
      }
    }
  }

  changePassword() {
    this.ref = this.dialogService.open(ChangePasswordComponent, {
      header: 'Change Password',
      width: '480px',
      contentStyle: {
        'max-height': '650px',
        overflow: 'auto',
        'border-radius': '0 0 6px 6px',
      },
      baseZIndex: 10000,
      data: { data: this.userModel.id },
    });

    this.ref.onClose.subscribe((data) => {
      if (data == 200) {
      }
    });
  }

  ngOnInit(): void {
    this.userTypeSelection();
  }
}

