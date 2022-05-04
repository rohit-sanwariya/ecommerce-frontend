import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import { Observable  } from 'rxjs';
import { CartSchema } from './Interfaces/cart-schema';
import { ToastService } from './Services/toast.service';
import { fetchCartStart } from './Store/Cart/cart.actions';
import { productSelector, selectFeatureCartProductsId, selectProductsInCart, userSelector } from './Store/Cart/cart.selectors';
import { getProductsStart } from './Store/Products/products.actions';
import {   ProductStateSchema } from './Store/Products/products.reducers';
import { getUserApiStart } from './Store/User/user.actions';
import { CurrentUserSchema } from './Store/User/user.reducers';
import { fetchWishlistApi } from './Store/Wishlist/wishlist.actions';
import { WishlistSchema } from './Store/Wishlist/wishlist.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cart$!:Observable<CartSchema>;
  wishlist$!:Observable<WishlistSchema>;
  user$!:Observable<CurrentUserSchema>;
  title = 'ecommerce-frontend';
  show!: Observable<{ show: boolean, message: string,confirm:boolean,color:string }>;
  constructor(
    private toastService: ToastService,
    private userstore:Store<{user:CurrentUserSchema}>,
    private cartStore:Store<{cart:CartSchema}>,
    private wishlistStore:Store<{wishlist:WishlistSchema}>,
    private productsStore:Store<{wishlist:ProductStateSchema}>,

    ) {
      this.cart$ = this.cartStore.select('cart')
      this.cart$.subscribe((cart)=>{


      })
      this.wishlist$ = this.wishlistStore.select('wishlist')
      this.user$ = this.userstore.select('user')

   }

  ngOnInit(): void {
    this.userstore.dispatch(getUserApiStart())
    this.show = this.toastService.getSubject()

    this.user$.subscribe((user)=>{
      if(user._id !== ''){

       this.cartStore.dispatch(fetchCartStart({ userId: user._id }))
       this.wishlistStore.dispatch(fetchWishlistApi({ userId: user._id }))
      }
      this.productsStore.dispatch(getProductsStart());

    })


  }
  close() {
    this.toastService.hide()
  }
  confirm() {
    this.toastService.setConfirmSubject(true)
    this.toastService.hide()
  }
  deny() {
    this.toastService.setConfirmSubject(false)
    this.toastService.hide()
  }

}
