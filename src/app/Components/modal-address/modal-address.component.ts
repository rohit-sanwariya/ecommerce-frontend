import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss'],
})
export class ModalAddressComponent implements OnInit {
  @Input() editUserAdd: boolean | any;
  addressForm!: FormGroup;
  @Input() addressess: any;
  @Input() userId!: string;
  @Input() formType: string = 'new';
  @Output() closeModalEvent = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private location: Location
  ) { }

  ngOnInit(): void {
    if (!this.editUserAdd) {
      this.addressForm = this.formBuilder.group({
        country: ['India', [Validators.required]],
        fullname: ['', [Validators.required]],
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        state: ['', [Validators.required]],
        isDefault: [false],
      });
    } else {

      const add = this.editUserAdd;
      this.addressForm = this.formBuilder.group({
        country: [add.country, [Validators.required]],
        fullname: [add.fullname, [Validators.required]],
        street: [add.street, [Validators.required]],
        city: [add.city, [Validators.required]],
        zip: [add.zip, [Validators.required]],
        phone: [add.phone, [Validators.required]],
        state: [add.state, [Validators.required]],
        isDefault: [add.isDefault],
      });
    }
  }

  cancelModal() {
    this.closeModalEvent.emit();
  }
  confirmAction() {
    if (this.addressForm.valid && this.userId !== undefined) {
      const form = this.addressForm.value;


      if (
        !!this.addressess &&
        !this.editUserAdd &&
        this.addressess.addresses.length > 0
      ) {
        this.addressess.addresses.push(form);

        this.registerService
          .appendNewAddress(this.addressess)
          .subscribe((address) => {
            this.addressess = address;
            this.cancelModal();
            this.location.historyGo(0);
          });
      } else if (!!this.editUserAdd && this.addressess.addresses.length > 0) {
        this.addressess.addresses = this.addressess.addresses
          .map((add: any) =>
            add._id === this.editUserAdd._id ? this.addressForm.value : add);
          this.registerService.editUserAddress(this.addressess).subscribe((addressdb:any)=>{
            this.addressess = addressdb;
            this.location.historyGo(0);
            this.cancelModal()

          })


      } else {
        this.registerService
          .addUserAddress(this.addressForm.value)
          .subscribe((address) => {
            this.addressess = address;
            this.cancelModal();
          });
      }
    }
  }
}
