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
  editUserAdd:boolean|any = false
  loading:boolean = true
  addressDb!:Observable<any>
  showModal:boolean = false
  userId:string = ''
  addresses!:Observable<UserAddress[]>
  formType:string = 'edit'
  constructor(
    private registerService:RegisterService,
    private location:Location,
    ) {


   }

  ngOnInit(): void {
    this.registerService.getUserAddress().subscribe((addresses:any)=>{


     if(Object.keys(addresses).length>0){
      this.addresses = of(addresses.addresses);
      this.addressDb = of(addresses);
      this.loading = false;
      this.userId = addresses.id;
     }
    })
  }
  removeSelectedAddress(addressSelected:any){

    this.addressDb.subscribe((address)=>{
      address.addresses = address.addresses.filter(
          (addF: any)=>{
            return addF._id !== addressSelected._id
          }

      )
      // this.registerService.removeUserSelectedAddress(address).subscribe((address:any)=>{


      //   this.addressDb = of(address)
      //   this.addresses = of(address.addresses)
      //   this.location.historyGo(0)
      // })


    })

    // this.registerService.removeUserSelectedAddress()
  }
  addNewUserAddress(){
      this.formType = 'new'
      this.showModal = true

  }
  editUserAddress(add: any){
    this.formType='edit';
    this.showModal = true
    this.editUserAdd = add
  }
  closeModal(){


    this.showModal = false
  }
  setShowModal(){

    this.formType= 'new'
    this.showModal = true
  }


}
