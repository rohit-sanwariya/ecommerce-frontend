import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../Guards/login.guard';
import { ProductContainerComponent } from './Components/product-container/product-container.component';
import { ProductFormComponent } from './Components/product-form/product-form.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductUpdateFormComponent } from './Components/product-update-form/product-update-form.component';
import { UserContainerComponent } from './Components/User/user-container/user-container.component';
import { UserFromRegisterComponent } from './Components/User/user-from-register/user-from-register.component';
import { UserListComponent } from './Components/User/user-list/user-list.component';
import { UserUpdateFormComponent } from './Components/User/user-update-form/user-update-form.component';
import { AdminHomeComponent } from './Screens/admin-home/admin-home.component';
import { AdminLoginComponent } from './Screens/admin-login/admin-login.component';
import { HomeMainComponent } from './Components/home-main/home-main.component';
import { AdminGuard } from '../Guards/admin.guard';
const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  {
    path: 'dashboard', component: AdminHomeComponent,
    canActivate:[AdminGuard],
    children: [
      {
        path:'',component:HomeMainComponent,
      },
      {
        path: 'products', component: ProductContainerComponent,
        children: [
          { path: 'register', component: ProductFormComponent },
          { path: '', component: ProductListComponent },
          { path: 'update/:id', component: ProductUpdateFormComponent }
        ]
      },
      {
        path: 'users', component: UserContainerComponent,
        children: [
          { path: 'register', component: UserFromRegisterComponent },
          { path: '', component: UserListComponent },
          { path: 'update/:id', component: UserUpdateFormComponent }
        ]
      },


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

}
