import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { CartSchema } from '../Interfaces/cart-schema';
import { LoginUser } from '../Interfaces/login-user';
import { NewUser } from '../Interfaces/new-user';
import { ProductSchema } from '../Interfaces/product-schema';

@Injectable({
  providedIn: 'root'
})
export class RegisterService implements OnInit {
  cartSubject = new BehaviorSubject({})
  hasCart = new BehaviorSubject({ before: false, after: true })
  baseURL: string = `http://localhost:5000`
  cartURL: string = `http://localhost:5000/api/cart`
  loginURL: string = 'http://localhost:5000/api/auth/login'
  loginSubject = new BehaviorSubject({})
  currentUserSubject = new BehaviorSubject({});
  user!: any
  registerURL: string = "http://localhost:5000/api/auth/register"
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    )
  }
  newHTTPoptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
    })
  }


  constructor(private http: HttpClient, private router: Router) {

  }




  loginUser(user: LoginUser): Observable<boolean> {

    this.http.post<LoginUser>(this.loginURL, user, this.httpOptions).subscribe((res: any) => {
      this.currentUserSubject.next(res)
      this.loginSubject.next(res.isAdmin)
      if (res.isAdmin) {
        sessionStorage.setItem('accessToken', res.accessToken)
      }
      else {
        sessionStorage.setItem('accessToken', res.accessToken)
      }
      this.router.navigate([''])

    })
    return this.loginSubject.asObservable() as Observable<boolean>;
  }
  ngOnInit(): void {
    this.getUserWithAccessTokenFromApi()
    this.currentUserSubject.subscribe((user) => {
      this.user = user
    })
    this.getCartProducts()
  }




  getUserWithAccessTokenFromApi() {
    const token = sessionStorage.getItem('accessToken')
    const newHTTPoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      })
    }
    this.http.get(`${this.baseURL}/api/users/single`, newHTTPoptions).subscribe((user: any) => {
      this.currentUserSubject.next(user)
      this.user = user
    })
  }






  getCartDetails() {
    const token = sessionStorage.getItem('accessToken')
    const newHTTPoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      })
    }
    this.getUserWithAccessTokenFromApi()
    this.currentUserSubject.pipe(take(2)).subscribe((user: any) => {
      const id = user.id

      if (!!id) {
        this.http.get<CartSchema>(`${this.cartURL}/find/${id}`, newHTTPoptions).subscribe((cart) => {
          this.cartSubject.next(cart)
        })
      }
    })
    return this.cartSubject.asObservable() as Observable<CartSchema>

  }

  addProductToCart(product: ProductSchema, quantity: number, incrment: number) {
    this.getCartDetails()
    this.cartSubject.pipe(take(1)).subscribe((cart: any) => {
      if (Object.keys(cart).length !== 0) {

        const found = cart.products.findIndex((productincart: any) => {
          if (productincart.productId === product._id) {
            return productincart
          }
        })
        if (found === -1) { cart.products.push({ productId: product._id, quantity: 1 }); }
        else {
          cart.products[found].quantity = quantity + incrment
        }
        this.http.put(`${this.cartURL}/${this.user.id}`, cart, this.newHTTPoptions).subscribe((updatedCart) => {
          this.cartSubject.next(updatedCart)
          window.location.reload()
        })
      }

    })
  }
  deleteProductFromCart(product: any) {
    this.cartSubject.pipe(take(2)).subscribe((cart: any) => {
      if (Object.keys(cart).length > 0) {
        const newCartProducts = cart.products.filter((cartProduct: any) => {
          if (product._id !== cartProduct.productId)
            return cartProduct
        })
        cart.products = newCartProducts
        console.log(newCartProducts);
        this.http.put(`${this.cartURL}/removeProduct/${this.user.id}`, cart, this.newHTTPoptions)
        .subscribe((updatedCart) => {
          console.log(updatedCart);
          this.cartSubject.next(updatedCart)
          window.location.reload()
        })
      }
    })

  }
  onUserRegister(newUser: NewUser) {
    this.http.post<NewUser>(this.registerURL, newUser, this.httpOptions).subscribe((data: any) => {
      this.currentUserSubject.next(data)
      sessionStorage.setItem('accessToken', data.accessToken)
      const token = sessionStorage.getItem('accessToken')
      const newHTTPoptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        })
      }
      this.getUserWithAccessTokenFromApi()
      const id = data._id
      this.http.post(`${this.cartURL}`, { id }, newHTTPoptions).subscribe((cart) => {
        this.cartSubject.next(cart)
      })
      this.router.navigate([''])
    })
  }
  getCartProducts(){
    this.cartSubject.pipe(map((cart:any)=>cart.products)).subscribe((cart)=>{
      console.log(cart);

    })
  }
}
