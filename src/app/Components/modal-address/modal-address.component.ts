import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss']
})
export class ModalAddressComponent implements OnInit {
  addressForm!: FormGroup
  @Input() addressess: any
  @Input() userId!: string
  @Input() formType: string = 'new'
  @Output() closeModalEvent = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private location:Location,
  ) { }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      country: ['India', [Validators.required]],
      fullname: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      state: ['', [Validators.required]],
      isDefault: [false]
    })
  }

  cancelModal() {
    this.closeModalEvent.emit()
  }
  confirmAction() {

    if (this.addressForm.valid && this.userId !== undefined ) {
      const form = this.addressForm.value
      console.log(this.addressForm.value);


      if ((!!this.addressess) && this.addressess.addresses.length > 0) {

          this.addressess.addresses.push(form)
          console.log(this.addressess.addresses);
         this.registerService.appendNewAddress(this.addressess).subscribe((address)=>{
          this.addressess = address
          this.cancelModal()
          this.location.historyGo(0)
        })
      }
      else {
        console.log('create new');

        this.registerService.addUserAddress(this.addressForm.value).subscribe((address)=>{
          this.addressess = address
          this.cancelModal()
        })


      }

    }

  }
  

}
