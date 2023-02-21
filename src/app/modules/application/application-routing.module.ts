import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationComponent } from './application.component';
// import { DashboardComponent } from '../../components/administration/dashboard/dashboard.component';
// import { UsersComponent } from 'src/app/components/administration/users/users.component';
// import { ApplicationRouterActivate } from './application-router.activate';
// import { CompanyListComponent } from 'src/app/components/administration/company-list/company-list.component';
// import { CompanyDetailComponent } from 'src/app/components/administration/company-detail/company-detail.component';
// import { BranchListComponent } from 'src/app/components/administration/branch-list/branch-list.component';
// import { BranchDetailsComponent } from 'src/app/components/administration/branch-details/branch-details.component';
// import { SelectionsListComponent } from 'src/app/components/administration/selections-list/selections-list.component';
// import { MaterialsListComponent } from 'src/app/components/administration/materials-list/materials-list.component';
// import { StorageListComponent } from 'src/app/components/administration/storage-list/storage-list.component';
// import { ModulesListComponent } from 'src/app/components/administration/modules-list/modules-list.component';
// import { UserDetailComponent } from 'src/app/components/administration/user-detail/user-detail.component';
// import { MaterialComponent } from 'src/app/components/administration/material/material.component';

const routes: Routes = [
  // {
  //   path: '',
  //   canActivate: [ApplicationRouterActivate],
  //   component: ApplicationComponent,
  //   children: [
  //     { path: '', canActivate: [ApplicationRouterActivate], component: DashboardComponent },
  //     { path: 'dashboard', canActivate: [ApplicationRouterActivate], component: DashboardComponent },
  //     { path: 'user-list', canActivate: [ApplicationRouterActivate], component: UsersComponent },
  //     { path: 'company', canActivate: [ApplicationRouterActivate], component: CompanyListComponent },
  //     { path: 'company-details/:id', canActivate: [ApplicationRouterActivate], component: CompanyDetailComponent },
  //     { path: 'branch-list', canActivate: [ApplicationRouterActivate], component: BranchListComponent },
  //     { path: 'branch-detail/:id', canActivate: [ApplicationRouterActivate], component: BranchDetailsComponent},
  //     {
  //       path: '',
  //       canActivate: [ApplicationRouterActivate],
  //       component: DashboardComponent,
  //     },
  //     {
  //       path: 'dashboard',
  //       canActivate: [ApplicationRouterActivate],
  //       component: DashboardComponent,
  //     },
  //     {
  //       path: 'modules',
  //       canActivate: [ApplicationRouterActivate],
  //       component: ModulesListComponent,
  //     },
  //     {
  //       path: 'users',
  //       canActivate: [ApplicationRouterActivate],
  //       component: UsersComponent,
  //     },
  //     {
  //       path: 'users-detail/:id',
  //       canActivate: [ApplicationRouterActivate],
  //       component: UserDetailComponent,
  //     },
  //     {
  //       path: 'company',
  //       canActivate: [ApplicationRouterActivate],
  //       component: CompanyListComponent,
  //     },
  //     {
  //       path: 'selections',
  //       canActivate: [ApplicationRouterActivate],
  //       component: SelectionsListComponent,
  //     },
  //     {
  //       path: 'materials',
  //       canActivate: [ApplicationRouterActivate],
  //       component: MaterialComponent,
  //     },
  //     {
  //       path: 'storage',
  //       canActivate: [ApplicationRouterActivate],
  //       component: StorageListComponent,
  //     },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule { }
