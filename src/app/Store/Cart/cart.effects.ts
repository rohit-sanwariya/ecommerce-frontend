import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap, tap } from "rxjs";
import { CartSchema } from "src/app/Interfaces/cart-schema";
import { StoreService } from "src/app/Services/store.service";
import { incrementCartProductStart, fetchCartStart, fetchCartSuccess, incrementCartProductSuccess } from "./cart.actions";



@Injectable()

export class CartEffects{
  constructor(
    private actions$:Actions,
    private service:StoreService,
  ){

  }

  loadCart$ = createEffect(
    ()=>this.actions$.pipe(
      ofType(fetchCartStart),
      mergeMap(
        (user)=>this.service.getCartDetails(user.userId)
        .pipe(
          map(
            (cart:CartSchema)=>{


              return fetchCartSuccess(cart)}
            ),
            catchError(()=>EMPTY)
        )
      )
    )
  )

  addProduct$ = createEffect(
    ()=>this.actions$.pipe(
      ofType(incrementCartProductStart),
      mergeMap(
        (cart)=>this.service.incrmentProductInCart(cart).pipe(
          map(cart=>incrementCartProductSuccess(cart))
        )
      )
      )
    )



}
