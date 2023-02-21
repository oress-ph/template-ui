import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { RegisterModel } from 'src/app/models/security/register.model';
import { UserModel } from 'src/app/models/administration/user.model';
import { UserListService } from 'src/app/services/administration/users/user-list.service';
import { PaginationModel } from 'src/app/models/shared/pagination.model';
import { UserRightModel } from 'src/app/models/administration/user-right.model';
import { UserRigthUiService } from 'src/app/services/security/user-right-ui/user-rigth-ui.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  user_right: UserRightModel = new UserRightModel();
  
  home!: MenuItem;
  items: MenuItem[] = []

  constructor(
    private userListService: UserListService,
    private router: Router,
    public dialogService: DialogService,
    private userRigthUiService: UserRigthUiService,
    private messageService: MessageService
  ) {
    let _userRight = this.userRigthUiService.pageRight("Administration - Users");
    if (_userRight != null) this.user_right = _userRight;
    else this.router.navigate(['/admin/page-forbidden']);
  }

  lastTableLazyLoadEvent!: LazyLoadEvent;
  userList: UserModel[] = [];
  isLoading: boolean = false;
  keywords: string = '';
  position!: string;
  totalRecords: number = 0;
  dataSouce: UserModel[] = [];

  pagination: PaginationModel = new PaginationModel();
  page_detail: string = ""
  default_page: string = "page=1";
  current_page: string = "page=1";

  public firstPage() { this.getUserList(this.pagination.first); }
  public prevPage() { this.getUserList(this.pagination.prev); }
  public nextPage() { this.getUserList(this.pagination.next); }
  public lastPage() { this.getUserList(this.pagination.last); }

  getUsersLazyEvent(event: LazyLoadEvent | any): void {
    this.getUserList(this.pagination.first);
  }

  // Display all Users List
  getUserList(page: string){
    this.pagination = new PaginationModel()
    this.isLoading = true;
    this.userList = [];
    this.totalRecords = 0;
    this.page_detail = '0 / 0';

    this.userListService.getAllUsers(page, this.keywords).subscribe(
      (response: any) => {
        
        let results = response;
        if (results[0] == true) {

          this.pagination = response[1];
          this.page_detail = this.pagination.meta.current_page + ' / ' + this.pagination.meta.last_page;
          this.current_page = this.pagination.current_page;
          this.totalRecords = this.pagination.meta.total;

          this.userList = this.pagination.data

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

  addUser() {
    this.router.navigate(['/admin/users/' + 0]);
  }

  updateUser(id: number | string) {
    this.router.navigate(['/admin/users/' + id]);
  }

  deleteUser(id: number | string) {
    alert(id);
  }

  searchUsers() {
  this.getUserList(this.default_page)
  }

  timeout: any = null;
  onSearchUsers(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.searchUsers();
      }
    }, 500);
  }

  ngOnInit(): void {
  }
}
