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
export const updateProductWishlistStart = createAction(
  '[Wishlist Component] Update Product Start',
  (payload:any)=>payload
);

export const updateProductWishlistSuccess = createAction(
  '[Wishlist Component] Update Product Success',
  (payload:any)=>payload
);

export const updateProductWishlistFailed = createAction(
  '[Wishlist Component] Update Product Failed',
);

