import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page.component';
import {   RouterModule,Routes } from '@angular/router';

const routes:Routes = [
  {path:'',component:RegistrationPageComponent}
]

@NgModule({
  declarations: [
    RegistrationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RegistrationModule { }
