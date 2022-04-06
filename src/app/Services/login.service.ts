import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, of, Subject  } from 'rxjs';
import { LoginUser } from '../Interfaces/login-user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginURL:string = 'http://localhost:5000/api/auth/login'
  loginSubject = new Subject()
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http:HttpClient) {

   }

   loginUser(user:LoginUser):Observable<boolean>{

     this.http.post<LoginUser>(this.loginURL,user,this.httpOptions).subscribe((res:any)=>{
     this.loginSubject.next(res.isAdmin)
      if(res.isAdmin){
        sessionStorage.setItem('accessToken',res.accessToken)
      }

     })
     return this.loginSubject.asObservable() as Observable<boolean>;
   }
}
