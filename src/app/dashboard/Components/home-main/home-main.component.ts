import { Component,  OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { OrdersStateSchema } from 'src/app/Interfaces/order-schema';
import { RegisterService } from 'src/app/Services/register.service';
import { loadOrdersStart, loadOrdersSuccess } from '../../Store/Orders/orders.actions';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss']
})
export class HomeMainComponent implements OnInit {
  orders$!:Observable<OrdersStateSchema>
  allOrdersTotal:number = 0;

  constructor(
    private registerService: RegisterService,
    private store: Store<{ orders: OrdersStateSchema }>,
  ) {


  }

  ngOnInit(): void {

    this.orders$ = this.store.select('orders');
    this.store.dispatch(loadOrdersStart());
    this.registerService.getAllOrdersByAdmin().pipe(filter(val => Array.isArray(val))).subscribe((orders) => {
      this.store.dispatch(loadOrdersSuccess(orders))
    });

    this.orders$.pipe(take(2)).subscribe((orders)=>{
     try {
        orders.orders.length>0 &&
        orders.orders.map((order)=>{
          this.allOrdersTotal += order.amount/100
          return order

        })
     } catch (error) {

     }

    })

  }

}
