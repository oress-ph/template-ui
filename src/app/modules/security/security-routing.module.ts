import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SecurityComponent } from './security.component';
import { LoginComponent } from './../../components/security/login/login.component';
import { RegisterComponent } from './../../components/security/register/register.component';
import { SecurityRouterActivate } from './security-router.activate';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login',canActivate: [SecurityRouterActivate],  component: LoginComponent },
      { path: 'register',canActivate: [SecurityRouterActivate], component: RegisterComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
