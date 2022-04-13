import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddressListComponent } from './user-address-list.component';

const routes: Routes = [
  {path:'',component:UserAddressListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UseraddresslistRoutingModule { }
