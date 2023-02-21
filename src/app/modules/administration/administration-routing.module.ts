import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from 'src/app/components/administration/users/users.component';
import { AdministrationRouterActivate } from './administration-router.activate';
import { AdministrationComponent } from './administration.component';
import { UserDetailComponent } from 'src/app/components/administration/user-detail/user-detail.component';
import { ModulesComponent } from 'src/app/components/administration/modules/modules.component';
import { SelectionsComponent } from 'src/app/components/administration/selections/selections.component';
import { PageForbiddenComponent } from 'src/app/components/shared/page-forbidden/page-forbidden/page-forbidden.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdministrationRouterActivate],
    component: AdministrationComponent,
    children: [
      { path: 'page-forbidden', component: PageForbiddenComponent },
      { path: 'users', canActivate: [AdministrationRouterActivate], component: UsersComponent },
      {
        path: 'modules',
        canActivate: [AdministrationRouterActivate],
        component: ModulesComponent,
      },
      {
        path: 'users',
        canActivate: [AdministrationRouterActivate],
        component: UsersComponent,
      },
      {
        path: 'users/:id',
        canActivate: [AdministrationRouterActivate],
        component: UserDetailComponent,
      },
      {
        path: 'selections',
        canActivate: [AdministrationRouterActivate],
        component: SelectionsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
