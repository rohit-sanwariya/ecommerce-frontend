import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {  ProductsInCartSchema } from 'src/app/Interfaces/cart-product-schema';
import { cartproduct, CartSchema } from 'src/app/Interfaces/cart-schema';
import { RegisterService } from 'src/app/Services/register.service';
import { fetchCartStart, incrementCartProductStart } from 'src/app/Store/Cart/cart.actions';
import { selectProductsInCart, selectUserId } from 'src/app/Store/Cart/cart.selectors';
import { WishlistSchema } from 'src/app/Store/Wishlist/wishlist.reducers';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts$!:Observable<ProductsInCartSchema>
  wishlist$!:Observable<WishlistSchema>
  cartTotal$!:Observable<number>
  userCart$!: Observable<CartSchema>;
  userCart!: any;
  products: any[] = [];
  cartTotal: number = 0;
  showCartSummary:boolean = false

  constructor(
    private wishlistStore:Store<{wishlist:WishlistSchema,}>,
    private cartStore:Store<{cart:CartSchema}>,
    private store:Store,
  ) {

  }

  ngOnInit(): void {
    this.wishlist$ = this.wishlistStore.select('wishlist')
    this.userCart$ = this.cartStore.select('cart')

    this.cartProducts$ = this.store.select(selectProductsInCart)
    this.store.select(selectUserId).subscribe((userId)=>{
      console.log(userId);
      this.cartStore.dispatch(fetchCartStart(userId))
    })

  }

  incrmentProductInCart(productPlus: any) {

  this.cartStore.select('cart').pipe(take(1)).subscribe((cart:CartSchema)=>{
    let productToBeIncrmented:cartproduct = cart.products.find((product:cartproduct)=>product.productId === productPlus.productId)!

    const newCart = {...cart,products:cart.products.map(
      (cartproduct:cartproduct)=>{
        if(cartproduct.productId===productToBeIncrmented.productId){
          return {...productToBeIncrmented,quantity:productToBeIncrmented.quantity+1}
        }
        else{
          return cartproduct
        }
      }
    )}

    console.log(newCart);

    this.cartStore.dispatch(incrementCartProductStart(newCart))

  })
  }


  decrementProductInCart(productMinus: any) {
console.log('dec');

    this.cartStore.select('cart').pipe(take(1)).subscribe((cart:CartSchema)=>{
     if(productMinus.quantity>1){
      let productToBeIncrmented:cartproduct = cart.products.find((product:cartproduct)=>product.productId === productMinus.productId)!

      const newCart = {...cart,products:cart.products.map(
        (cartproduct:cartproduct)=>{
          if(cartproduct.productId===productToBeIncrmented.productId){
            return {...productToBeIncrmented,quantity:productToBeIncrmented.quantity-1}
          }
          else{
            return cartproduct
          }
        }
      )}
      console.log(newCart);
     this.cartStore.dispatch(incrementCartProductStart(newCart))

     }
     else{
      let productToBeRemoved:any = cart.products.filter((product:cartproduct)=>product.productId === productMinus.productId)!
      console.log(productToBeRemoved);

     }
    })


  }
}
