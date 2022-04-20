import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserAddress } from 'src/app/Interfaces/user-adress';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-dashboard-user-address',
  templateUrl: './dashboard-user-address.component.html',
  styleUrls: ['./dashboard-user-address.component.scss']
})
export class DashboardUserAddressComponent implements OnInit {
  addressDb!:Observable<any>
  showModal:boolean = false
  userId:string = ''
  addresses!:Observable<UserAddress[]>
  formType:string = 'edit'
  constructor(
    private registerService:RegisterService,
    private location:Location,
    ) {
    this.registerService.getUserAddress().subscribe((addresses:any)=>{
      console.log(addresses);

     if(Object.keys(addresses).length>0){
      this.addresses = of(addresses.addresses)
      this.addressDb = of(addresses)
      this.userId = addresses.id
     }
    })
   }

  ngOnInit(): void {
  }
  removeSelectedAddress(addressSelected:any){

    this.addressDb.subscribe((address)=>{
      address.addresses = address.addresses.filter(
          (addF: any)=>{
            return addF._id !== addressSelected._id
          }

      )
      this.registerService.removeUserSelectedAddress(address).subscribe((address:any)=>{
       

        this.addressDb = of(address)
        this.addresses = of(address.addresses)
        this.location.historyGo(0)
      })


    })

    // this.registerService.removeUserSelectedAddress()
  }
  addNewUserAddress(){
      this.formType = 'new'
      this.showModal = true

  }
  editUserAddress(){
    this.location.historyGo(0)
    // this.formType = 'edit'
    // this.showModal = true
  }
  closeModal(){
    console.log('called');

    this.showModal = false
  }
  setShowModal(){
    console.log('hell');
    this.formType= 'new'
    this.showModal = true
  }


}
