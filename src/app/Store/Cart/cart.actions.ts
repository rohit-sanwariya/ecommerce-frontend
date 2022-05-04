import { createAction, props } from "@ngrx/store";
import { cartproduct } from "src/app/Interfaces/cart-schema";
import { ProductSchema } from "src/app/Interfaces/product-schema";


export const fetchCartStart = createAction(
  '[Cart] Fetch Start',
  (payload:any)=>payload
  )

export const fetchCartSuccess = createAction('[Cart] Fetch Success'
,(payload:any)=>payload
)

export const fetchCartFailed = createAction('[Cart] Fetch Failed')

export const incrementCartProductStart = createAction(
  '[Cart] Increment Product Start',
  payload=>payload
  )
export const incrementCartProductSuccess = createAction(
  '[Cart] Increment Product Success',
  payload=>payload
  )
export const incrementCartProductFailed = createAction(
  '[Cart] Increment Product Failed',

  )


