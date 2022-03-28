import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Screens/home/home.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'registration',loadChildren:()=>
      import('./Screens/registration-page/registration.module')
      .then(module=>
        module.RegistrationModule)
  },
  {
    path:'login',loadChildren:()=>
      import('./Screens/login-page/login.module')
      .then(module=>
        module.LoginModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
