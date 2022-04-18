import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalComponent } from './Components/legal/legal.component';
import { PaymentSuccessComponent } from './Components/payment-success/payment-success.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { UserUpdateMyDasboardFormComponent } from './Components/user-update-my-dasboard-form/user-update-my-dasboard-form.component';
import { UserUpdateComponent } from './Components/user-update/user-update.component';
import { UserUpdateFormComponent } from './dashboard/Components/User/user-update-form/user-update-form.component';
import { LoginGuard } from './Guards/login.guard';

import { HomeComponent } from './Screens/home/home.component';
import { MyDashboardComponent } from './Screens/my-dashboard/my-dashboard.component';
import { OverviewComponent } from './Screens/MyDashboard/overview/overview.component';
import { OrderPageComponent } from './Screens/order-page/order-page.component';
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
    pathMatch:'full',
    component:PaymentComponent
  },
  {
    path:'my',
    component:MyDashboardComponent,
    canActivate:[LoginGuard],
    children:[
      {
        path:'legal',
        component:LegalComponent
      },
      {
          path:'user',
          component:UserUpdateComponent,
          pathMatch:'full',

      },
      {
        path:'user/edit',
        component:UserUpdateMyDasboardFormComponent,
        pathMatch:'full'
      },
      {
        path:'',component:OverviewComponent,
      },
      {

        path:'orders',component:OrderPageComponent
      }
    ]
  },
  {
    path:'success',
    pathMatch:'full',
    component:PaymentSuccessComponent
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
