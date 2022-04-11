export interface CartSchema {
  _id:string;
  id:string;
  products:Array<product>

}

interface product{
  productId:string,
  quantity:number
}
