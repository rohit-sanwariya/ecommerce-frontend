import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { UseraddresslistRoutingModule } from './useraddresslist-routing.module';
import { UserAddressListComponent } from './user-address-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { addressReducer } from 'src/app/Store/Address/address.reducers';

@NgModule({
  declarations: [UserAddressListComponent],
  imports: [
    CommonModule,
    UseraddresslistRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('address', addressReducer)

  ]
})
export class UseraddresslistModule { }
