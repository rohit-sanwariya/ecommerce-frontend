import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductSchema } from '../Interfaces/product-schema';
import { UserSchema } from '../Interfaces/user-schema';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  getAllSubject = new BehaviorSubject([]);
  getProductsByIdsSubject = new BehaviorSubject([]);
  getSubject = new BehaviorSubject({});
  baseURL = 'http://localhost:5000'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
    })
  }
  constructor(
    private http: HttpClient
  ) { }


  getUsers() {
    this.http.get<UserSchema[]>(`${this.baseURL}/api/users/`, this.httpOptions).subscribe((users: any) => {
      this.getAllSubject.next(users);
    })
    return this.getAllSubject.asObservable()
  }
  deleteUser(id: string) {
    this.http.delete<UserSchema[]>(`${this.baseURL}/api/users/${id}`, this.httpOptions).subscribe((user: any) => {

      window.location.reload()

    })

  }
  registerProduct(product: ProductSchema) {


    this.http.post<ProductSchema>(`${this.baseURL}/api/products/`, product, this.httpOptions).subscribe((val) => {


    })
  }
  getProducts() {
    this.http.get<ProductSchema[]>(`${this.baseURL}/api/products/`, this.httpOptions).subscribe((products: any) => {
      this.getAllSubject.next(products);

    })
    return this.getAllSubject.asObservable()
  }
  getProductsByIds(idArray: string[]) {
    const ids = idArray.join(",")
    


    this.http.get<ProductSchema>(`${this.baseURL}/api/products/findbyIds/${ids}`, this.httpOptions).subscribe((product: any) => {
      this.getProductsByIdsSubject.next(product)
    })
    return this.getProductsByIdsSubject.asObservable()
  }
  getProduct(id: string) {


    this.http.get<ProductSchema>(`${this.baseURL}/api/products/find/${id}`, this.httpOptions).subscribe((product: any) => {
      this.getSubject.next(product)



    })
    return this.getSubject.asObservable()
  }
  updateProduct(product: ProductSchema, id: string) {


    this.http.put<ProductSchema>(`${this.baseURL}/api/products/${id}`, product, this.httpOptions).subscribe((val) => {


    })

  }
}

