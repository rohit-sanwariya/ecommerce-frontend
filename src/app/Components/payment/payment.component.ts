import { Component, OnInit } from '@angular/core';
import { StripeService } from 'ngx-stripe';

import { switchMap, take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RegisterService } from 'src/app/Services/register.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  httpOptions = {
    headers:new HttpHeaders(
      {
        'Content-Type':  'application/json',

      }
    )
  }
  constructor(
    private http:HttpClient,
    private register:RegisterService,
    private router:Router
    ){
      this.register.getCartProducts().pipe(take(1)).subscribe((pro)=>{
       const paramsArray =    this.router.url.split('/')
       const id = paramsArray[paramsArray.length-1]


        this.register.getCartDetails().pipe(take(1)).subscribe((cart)=>{


          const mapper = cart.products.map((cartP)=>{
           const  prodPrice:any = pro.find((p:any)=>cartP.productId==p._id)


           return {
             productName:prodPrice?.title,
             price:prodPrice.price,
             quantity:cartP.quantity
           }

          })

          this.http.post('http://localhost:5000/api/stripe/payments',{mapper,id:id},this.httpOptions)
          .subscribe((result:any) => {
          if (result.error) {
                alert(result.error.message);
              }
              else{


                window.location.href = result.url;
              }
            });



        })

      })
  }
  ngOnInit(): void {

  }

  checkout() {
    // Check the server.js tab to see an example implementation
    }



}
