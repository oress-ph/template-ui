import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationRouterActivate } from './administration-router.activate';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
import {ProgressBarModule} from 'primeng/progressbar';
import { SpeedDialModule } from 'primeng/speeddial';
import { CheckboxModule } from 'primeng/checkbox';
import {ToggleButtonModule} from 'primeng/togglebutton';

import { UsersComponent } from 'src/app/components/administration/users/users.component';
import { ModuleDetailComponent } from 'src/app/components/administration/module-detail/module-detail.component';
import { UserDetailComponent } from 'src/app/components/administration/user-detail/user-detail.component';
import { UserRightDetailComponent } from 'src/app/components/administration/user-right-detail/user-right-detail.component';

import { AdministrationComponent } from './administration.component';

import { LayoutModule } from '../layout/layout.module';
import { ModulesComponent } from 'src/app/components/administration/modules/modules.component';
import { UserRightsComponent } from 'src/app/components/administration/user-rights/user-rights.component';
import { SelectionsComponent } from 'src/app/components/administration/selections/selections.component';
import { SelectionDetailComponent } from 'src/app/components/administration/selection-detail/selection-detail.component';
import { CopyUserRightsComponent } from 'src/app/components/administration/copy-user-rights/copy-user-rights.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    AdministrationComponent,
    UsersComponent,
    ModulesComponent,
    ModuleDetailComponent,
    UserDetailComponent,
    UserRightsComponent,
    UserRightDetailComponent,
    SelectionsComponent, 
    SelectionDetailComponent,
    CopyUserRightsComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FlexLayoutModule,
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
    ToggleButtonModule,
    LayoutModule,
    ProgressBarModule,
    BreadcrumbModule
  ],
  providers: [
    AdministrationRouterActivate,
    DialogService,
    MessageService,
    ConfirmationService,
    DatePipe,
    DynamicDialogRef,
    DynamicDialogConfig
  ]
})
export class AdministrationModule { }
