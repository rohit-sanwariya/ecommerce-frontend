import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { RegisterService } from 'src/app/Services/register.service';
import { selectWishlistProuduct } from 'src/app/Store/Cart/cart.selectors';
import {   updateProductWishlistStart } from 'src/app/Store/Wishlist/wishlist.actions';
import { WishlistProduct, WishlistSchema } from 'src/app/Store/Wishlist/wishlist.reducers';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  hasProducts: boolean = false
  wishlist$!: Observable<WishlistSchema>
  products$!: Observable<any>
  constructor
    (
      private registerService: RegisterService,
      private location: Location,
      private wishlistStore: Store<{ wishlist: WishlistSchema }>
    ) {

    this.wishlist$ = this.wishlistStore.select('wishlist')

  }

  ngOnInit(): void {


    this.products$ = this.wishlistStore.select(selectWishlistProuduct)


  }


  removeProduct(productId: string) {
    console.log(productId);

    this.wishlistStore.select('wishlist').pipe(take(1)).subscribe((wishlist:WishlistSchema) => {

     const newWishlist = {...wishlist,products:wishlist.products.filter(
       (wp:WishlistProduct)=>{
         console.log(wp);

         return wp.toString() !== productId
        }
       )
      }
      console.log(newWishlist);

     this.wishlistStore.dispatch(updateProductWishlistStart(newWishlist))

    }

    )

  }



}
