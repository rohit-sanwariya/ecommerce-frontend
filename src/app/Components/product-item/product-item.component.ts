import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RegisterService } from 'src/app/Services/register.service';
import { WishlistSchema } from 'src/app/Store/Wishlist/wishlist.reducers';
import { ProductSchema } from '../../Interfaces/product-schema';
import mediumZoom from 'medium-zoom';
import { cartproduct, CartSchema } from 'src/app/Interfaces/cart-schema';
import { take } from 'rxjs';
import { incrementCartProductStart } from 'src/app/Store/Cart/cart.actions';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: ProductSchema;
  liked = false;
  loading = false;
  ngOnInit(): void {
    this.store.select('wishlist').subscribe(
      (wishlist) => {
        if (Object.keys(wishlist).length > 0) {
          const productsarr: any[] = wishlist.products

          const productId: string = this.product._id


          if (productsarr !== undefined && productsarr.includes(productId)) {
            this.liked = true
          }
        }

      }
    )

  }

  constructor(
    private register: RegisterService,
    private store: Store<{ wishlist: WishlistSchema }>,
    private cartStore: Store<{ cart: CartSchema }>,
    private cdr: ChangeDetectorRef,

  ) {

  }


  addToCart() {
    // [routerLink]="['cart']"
    this.loading = true
    //
    this.cartStore.select('cart').pipe(take(1)).subscribe((cart:CartSchema)=>{
      const isProductInCartAlready = cart.products.findIndex((cp:cartproduct)=>cp.productId===this.product._id);
      if(isProductInCartAlready === -1){
        const newProductInCart = { productId: this.product._id, quantity: 1 }
      const newCart = {...cart,products:[...cart.products,newProductInCart]}

      this.cartStore.dispatch(incrementCartProductStart(newCart))


      }
      else{

      }

    })

    // this.register.addProductToCart(this.product, 0, 0)
  }

  zoomMe(image: HTMLImageElement) {

    const zoom = mediumZoom(image, {

    })
    if (this.loading !== true) {
      zoom.toggle()
    }

  }
  addToWishlist() {

    if (this.liked) {
      setTimeout(() => {
        this.cdr.detectChanges()
        this.liked = false
        this.register.removeProductWishlist(this.product._id)
        this.loading = false;
      }, 2500);
      this.loading = true


    }
    else {
      setTimeout(() => {
        this.cdr.detectChanges()
        this.liked = true
        this.register.addProductToWishlist(this.product._id)
        this.loading = false
      }, 2500);
      this.loading = true
    }



  }



}
