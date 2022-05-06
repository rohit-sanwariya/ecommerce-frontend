import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { RegisterService } from 'src/app/Services/register.service';
import { StoreService } from 'src/app/Services/store.service';
import { getUserAddressStart, postUserAddressStart, putUserAddressStart } from 'src/app/Store/Address/address.actions';
import { UserAddressSchema, UserAddressStateSchema } from 'src/app/Store/Address/Interfaces/user-address-state-schema';
import { selectUserId } from 'src/app/Store/Cart/cart.selectors';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-user-address-list',
  templateUrl: './user-address-list.component.html',
  styleUrls: ['./user-address-list.component.scss']
})
export class UserAddressListComponent implements OnInit {
  showForm:boolean = false
  address$!:Observable<UserAddressStateSchema>
  showList:boolean = false;
  selectedCountry:string= 'India'
  addressForm!:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private registerService:RegisterService,
    private storeService:StoreService,
    private store:Store,
    private storeAddress:Store<{address:UserAddressStateSchema}>,
    ) {

     }

  ngOnInit(): void {

    this.addressForm = this.formBuilder.group({
      country:['India',[Validators.required]],
      fullname:['',[Validators.required]],
      street:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      zip:['',[Validators.required]],
      phone:['',[Validators.required]],
    })
    this.store.select(selectUserId).subscribe((userId)=>{
      console.log(userId);

      this.storeAddress.dispatch(getUserAddressStart({userId}))
    })
    this.address$ = this.storeAddress.select('address')
  }

  selectAddress(add: any){
    this.registerService.setSelectedUserAddressShipping(add)
  }
  toggleMenu(){
    this.showList = !this.showList
  }
  clickedOutside(){
    this.showList  = false
  }
  selected(event:Event){
   const element = event.target as HTMLElement
    this.selectedCountry = element.innerText
    this.showList = false
  }

  addUserAddress(){
    const user:UserAddressSchema = this.addressForm.value
      user.country = this.selectedCountry



    if(this.addressForm.valid ){


      this.storeAddress.select('address').pipe(take(1)).subscribe(
        (UserAddress:UserAddressStateSchema)=>{
          const newUserAddress:UserAddressStateSchema = {...UserAddress,addresses:[...UserAddress.addresses,user]}
          if(UserAddress.error && UserAddress.addresses.length===0){
            console.log(newUserAddress);
            this.storeAddress.dispatch(postUserAddressStart(newUserAddress))
          }
          else{
            console.log('hello');
            this.storeAddress.dispatch(putUserAddressStart(newUserAddress))
          }

        }
      )

      // this.registerService.addUserAddress(user)
    }
    else{
  //  this.address.addresses.push(user)
    // this.registerService.appendNewAddress(this.address)

    }
  }

}
