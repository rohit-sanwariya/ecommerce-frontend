import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

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
        clonesReq = req.clone(
          {
            setHeaders:{
          'Content-Type': 'application/json',
        }
      }
      );
    }
    return next.handle(clonesReq);
  }

}
