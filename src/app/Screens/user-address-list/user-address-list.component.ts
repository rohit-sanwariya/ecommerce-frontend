import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-user-address-list',
  templateUrl: './user-address-list.component.html',
  styleUrls: ['./user-address-list.component.scss']
})
export class UserAddressListComponent implements OnInit {
  showForm:boolean = false
  address!:any
  showList:boolean = false;
  selectedCountry:string= 'India'
  addressForm!:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private registerService:RegisterService
    ) {
      this.registerService.getUserAddress().subscribe((address:any)=>{
        this.address = address

      })
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
    const user = this.addressForm.value
      user.country = this.selectedCountry


    if(this.addressForm.valid && Object.keys(this.address).length == 0){


      this.registerService.addUserAddress(user)
    }
    else{
   this.address.addresses.push(user)
    this.registerService.appendNewAddress(this.address)

    }
  }

}
