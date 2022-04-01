import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import {   RouterModule,Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
const routes:Routes = [
  {path:'',component:LoginPageComponent}
]
@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)

  ]
})
export class LoginModule { }
