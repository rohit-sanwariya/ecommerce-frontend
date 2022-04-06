import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import {NgxStripeModule} from 'ngx-stripe';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxStripeModule.forChild("pk_test_51KkkmKSAQGpUaici6SQfJXpfQtZ6mEVqA8q7V2K32ZOlKBhmI5O1RviVYzCl4GDHaWpjhHkMMFDEksgacBzy4z1x00SOMeAS8H"),

  ]
})
export class PaymentModule { }
