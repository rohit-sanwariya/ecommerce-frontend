import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  val=0;
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonesReq;
    if(sessionStorage.getItem('accessToken')){
      const token:string|null = sessionStorage.getItem('accessToken');
       clonesReq = req.clone({setHeaders:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,

      }})


    }
    else{
        clonesReq = req.clone()
    }
    console.log(clonesReq);
    console.log(req);



console.log(this.val++);




    return next.handle(clonesReq);
  }

}
