import { TemplateLiteral } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";

import { RegisterService } from "src/app/Services/register.service";
import { addProduct, fetchWishlistApi, fetchWishlistApiSuccess } from "./wishlist.actions";
import { WishlistSchema } from "./wishlist.reducers";

@Injectable()
export class wishListEffect {
  constructor(
    private action$: Actions,
    private registerService: RegisterService
  ) {

console.log('effects working');
  }

  loadWishlist$ = this.action$.pipe(

    ofType(fetchWishlistApi), map(
      (action:any) => this.registerService.getWishlistFromApi(action.userId)
      .pipe(
        map(wishlist=>
           {
              const tempPayload = {
                _id:wishlist._id,
                id:wishlist.id,
                loading:false,
                products:wishlist.products
            }
            console.log('hello');

            return fetchWishlistApiSuccess(tempPayload)


        }
        ),
          catchError((err:any) => of(err))

      )
    ),
    
  )



}
