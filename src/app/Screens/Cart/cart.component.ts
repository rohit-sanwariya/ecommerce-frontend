import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { CartSchema } from 'src/app/Interfaces/cart-schema';
import { FetchService } from 'src/app/Services/Backend/fetch.service';
import { RegisterService } from 'src/app/Services/register.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  userCart$!: Observable<CartSchema>;
  userCart!: any;
  products: any[] = [];
  cartTotal:number = 0

  constructor(
    private router: Router,
    private register: RegisterService,
    private productService: FetchService
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/cart' && !!this.userCart === false) {
      if(this.products.length===0){

          this.userCart$ = this.register.getCartDetails();

      }
    }
    this.userCart$.pipe(take(2)).subscribe((cart) => {
      console.log('cart updated');

      this.userCart = cart;
      this.products = [];
      if (this.userCart.products && this.userCart.products.length > 0) {
        cart.products.forEach((cartproduct: any) => {
          this.productService
            .getProduct(cartproduct.productId).pipe(take(cart.products.length+1))
            .subscribe((product: any) => {
              if (Object.keys(product).length !== 0 && product._id === cartproduct.productId) {
                product['quantity'] = cartproduct.quantity;
                product['productTotal'] = cartproduct.quantity*product.price;

                this.products.push(product);
                this.products = Array.from(new Set(this.products));
                this.products.sort()


              }
            });
        });
      }
    });

    this.userCart$.subscribe((cart:any)=>{
      this.cartTotal =0


      if(Object.keys(cart).length > 0){
        console.log(this.products.length);

      }
    })
  }



  incrmentProductInCart(product: any) {
    console.log(product);

    this.register.addProductToCart(product, product.quantity,1);
  }
  decrementProductInCart(product: any) {
    if(product.quantity <= 1){
      console.log('hello');
      console.log(product);
      this.register.deleteProductFromCart(product);
    }
    this.register.addProductToCart(product, product.quantity,-1);
  }

}
