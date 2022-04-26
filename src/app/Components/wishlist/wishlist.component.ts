import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import { RegisterService } from 'src/app/Services/register.service';
import { fetchWishlistApi, fetchWishlistApiSuccess } from 'src/app/Store/Wishlist/wishlist.actions';
import {   WishlistSchema } from 'src/app/Store/Wishlist/wishlist.reducers';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  hasProducts:boolean = false
  wishlist$!:Observable<WishlistSchema>
  products$!:Observable<any>
  constructor(
    private productService:AdminService,
    private registerService:RegisterService,
    private location:Location,
    private store:Store<{wishlist:WishlistSchema}>
  ) {

     this.wishlist$ = this.store.select('wishlist')

  }

  ngOnInit(): void {
    this.registerService.getCurrentUser().subscribe((user: any) => {
      if (Object.keys(user).length > 0) {
        this.store.dispatch(fetchWishlistApi({ userId: user._id }))
      }
    })

    this.store.select('wishlist').pipe(take(2)).subscribe((wishlistStore) => {
      console.log(wishlistStore);

      if (wishlistStore.id) {
        this.registerService.getWishlistFromApi(wishlistStore.id).subscribe((wishlist) => {

          const wishlistPL: WishlistSchema =
          {
                id:wishlist.id,
                _id:wishlist._id,
                loading:false,
                products:wishlist.products
          }
          this.store.dispatch(fetchWishlistApiSuccess(wishlistPL))
          const ids:string[] = wishlist.products.map((item)=>item.toString())
          if(ids.length>0){
            this.products$ = this.productService.getProductsByIds(ids)
          this.hasProducts = true
          }
          else{
            this.hasProducts = false
          }
        })




      }
    })
  }


  removeProduct(productId:string){
      this.registerService.removeProductWishlist(productId).subscribe((updatedWishlist:any)=>{
            this.location.historyGo(0)
      })

  }



}
