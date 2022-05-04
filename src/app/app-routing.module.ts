import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmScreenComponent } from './Components/confirm-screen/confirm-screen.component';
import { DashboardUserAddressComponent } from './Components/dashboard-user-address/dashboard-user-address.component';
import { LegalComponent } from './Components/legal/legal.component';
import { MantraCashComponent } from './Components/mantra-cash/mantra-cash.component';
import { PasswordAssitanceComponent } from './Components/password-assistance/password-assistance.component';
import { PaymentSuccessComponent } from './Components/payment-success/payment-success.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { ReenterPasswordComponent } from './Components/reenter-password/reenter-password.component';
import { UserUpdateMyDasboardFormComponent } from './Components/user-update-my-dasboard-form/user-update-my-dasboard-form.component';
import { UserUpdateComponent } from './Components/user-update/user-update.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { UserUpdateFormComponent } from './dashboard/Components/User/user-update-form/user-update-form.component';
import { AdminGuard } from './Guards/admin.guard';
import { ConfirmScreenGuard } from './Guards/confirm-screen.guard';
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
    path:'forgotpassword',
    component:PasswordAssitanceComponent
  },
  {
    path:'reenter-password',
    component:ReenterPasswordComponent
  },
  {
    path:'confirmscreen',
    component:ConfirmScreenComponent,
    // canActivate:[ConfirmScreenGuard]
  },
  {
    path:'payment/:id',
    pathMatch:'full',
    component:PaymentComponent
  },
  {
    path:'wishlist',
    pathMatch:'full',
    component:WishlistComponent,
    canActivate:[LoginGuard]
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
        path:'user/address',
        component:DashboardUserAddressComponent,
        pathMatch:'full'
      },
      {
        path:'user/cash',
        component:MantraCashComponent,
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
    loadChildren:()=>import('./dashboard/dashboard.module').then(module=>module.DashboardModule),
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
