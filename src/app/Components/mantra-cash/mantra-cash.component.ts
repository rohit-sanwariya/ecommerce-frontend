import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-mantra-cash',
  templateUrl: './mantra-cash.component.html',
  styleUrls: ['./mantra-cash.component.scss']
})
export class MantraCashComponent implements OnInit {
  MantraCash =0
  constructor(private registerService:RegisterService) {
      this.registerService.getUserOrders().pipe(map((orders)=>{


        return orders.map((order:any)=>{
          return {
            amount:order.amount
          }
        })
      })).subscribe((orders)=>{
        this.MantraCash =0
        orders.map((amount)=>{
          this.MantraCash += amount.amount/100
          this.MantraCash = Math.round(this.MantraCash)
            })


      })
   }

  ngOnInit(): void {


  }

}
