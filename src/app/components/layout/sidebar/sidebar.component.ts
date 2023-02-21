import { Component, ElementRef, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Router } from '@angular/router';
import { UserRightModel } from 'src/app/models/administration/user-right.model';
import { UserRigthUiService } from './../../../services/security/user-right-ui/user-rigth-ui.service';
import { AppSettings } from 'src/app/app-settings';
import { MenuItem } from 'primeng/api';
import { WarehouseService } from 'src/app/services/administration/warehouse/warehouse.service';
import { UserListService } from 'src/app/services/administration/users/user-list.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('submenu', [
      state(
        'hidden',
        style({
          height: '0',
          overflow: 'hidden',
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() active!: boolean;
  position: string = '';

  activeSubmenus: { [key: string]: boolean } = {};

  sideItems: MenuItem[] = [];

  adminSidNavItems: any[] = [
    { name: 'Sales/ Marketing', link: '/application/sales', authorized: false },
    { name: 'Yard Management', link: '/application/yards', authorized: false },
    {
      name: 'Receiving Management',
      link: '/application/receiving',
      authorized: false,
  
    },
    {
      name: 'Storage Management',
      link: '/application/storage',
      authorized: false,
    },
    {
      name: 'Dispatching Management',
      link: '/application/dispatching',
      authorized: false,
    },
  ];

  adminSubItems: any[] = [];

  salesAndMarketingSubItems: any[] = [];

  yardsManagementSubItems: any[] = [];

  receivingSubItems: any[] = [];
  storageSubItems: any[] = [];

  userSideNavItems: any[] = [
    // {name: 'Profile', link: '/applicant/applicant-information'},
  ];

  userSideNavSubItems: any[] = [{ name: '', link: '' }];

  sideNavItems: any[] = this.userSideNavItems;
  sideNavSubItems: any[] = this.userSideNavSubItems;
  warehouse_id: any = localStorage.getItem('warehouse_id');
  warehouse: string = 'Warehouse';

  scrollable = true;

  user_type: any = localStorage.getItem('user_type');

  user_rigths: UserRightModel[] = [];

  isComponentShown: boolean = false;

  constructor(
    private el: ElementRef,
    private router: Router,
    private UserRigthUiService: UserRigthUiService,
    private appSettings: AppSettings,
    private warehouseService: WarehouseService,
    private userService: UserListService,
    private confirmationService: ConfirmationService
  ) {
    // if (this.user_type == 'User') this.sideNavItems = this.adminSidNavItems;
    // this.sideNavSubItems = this.adminSubMenu;
  }
  company_logo: string = this.appSettings.company_logo;

  toggleSubmenu(event: Event, name: string) {
    this.activeSubmenus[name] = this.activeSubmenus[name] ? false : true;
    event.preventDefault();
  }

  isSubmenuActive(name: string) {
    if (this.activeSubmenus.hasOwnProperty(name)) {
      return this.activeSubmenus[name];
    } else if (this.router.isActive(name, false)) {
      this.activeSubmenus[name] = true;
      return true;
    }

    return false;
  }

  checkActiveState(givenLink: any) {
    if (this.router.url.indexOf(givenLink) === -1) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

  checkToken() { 
    this.userService.checkTokenExpiration().subscribe((response) => {
      const isAutheticated = response;
      if(isAutheticated) {
        return;
      } else {
        this.position = 'top';
          this.confirmationService.confirm({
            message: 'Your token has already expired',
            header: 'Token Expiration',
            icon: 'pi pi-ban',
            acceptLabel: 'Login',
            rejectVisible: false,
            accept: () => {
              localStorage.clear();
              setTimeout(() => {
              this.router.navigate(['/security']);
              }, 500);
            },
            reject: () => {
              localStorage.clear();
              setTimeout(() => {
              this.router.navigate(['/security']);
              }, 500);
            }
          })
      }
    })
  }

  ngOnInit() {
    
    this.sideItems = [
      {
        label: 'Dashboard',
        icon:'template-icon-dashboard',
        expanded: this.checkActiveState('/dashboard'),
      },
      {
      label: 'Administration',
      icon:'template-icon-admin',
      expanded: this.checkActiveState('/admin/'),
      items: [
          {
              label: 'Modules',
              icon:'fa-solid fa-diagram-project',
              routerLink: '/admin/modules',
              command: (event) => {this.checkToken()} 
          },
          {
              label: 'Users',
              icon:'fa-solid fa-users',
              routerLink: '/admin/users',
              command: (event) => {this.checkToken()} 
          },
          {
            label: 'Selections',
            icon:'fa-regular fa-object-ungroup',
            routerLink: '/admin/selections',
            command: (event) => {this.checkToken()} 
          }
        ]
      },
      {
        label: 'End Session',
        icon:'fa-solid fa-power-off',
        routerLink: '/admin/modules',
        command: (event) => {this.logout()}
        }
    ]
  }
}
