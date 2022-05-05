import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartProductSchema } from "src/app/Interfaces/cart-product-schema";
import {  cartproduct, CartSchema } from "src/app/Interfaces/cart-schema";
import { ProductSchema } from "src/app/Interfaces/product-schema";
import { WishlistProductView } from "src/app/Interfaces/wishlist-product-view";
import {   ProductStateSchema } from "../Products/products.reducers";
import { CurrentUserSchema } from "../User/user.reducers";
import { WishlistProduct, WishlistSchema } from "../Wishlist/wishlist.reducers";



export const selectCartFeature = createFeatureSelector<CartSchema>('cart')
export const selectProductFeature = createFeatureSelector<ProductStateSchema>('products')
export const selectWishlistFeature = createFeatureSelector<WishlistSchema>('wishlist')

export const selectFeatureCartProductsId = createSelector(
  (state:any):CartSchema=> state['cart'],
  (state:CartSchema)=>state.products.map((product)=>product.productId)
)

export const productSelector = createSelector(
  (state:any):ProductSchema[]=>state["products"],
  (state)=>{
    return {
      ...state
    }

  }
)
export const userSelector = createSelector(
  (state:any):CurrentUserSchema[]=>state["user"],
  (state)=>{
    return {
      ...state
    }
  }
)

export const selectProductsInCart = createSelector(
  selectCartFeature,
  selectProductFeature,
  (cart:CartSchema,products:ProductStateSchema)=>{
     const allproducts = products.products
     const cartProducts = cart.products;

      let productDetail!:CartProductSchema[]
     const productsInCart = {cartTotal:0,productDetail}
   if(cartProducts.length>0){
    productsInCart['productDetail'] = cartProducts.map((product:cartproduct)=>{
     const found = allproducts.find(p=>product.productId === p._id)
     productsInCart['cartTotal'] += Number(found?.price)*product.quantity;

     const productItem =
      {
       price:found!.price,
       quantity:product.quantity,
       productTotal:Number(found?.price)*product.quantity,
       img:found!.img,
       title:found!.title,
       productId:found!._id,
       color:found!.color
     }
     return productItem
    })
   }
    return productsInCart
  }
)


export const selectUserId = createSelector(
  (state:any):CurrentUserSchema=>state['user'],
  (state:CurrentUserSchema)=>state._id
)

export const selectWishlistProuduct = createSelector(
  selectWishlistFeature,
  selectProductFeature,
  (wishlist:WishlistSchema,products:any)=>{

let productWishlist:WishlistProductView[] = []
    if(wishlist.products !== undefined){
      productWishlist =  wishlist.products.map((wp:WishlistProduct)=>{
        const found:ProductSchema = products.products.find((productA:ProductSchema)=>productA._id===wp.toString())
        return {
          img:found.img,
          productId:found._id,
          title:found.title,

        }
       })
    }
return [  ...productWishlist]


  }
)


