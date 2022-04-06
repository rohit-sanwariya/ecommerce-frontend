import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminHomeComponent } from './Screens/admin-home/admin-home.component';
import { AdminLoginComponent } from './Screens/admin-login/admin-login.component';
import { UsersComponent } from './Components/users/users.component';
import { UserDetailComponent } from './Components/user-detail/user-detail.component';
import { ProductFormComponent } from './Components/product-form/product-form.component';



@NgModule({
  declarations: [


    AdminHomeComponent,
             AdminLoginComponent,
             UsersComponent,
             UserDetailComponent,
             ProductFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
