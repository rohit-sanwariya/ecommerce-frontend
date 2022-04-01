import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from '../Interfaces/new-user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerURL:string = "http://localhost:5000/api/auth/register"
  httpOptions = {
    headers:new HttpHeaders(
      {
        'Content-Type':  'application/json',
      }
    )
  }


  constructor(private http:HttpClient) { }

  onUserRegister(newUser:NewUser){
    console.log(newUser);

    this.http.post<NewUser>(this.registerURL,newUser,this.httpOptions).subscribe((data)=>{
      console.log(data);

    })
  }
}
