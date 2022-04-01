import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../Interfaces/login-user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginURL:string = 'http://localhost:5000/api/auth/login'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http:HttpClient) {

   }

   loginUser(user:LoginUser){
     this.http.post(this.loginURL,user,this.httpOptions)
   }
}
