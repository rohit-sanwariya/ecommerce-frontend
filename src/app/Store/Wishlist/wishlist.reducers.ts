import { Action, on, createReducer } from "@ngrx/store";

import { addProduct,fetchWishlistApi, fetchWishlistApiSuccess, updateProductWishlistStart, updateProductWishlistSuccess } from "./wishlist.actions";



export interface WishlistSchema {
  _id: string,
  id: string,
  products: WishlistProduct[],
  loading: undefined | boolean
}

export interface WishlistProduct {
  productId: string
}


export const initialState: WishlistSchema = {
  _id: '',
  id: '',
  products: [],
  loading: undefined
}

export const wishListReducer = createReducer(
  initialState,
  on(fetchWishlistApi, (state: WishlistSchema, payload: any ) => {
    return {
      ...state,  loading: true,id:payload.userId
    }
  }),
  on(fetchWishlistApiSuccess, (state: WishlistSchema, payload: any) => {

    return {
      ...state, id: payload.id, _id: payload._id, products: payload.products, loading: false
    }
  }),
  on(addProduct, (state: any, payload: any) => {


    return {
      ...state,
      ...payload
    }
  }),
  on(updateProductWishlistStart,(state:any,payload:any)=>{
    return {
      ...payload,loading:true
    }
  }),
  on(updateProductWishlistSuccess,(state:any,payload:any)=>{
    return {
      ...payload,loading:false
    }
  })
)
