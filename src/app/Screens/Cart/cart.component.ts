import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { CartSchema } from 'src/app/Interfaces/cart-schema';
import { FetchService } from 'src/app/Services/Backend/fetch.service';
import { RegisterService } from 'src/app/Services/register.service';
import { WishlistSchema } from 'src/app/Store/Wishlist/wishlist.reducers';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  wishlist$!:Observable<WishlistSchema>
  cartTotal$!:Observable<number>
  userCart$!: Observable<CartSchema>;
  userCart!: any;
  products: any[] = [];
  cartTotal: number = 0;
  showCartSummary:boolean = false

  constructor(
    private router: Router,
    private register: RegisterService,
    private productService: FetchService,
    private store:Store<{wishlist:WishlistSchema}>

  ) {

  }

  ngOnInit(): void {
    this.wishlist$ = this.store.select('wishlist')

    // if (this.router.url === '/cart' && !!this.userCart === false) {
      if (this.products.length === 0) {
        this.userCart$ = this.register.getCartDetails();
      }
    // }



    this.userCart$.pipe(take(2)).subscribe((cart) => {
      // if(Object.keys(this.userCart).length>0 && this.userCart.products.length>0){
      //   this.register.getCartProductIds().pipe(take(1)).subscribe((ids)=>{
      //     this.adminService.getProductsByIds(ids).pipe(take(2)).subscribe((productsWithPrice:any)=>{
      //       if(productsWithPrice.length>0){
      //       const mapper =  productsWithPrice.map((productsWithPrice: any)=>{
      //           const cartproduct = this.userCart.products.find((p:any)=>productsWithPrice._id === p.productId)
      //           productsWithPrice['quantity'] = cartproduct.quantity;
      //         productsWithPrice['productTotal'] = Math.round(cartproduct.quantity * productsWithPrice.price);
      //         return productsWithPrice
      //         })

      //         this.userCart.products = mapper
      //         this.newproducts = mapper
      //       }
      //     })
      //   })
      //       }

      this.userCart = cart;
      this.products = [];
      if (this.userCart.products && this.userCart.products.length > 0) {
        cart.products.forEach((cartproduct: any) => {
          this.productService
            .getProduct(cartproduct.productId)
            .pipe(take(cart.products.length + 1))
            .subscribe((product: any) => {
              this.showCartSummary = true
              if (
                Object.keys(product).length !== 0 &&
                product._id === cartproduct.productId
              ) {
                product['quantity'] = cartproduct.quantity;
                product['productTotal'] = Math.round(cartproduct.quantity * product.price);
                this.products.push(product);
                this.products = Array.from(new Set(this.products));
                this.cartTotal +=  product['productTotal']
                this.products.sort();
              }
            });
        });
      }
    });

    this.userCart$.subscribe((cart: any) => {
      this.cartTotal = 0;

      if (Object.keys(cart).length > 0) {
this.cartTotal$ = this.register.calCartTotal()

      }
    });
  }

  incrmentProductInCart(product: any) {
    this.register.addProductToCart(product, product.quantity, 1);
  }

  caltotal(){
    this.register.calCartTotal()

  }
  decrementProductInCart(product: any) {
    if (product.quantity <= 1) {

      this.register.deleteProductFromCart(product);

    }
    this.register.addProductToCart(product, product.quantity, -1);
  }
}
