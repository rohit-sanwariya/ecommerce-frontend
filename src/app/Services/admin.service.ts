import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductSchema } from '../Interfaces/product-schema';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  getAllProductsSubject  = new BehaviorSubject([]);
  getProductSubject  = new BehaviorSubject({});
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
  getProducts( ){
    this.http.get<ProductSchema[]>(`${this.baseURL}/api/products/`,this.httpOptions).subscribe((products:any)=>{
      this.getAllProductsSubject.next(products);

    })
    return this.getAllProductsSubject.asObservable()
}
getProduct(id:string){
  console.log(id);

  this.http.get<ProductSchema>(`${this.baseURL}/api/products/find/${id}`,this.httpOptions).subscribe((product:any)=>{
    this.getProductSubject.next(product)
    console.log(product);


  })
  return this.getProductSubject.asObservable()
}
updateProduct(product:ProductSchema,id:string){
 

  this.http.put<ProductSchema>(`${this.baseURL}/api/products/${id}`,product,this.httpOptions).subscribe((val)=>{
    console.log(val);

  })

}
}

