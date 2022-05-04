import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminHomeComponent } from './Screens/admin-home/admin-home.component';
import { AdminLoginComponent } from './Screens/admin-login/admin-login.component';

import { ProductFormComponent } from './Components/product-form/product-form.component';
import { ProductContainerComponent } from './Components/product-container/product-container.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductUpdateFormComponent } from './Components/product-update-form/product-update-form.component';
import { UserContainerComponent } from './Components/User/user-container/user-container.component';
import { UserFromRegisterComponent } from './Components/User/user-from-register/user-from-register.component';
import { UserListComponent } from './Components/User/user-list/user-list.component';
import { UserUpdateFormComponent } from './Components/User/user-update-form/user-update-form.component';
import { HomeMainComponent } from './Components/home-main/home-main.component';
import { AdminHomeMainCardComponent } from './Components/admin-home-main-card/admin-home-main-card.component';
import { AdminHomeMainChartComponent } from './Components/admin-home-main-chart/admin-home-main-chart.component';
import { NgChartsModule } from 'ng2-charts';
 


@NgModule({
  declarations: [


    AdminHomeComponent,
             AdminLoginComponent,
             ProductFormComponent,
             ProductContainerComponent,
             ProductListComponent,
             ProductUpdateFormComponent,
             UserContainerComponent,
             UserFromRegisterComponent,
             UserListComponent,
             UserUpdateFormComponent,
             HomeMainComponent,
             AdminHomeMainCardComponent,
             AdminHomeMainChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
