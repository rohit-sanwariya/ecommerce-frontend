import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './Shared/shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Screens/home/home.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { CarouselItemComponent } from './Components/carousel-item/carousel-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GroupComponent } from './Components/group/group.component';
import { GroupItemComponent } from './Components/group-item/group-item.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductItemComponent } from './Components/product-item/product-item.component';
import { NewsLetterComponent } from './Components/news-letter/news-letter.component';
import { ProductPageComponent } from './Screens/product-page/product-page.component';
import { FilterComponent } from './Components/filter/filter.component';
import { ProductDetailComponent } from './Screens/product-detail/product-detail.component';
import { ProductDescriptionComponent } from './Components/product-description/product-description.component';
import { LoginModule } from './Screens/login-page/login.module';
import { RegistrationModule } from './Screens/registration-page/registration.module';
import { PaymentModule } from './Components/payment/payment.module';
import { StoreModule } from '@ngrx/store';
import { PaymentSuccessComponent } from './Components/payment-success/payment-success.component';
import { OrderPageComponent } from './Screens/order-page/order-page.component';
import { MyDashboardComponent } from './Screens/my-dashboard/my-dashboard.component';
import { OverviewComponent } from './Screens/MyDashboard/overview/overview.component';
import { UserUpdateComponent } from './Components/user-update/user-update.component';
import { LegalComponent } from './Components/legal/legal.component';
import { UserUpdateMyDasboardFormComponent } from './Components/user-update-my-dasboard-form/user-update-my-dasboard-form.component';
import { MantraCashComponent } from './Components/mantra-cash/mantra-cash.component';
import { DashboardUserAddressComponent } from './Components/dashboard-user-address/dashboard-user-address.component';
import { ModalAddressComponent } from './Components/modal-address/modal-address.component';
import { PasswordAssitanceComponent } from './Components/password-assistance/password-assistance.component';
import { ConfirmScreenComponent } from './Components/confirm-screen/confirm-screen.component';
import { ReenterPasswordComponent } from './Components/reenter-password/reenter-password.component';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    CarouselItemComponent,
    GroupComponent,
    GroupItemComponent,
    ProductsComponent,
    ProductItemComponent,

    NewsLetterComponent,
    ProductPageComponent,
    FilterComponent,
    ProductDetailComponent,
    ProductDescriptionComponent,
    PaymentSuccessComponent,
    OrderPageComponent,
    MyDashboardComponent,
    OverviewComponent,
    UserUpdateComponent,
    LegalComponent,
    UserUpdateMyDasboardFormComponent,
    MantraCashComponent,
    DashboardUserAddressComponent,
    ModalAddressComponent,
    PasswordAssitanceComponent,
    ConfirmScreenComponent,
    ReenterPasswordComponent,

  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RegistrationModule,
    PaymentModule,
    LoginModule,
    SharedModule,
    StoreModule.forRoot({}, {}),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
