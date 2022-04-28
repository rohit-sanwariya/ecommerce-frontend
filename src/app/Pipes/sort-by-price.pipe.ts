import { Pipe, PipeTransform } from '@angular/core';
import { ProductSchema } from '../Interfaces/product-schema';

@Pipe({
  name: 'sortByPrice'
})
export class SortByPricePipe implements PipeTransform {

  transform(products: ProductSchema[], apply:number): ProductSchema[] {


    if(apply==0){
      products.sort(
        function (a:ProductSchema,b:ProductSchema){


            return  Number(a.price) > Number(b.price) ?  1 :-1
         }
       )
    }
    else{
      products.sort(
        function (a:ProductSchema,b:ProductSchema){


            return  Number(a.price) < Number(b.price) ?  1 :-1
         }
       )
    }

    return products;
  }

}
