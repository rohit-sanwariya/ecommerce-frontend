import { createAction } from "@ngrx/store";



export const addProduct = createAction(
  '[Wishlist Component] Addproduct',
  (payload:any)=>payload
);
export const fetchWishlistApi = createAction(
  '[Wishlist Component] FetchWishlist Start',
  (payload:any)=>payload

);
export const fetchWishlistApiSuccess = createAction(
  '[Wishlist Component] FetchWishlist Success',
  (payload)=>payload

);
export const removeProduct = createAction(
  '[Wishlist Component] Remove Product',
  (payload:any)=>payload
);
export const emptyWishlist = createAction(
  '[Wishlist Component] Clear Wishlist'
);
