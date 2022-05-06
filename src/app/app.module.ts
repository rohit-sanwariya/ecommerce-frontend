import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './Shared/shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Screens/home/home.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { CarouselItemComponent } from './Components/carousel-item/carousel-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { wishListReducer } from './Store/Wishlist/wishlist.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { wishListEffect } from './Store/Wishlist/wishlist.effects';
import { SortByPricePipe } from './Pipes/sort-by-price.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import ordersReducer from './dashboard/Store/Orders/orders.reducers';
import { NgChartsModule } from 'ng2-charts';
import { loginReducer } from './Store/Login/login.reducers';
import { LoginEffects } from './Store/Login/login.effects';
import { UserEffects } from './Store/User/user.effects';
import { userReducer } from './Store/User/user.reducers';
import { CartEffects } from './Store/Cart/cart.effects';
import { cartReducer } from './Store/Cart/cart.reducers';
import { proudctsReducer } from './Store/Products/products.reducers';
import { ProductsEffects } from './Store/Products/products.effects';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { addressReducer } from './Store/Address/address.reducers';
import { AddressEffects } from './Store/Address/address.effects';








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
    WishlistComponent,
    SortByPricePipe,
    PagenotfoundComponent,

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
    NgChartsModule,
    StoreModule.forRoot({
      wishlist: wishListReducer,
      orders: ordersReducer,
      login:loginReducer,
      user:userReducer,
      cart:cartReducer,
      products:proudctsReducer,
      address:addressReducer
    }),
    StoreDevtoolsModule.instrument(
      {
        maxAge: 25,
        logOnly: environment.production
      }
    ),
    EffectsModule.forRoot(
      [
        LoginEffects,
        UserEffects,
        wishListEffect,
        CartEffects,
        ProductsEffects,
        AddressEffects
      ]
      ),
    EffectsModule.forFeature([
      LoginEffects,
      UserEffects,
      wishListEffect,
      CartEffects,
      ProductsEffects
    ]),
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
