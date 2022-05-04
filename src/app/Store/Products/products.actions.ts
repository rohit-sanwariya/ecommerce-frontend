import { createAction, props } from "@ngrx/store";
import { ProductSchema } from "src/app/Interfaces/product-schema";

import { productsInterface } from "./products.reducers";


export const getProductsStart = createAction('[Products] Get Start')
export const getProductsSuccess = createAction(
  '[Products] Get Success',
  props<{ products:ProductSchema[] }>(),
  )
export const getProductsError = createAction('[Products] Get Error')
