import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationRouterActivate } from './application-router.activate';

// PRIMENG MODULES
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpeedDialModule } from 'primeng/speeddial';
import { CheckboxModule } from 'primeng/checkbox';

// COMPONENTS
// import { DashboardComponent } from 'src/app/components/administration/dashboard/dashboard.component';
// import { ApplicationComponent } from './application.component';
// import { AppFooterComponent } from './application.footer.component';
// import { AppMenuComponent } from '../layout/layout.sidebar.component';
// import { UsersComponent } from 'src/app/components/administration/users/users.component';
// import { CompanyListComponent } from 'src/app/components/administration/company-list/company-list.component';
// import { BranchDetailsComponent } from 'src/app/components/administration/branch-details/branch-details.component';
// import { BranchListComponent } from 'src/app/components/administration/branch-list/branch-list.component';

// import { CompanyDetailComponent } from 'src/app/components/administration/company-detail/company-detail.component';
// import { SelectionsListComponent } from 'src/app/components/administration/selections-list/selections-list.component';
// import { SelectionsDetailComponent } from 'src/app/components/administration/selections-detail/selections-detail.component';
// import { MaterialsListComponent } from 'src/app/components/administration/materials-list/materials-list.component';
// import { MaterialTypeDetailsComponent } from 'src/app/components/administration/material-type-details/material-type-details.component';
// import { MaterialCategoryDetailsComponent } from 'src/app/components/administration/material-category-details/material-category-details.component'
// import { StorageListComponent } from 'src/app/components/administration/storage-list/storage-list.component';
// import { ModuleDetailComponent } from 'src/app/components/administration/module-detail/module-detail.component';
// import { ModulesListComponent } from 'src/app/components/administration/modules-list/modules-list.component';
// import { UserDetailComponent } from 'src/app/components/administration/user-detail/user-detail.component';
// import { UserRightsListComponent } from 'src/app/components/administration/user-rights-list/user-rights-list.component';
// import { YardListComponent } from 'src/app/components/administration/yard-list/yard-list.component';
// import { YardDetailsComponent } from 'src/app/components/administration/yard-details/yard-details.component';
// import { WarehouseListComponent } from 'src/app/components/administration/warehouse-list/warehouse-list.component';
// import { WarehouseDetailsComponent } from 'src/app/components/administration/warehouse-details/warehouse-details.component';
// import { StorageDetailsComponent } from 'src/app/components/administration/storage-details/storage-details.component';
// import { UserRightDetailComponent } from 'src/app/components/administration/user-right-detail/user-right-detail.component';
// import { MaterialComponent } from 'src/app/components/administration/material/material.component';
// import { MaterialCategoryListComponent } from 'src/app/components/administration/material-category-list/material-category-list.component';
// import { MaterialTypeListComponent } from 'src/app/components/administration/material-type-list/material-type-list.component';

@NgModule({
  declarations: [
    // ApplicationComponent,
    // DashboardComponent,
    // AppMenuComponent,
    // AppFooterComponent,
    // UsersComponent,
    // CompanyDetailComponent,
    // CompanyListComponent,
    // BranchDetailsComponent,
    // BranchListComponent,
    // CompanyListComponent,
    // SelectionsListComponent,
    // CompanyDetailComponent,
    // MaterialsListComponent,
    // StorageListComponent,
    // ModulesListComponent,
    // ModuleDetailComponent,
    // UserDetailComponent,
    // UserRightsListComponent,
    // YardListComponent,
    // YardDetailsComponent,
    // WarehouseListComponent,
    // WarehouseDetailsComponent,
    // MaterialTypeDetailsComponent,
    // MaterialCategoryDetailsComponent,
    // SelectionsDetailComponent,
    // StorageDetailsComponent,
    // UserRightDetailComponent,
    // MaterialComponent,
    // MaterialCategoryListComponent, 
    // MaterialTypeListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ApplicationRoutingModule,
    MenubarModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    TabViewModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    TableModule,
    DropdownModule,
    InputNumberModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextareaModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    SpeedDialModule,

  ],
  // exports: [AppMenuComponent, AppFooterComponent, UserRightsListComponent, YardListComponent, WarehouseListComponent],
  providers: [
    ApplicationRouterActivate,
    DialogService,
    FormBuilder,
    MessageService,
    ConfirmationService,
    DatePipe,
    DynamicDialogRef,
    DynamicDialogConfig
  ],
  bootstrap: [ApplicationModule],
})
export class ApplicationModule { }
