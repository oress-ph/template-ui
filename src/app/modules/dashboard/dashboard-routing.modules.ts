import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRouterActivate } from './dashboard-router.activate';
import { DashboardComponent } from './dashboard.component';


// Components
import { PageForbiddenComponent } from 'src/app/components/shared/page-forbidden/page-forbidden/page-forbidden.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [DashboardRouterActivate],
    component: DashboardComponent,
    children: [
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }