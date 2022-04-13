import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { UseraddresslistRoutingModule } from './useraddresslist-routing.module';
import { UserAddressListComponent } from './user-address-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserAddressListComponent],
  imports: [
    CommonModule,
    UseraddresslistRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UseraddresslistModule { }
