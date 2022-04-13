import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './Components/payment/payment.component';
import { LoginGuard } from './Guards/login.guard';

import { HomeComponent } from './Screens/home/home.component';
import { ProductDetailComponent } from './Screens/product-detail/product-detail.component';
import { ProductPageComponent } from './Screens/product-page/product-page.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'product-detail/:id',component:ProductDetailComponent
  },
  {
    path:'products',component:ProductPageComponent
  },
  {
    path:'register',loadChildren:()=>
      import('./Screens/registration-page/registration.module')
      .then(module=>
        module.RegistrationModule)
  },
  {
    path:'cart', canActivate:[LoginGuard]  ,loadChildren:()=>
      import('./Screens/Cart/cart.module')
      .then(module=>
        module.CartModule)
  },
  {
    path:'shipping-address', canActivate:[LoginGuard]  ,loadChildren:()=>
      import('./Screens/user-address-list/useraddresslist.module')
      .then(module=>
        module.UseraddresslistModule)
  },
  {
    path:'login',loadChildren:()=>
      import('./Screens/login-page/login.module')
      .then(module=>
        module.LoginModule)
  },
  {
    path:'payment/:id',
    component:PaymentComponent
  },
  {
    path:'admin',
    loadChildren:()=>import('./dashboard/dashboard.module').then(module=>module.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
