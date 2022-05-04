import { Action, createReducer, on } from "@ngrx/store";
import { ProductSchema } from "src/app/Interfaces/product-schema";
import { reduceState } from "../Cart/cart.reducers";
import { getProductsError, getProductsStart, getProductsSuccess } from "./products.actions";




export interface productsInterface extends Array<ProductSchema>{

}
export interface ProductStateSchema extends reduceState {
  products:productsInterface

}
const products:productsInterface = []
export const productInitialState:ProductStateSchema={
  products:products,
loading:false,
error:false,

}





export const proudctsReducer = createReducer(
  productInitialState,
  on(getProductsStart,(state:ProductStateSchema)=>{

    return {
      ...state,loading:true
    }
  }),
  on(getProductsSuccess,(state:ProductStateSchema,{products})=>{
    

    return {
      ...state,loading:false,products
    }
  }),
  on(getProductsError,(state:ProductStateSchema)=>{
    return {
      ...state,error:true
    }
  }),
)
