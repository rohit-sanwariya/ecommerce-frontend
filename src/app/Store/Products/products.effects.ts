import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap } from "rxjs";
import { ProductSchema } from "src/app/Interfaces/product-schema";
import { StoreService } from "src/app/Services/store.service";
import { getProductsStart, getProductsSuccess } from "./products.actions";
import { productsInterface } from "./products.reducers";


@Injectable()
export class ProductsEffects{
loadProducts$ = createEffect(
  ()=>this.actions$.pipe(
    ofType(getProductsStart),
    mergeMap(
      ()=> this.service.getProducts().pipe(
        map(
          (products:ProductSchema[])=> getProductsSuccess({products})
          ),
        catchError(()=>EMPTY)
      )
    )
  )
)

constructor(
  private actions$:Actions,
  private service:StoreService,
  ){

}
}
