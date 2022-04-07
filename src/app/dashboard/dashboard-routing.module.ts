import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../Guards/login.guard';
import { ProductContainerComponent } from './Components/product-container/product-container.component';
import { ProductFormComponent } from './Components/product-form/product-form.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductUpdateFormComponent } from './Components/product-update-form/product-update-form.component';
import { UserContainerComponent } from './Components/User/user-container/user-container.component';
import { AdminHomeComponent } from './Screens/admin-home/admin-home.component';
import { AdminLoginComponent } from './Screens/admin-login/admin-login.component';

const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  {
    path: 'dashboard', component: AdminHomeComponent, canActivate: [LoginGuard],
    children: [
      {
        path: 'products', component: ProductContainerComponent, children: [
          { path: 'register', component: ProductFormComponent },
          { path: '', component: ProductListComponent },
          { path: 'update/:id', component: ProductUpdateFormComponent }
        ]
      },
      {
        path: 'users', component: UserContainerComponent, children: [
          { path: 'register', component: ProductFormComponent },
          { path: '', component: ProductListComponent },
          { path: 'update/:id', component: ProductUpdateFormComponent }
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
