import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { RegisterService } from 'src/app/Services/register.service';
import { fetchWishlistApi, fetchWishlistApiSuccess } from 'src/app/Store/Wishlist/wishlist.actions';
import { WishlistSchema } from 'src/app/Store/Wishlist/wishlist.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private store: Store<{ wishlist: WishlistSchema }>,
    private registerService: RegisterService,
  ) {



  }

  ngOnInit(): void {
    this.registerService.getCurrentUser().subscribe((user: any) => {
      if (Object.keys(user).length > 0) {
        this.store.dispatch(fetchWishlistApi({ userId: user._id }))
      }
    })

    this.store.select('wishlist').pipe(take(2)).subscribe((wishlistStore) => {


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

        })

      }
    })
  }

}
