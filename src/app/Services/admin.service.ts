import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductSchema } from '../Interfaces/product-schema';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseURL = 'http://localhost:5000'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
    })
  }
  constructor(
    private http:HttpClient
  ) { }

  registerProduct(product:ProductSchema){
    console.log(product,this.baseURL+`/api/products`);

      this.http.post<ProductSchema>(`${this.baseURL}/api/products/`,product,this.httpOptions).subscribe((val)=>{
        console.log(val);

      })
  }
}
