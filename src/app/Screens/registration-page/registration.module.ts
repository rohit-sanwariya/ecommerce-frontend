import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page.component';
import {   RouterModule,Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
const routes:Routes = [
  {path:'',component:RegistrationPageComponent}
]

@NgModule({
  declarations: [
    RegistrationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class RegistrationModule { }
