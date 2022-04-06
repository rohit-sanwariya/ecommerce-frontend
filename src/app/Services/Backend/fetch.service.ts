import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductSchema } from 'src/assets/Images';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  baseURL = 'http://localhost:5000'
  getAllProductsSubject  = new BehaviorSubject([]);
  getProductSubject  = new BehaviorSubject({});
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',

    })
  }
  constructor(
    private http:HttpClient

  ) { }

  getProducts( ){


      this.http.get<ProductSchema[]>(`${this.baseURL}/api/products/`,this.httpOptions).subscribe((products:any)=>{
        this.getAllProductsSubject.next(products)

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
}
