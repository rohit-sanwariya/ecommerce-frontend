import { Component, OnInit } from '@angular/core';
import { StripeService } from 'ngx-stripe';

import { switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
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
        'Authorization':'Bearer '
      }
    )
  }
  constructor(private http:HttpClient,private stripeService: StripeService,private router:Router){

  }
  ngOnInit(): void {

  }

  checkout() {
    // Check the server.js tab to see an example implementation
    this.http.post('http://localhost:5000/api/stripe/payments',this.httpOptions).subscribe((result:any) => {


    if (result.error) {
          alert(result.error.message);
        }
        else{
          window.location.href = result.url;
        }
      });
  }



}
