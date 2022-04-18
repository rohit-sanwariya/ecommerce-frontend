import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, take } from 'rxjs';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  cart$: Observable<any>
  sessionURL = "http://localhost:5000/api/stripe/session"
  orderURL = "http://localhost:5000/api/orders"
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
      }
    )
  }
  address$: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private registerService: RegisterService
  ) {
    this.cart$ = this.registerService.getCartDetails()
    this.address$ = this.registerService.getUserAddress()

    this.route.queryParams.subscribe({
      next: (params) => {
        const id = params['session_id']
        const addId = params['id']

        this.http.get(`${this.sessionURL}/${id}`, this.httpOptions)
          .pipe(catchError((err, caught) => of(err))).subscribe((session: any) => {

            try {
              if (session.status !== "complete") {
                throw Error
              }
              this.cart$.pipe(take(1)).subscribe((cart: any) => {
                if (Object.keys(cart).length > 0) {
                  const amount = session.amount_total

                  const userId = cart.id
                  const products = cart.products



                  const status = "Complete"
                  this.address$.subscribe((address)=>{
                  const   shippingAddress = address.addresses.find((add:any)=>add._id==addId)
                  if(products && products.length >0){
                    this.http.post(this.orderURL,{userId,products,status,address:shippingAddress,amount},this.httpOptions).subscribe((order:any)=>{


                      this.registerService.setOrders(order)
                      this.registerService.clearCart(cart)
                      })
                  }
                  else{

                  }
                  })
                }
              })

            } catch (error) {
              this.router.navigate(['cart'])
            }
          })
      },
      error: (error) => {
        // this.router.navigate(['cart'])



      }
    })
  }

  ngOnInit(): void {



  }

}
