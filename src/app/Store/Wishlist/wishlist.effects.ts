import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap, tap } from "rxjs";
import { StoreService } from "src/app/Services/store.service";
import {fetchWishlistApi, fetchWishlistApiSuccess} from './wishlist.actions'

@Injectable()
export class wishListEffect{
  loadWishlist$ = createEffect(()=> this.actions$.pipe(
    ofType(fetchWishlistApi),
    mergeMap(
      (user)=>this.service.getWishlist(user.userId).pipe(
        
        map(
          (wishlist)=> {


            return fetchWishlistApiSuccess(wishlist)
          }
        ),
        catchError(()=>EMPTY)
      )
      )
  ))

  constructor(
    private actions$:Actions,
    private service:StoreService
  ){

  }


}
