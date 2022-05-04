export interface CartSchema {
  _id:string;
  id:string;
  products:Array<cartproduct>

}

export interface cartproduct{
  productId:string,
  quantity:number
}
