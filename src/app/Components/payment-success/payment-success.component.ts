import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  sessionURL = "http://localhost:5000/api/stripe/session"
  httpOptions = {
    headers:new HttpHeaders(
      {
        'Content-Type':  'application/json',
        'authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
      }
    )
  }
  constructor(private route:ActivatedRoute,private router:Router,private http:HttpClient) {
    this.route.queryParams.subscribe({
      next:(params)=>{
        const id = params['session_id']
         this.http.get(`${this.sessionURL}/${id}`,this.httpOptions).pipe(catchError((err,caught)=>of(err))).subscribe((session:any)=>{

           try {


            if(session.status !==200){
              throw Error
            }
            else{
              
            }
            console.log(session);
           } catch (error) {

            this.router.navigate(['cart'])
           }


         })

       },
       error:(error)=>{
        // this.router.navigate(['cart'])
          console.log(error);


       }
    })
  }

  ngOnInit(): void {
  }

}
