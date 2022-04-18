import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Observable, Subject } from 'rxjs';

import { OrderSchema } from 'src/app/Interfaces/order-schema';
import { AdminService } from 'src/app/Services/admin.service';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  orders!:any
  orders$!:Observable<OrderSchema[]>
  orderViewSubject = new BehaviorSubject([
    {
      price:0,
      name:"name",
      img:"",
      quantity:1,
      orderId:"orderId",
      amountProduct:0,
      orderedOn:""
    }
  ])

  constructor(private registerService:RegisterService,private adminService:AdminService) {
    this.orders$ = this.registerService.getUserOrders()
  }

  ngOnInit(): void {

    if(!this.orders){
      console.log('hello');

      this.orders$.subscribe((orders)=>{
        if(orders.length ===0) return
          const orderProductIds = this.flattenArray(orders)
          this.adminService.getProductsByIds(orderProductIds).subscribe((products)=>{
        const productOrder:any =    products.map((productWithPrice:any)=>{


              return {
                orderedOn:this.formatDate(this.findProductFromOrder(orders,productWithPrice).createdAt),
                price:productWithPrice.price,
                name:productWithPrice.title,
                img:productWithPrice.img,
                quantity:this.findProductFromOrder(orders,productWithPrice).product.quantity,
                orderId:this.findProductFromOrder(orders,productWithPrice).orderId,
                amountProduct: productWithPrice.price*this.findProductFromOrder(orders,productWithPrice).product.quantity
              }

            })
         this.orderViewSubject.next(productOrder)


          })


        this.orders = orders


      })

    }

  }

  flattenArray(orders:any){
   return  orders.flatMap((order:any)=>{


      return  [...order.products.flatMap((product:any)=>{
         console.log(product.productId);

         return product.productId
       })]

     })
  }

  findProductFromOrder(orders:any,productWithPrice:any){
       const found =  orders.map((order:any)=>{
         return {orderId:order._id,createdAt:order.createdAt,product:order.products.find((op:any)=>op.productId==productWithPrice._id)}
       })
        const filterFound = found.filter((f:any)=> f.product !== undefined)

       return filterFound[0]
  }

  formatDate(date:string){
    const newDate = new Date(date.substring(0,10))
    const formatedDate = date.split("T")[0]
    console.log('date',newDate,formatedDate);
    return formatedDate

  }

}
