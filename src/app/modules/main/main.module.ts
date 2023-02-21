import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';

import { MainComponent } from './main.component';
import { HomeComponent } from '../../components/main/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    LayoutModule
  ],
  providers:[
  ]
})
export class MainModule { }
