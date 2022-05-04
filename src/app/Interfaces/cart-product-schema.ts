export interface CartProductSchema {
  price:string,
  quantity:number,
  productTotal:number,
  img:string,
  title:string,
  productId:string,
  color:string
}
export interface ProductsInCartSchema{
  cartTotal:number,
  productDetail:CartProductSchema[]
}
 
