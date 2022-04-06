import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { DeferLoadDirective } from './Directives/defer-load.directive';
import { NewsLetterComponent } from './Components/news-letter/news-letter.component';
import { ProductPageComponent } from './Screens/product-page/product-page.component';
import { FilterComponent } from './Components/filter/filter.component';
import { ProductDetailComponent } from './Screens/product-detail/product-detail.component';
import { ProductDescriptionComponent } from './Components/product-description/product-description.component';
import { LoginModule } from './Screens/login-page/login.module';
import { RegistrationModule } from './Screens/registration-page/registration.module';
import { PaymentModule } from './Components/payment/payment.module';




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
    DeferLoadDirective,
    NewsLetterComponent,
    ProductPageComponent,
    FilterComponent,
    ProductDetailComponent,
    ProductDescriptionComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RegistrationModule,
    PaymentModule,
    LoginModule,
    SharedModule,
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
