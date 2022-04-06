import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../Guards/login.guard';
import { ProductFormComponent } from './Components/product-form/product-form.component';
import { AdminHomeComponent } from './Screens/admin-home/admin-home.component';
import { AdminLoginComponent } from './Screens/admin-login/admin-login.component';

const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  {
    path: 'dashboard', component: AdminHomeComponent, canActivate: [LoginGuard],
    children:[
      {path:'products',component:ProductFormComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

}
