export interface OrderSchema {
  userId:string
 products:Product[]
    amount:number,
    address:Object
    status:string,

   
}



interface Product{
  productId:string
  quantity:number
}
