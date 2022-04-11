import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { ProductSchema } from 'src/assets/Images';

@Injectable({
  providedIn: 'root'
})
export class FetchService implements OnInit {
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
  ngOnInit(): void {

  }

  getProducts( ){
      this.http.get<ProductSchema[]>(`${this.baseURL}/api/products/`,this.httpOptions).subscribe((products:any)=>{
        this.getAllProductsSubject.next(products)

      })
      return this.getAllProductsSubject.asObservable()
  }
  getProduct(id:string){

    this.http.get<ProductSchema>(`${this.baseURL}/api/products/find/${id}`,this.httpOptions).pipe(take(1)).subscribe((product:any)=>{
      this.getProductSubject.next(product)
    })
    return this.getProductSubject.asObservable()
  }
}
