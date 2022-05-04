import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartProductSchema } from "src/app/Interfaces/cart-product-schema";
import {  cartproduct, CartSchema } from "src/app/Interfaces/cart-schema";
import { ProductSchema } from "src/app/Interfaces/product-schema";
import { productsInterface, ProductStateSchema } from "../Products/products.reducers";
import { CurrentUserSchema } from "../User/user.reducers";



export const selectCartFeature = createFeatureSelector<CartSchema>('cart')
export const selectProductFeature = createFeatureSelector<ProductStateSchema>('products')

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

// export const selectProductsInWishlist = createSelector(

// )
