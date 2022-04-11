import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { LoginUser } from '../Interfaces/login-user';
import { NewUser } from '../Interfaces/new-user';

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


  constructor(private http: HttpClient, private router: Router) { }




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
  }


  createNewCart(newHTTPoptions: any) {
    console.log('called');

    this.http.post(this.cartURL, newHTTPoptions).subscribe((cart) => {
      console.log(cart);
      console.log('hello');

    })
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



  checkIfCartExistforUser() {
    this.hasCart
    try {
      const token = sessionStorage.getItem('accessToken');
      if (!token) {
        throw Error
      }
      const newHTTPoptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        })
      }
      this.getUserWithAccessTokenFromApi()
      this.currentUserSubject.subscribe((user: any) => {

        console.log(typeof user);

        if (!(user.id === undefined)) {

          this.http.get(`${this.cartURL}/find/${user.id}`, newHTTPoptions).subscribe({
            next: (val: any) => {
              this.cartSubject.next(val)

            },
            error: (err) => {
              if (err.error.userHasNoCart) {
                this.hasCart.next({ before: false, after: false })
                return
              }

            }
          })
        }
      })
    }
    catch (error) {
      this.router.navigate(['login'])
    }

    return this.hasCart

  }
  getCartDetails(){
    const token  = sessionStorage.getItem('accessToken')
    const newHTTPoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      })
    }
    this.getUserWithAccessTokenFromApi()
    this.currentUserSubject.subscribe((user:any)=>{
      const id = user.id
      console.log(id);

    this.http.get(`${this.cartURL}/find/${id}`,newHTTPoptions).subscribe((cart)=>{
      console.log(cart);

    })
    })
  }

  // createNewCartForNewUser() {
  //   if (this.checkIfCartExistforUser !== undefined) {
  //     this.checkIfCartExistforUser().pipe(take(1)).subscribe((val) => {
  //       if (!val.after) {
  //         const token = sessionStorage.getItem('accessToken')
  //         console.log(token);

  //         const newHTTPoptions = {
  //           headers: new HttpHeaders({
  //             'Content-Type': 'application/json',
  //             'authorization': `Bearer ${token}`
  //           })
  //         }
  //         console.log( `Bearer ${token}`,this.user);


  //         this.http.post(`${this.cartURL}`,this.user,newHTTPoptions).subscribe((cart)=>{
  //           console.log(cart);
  //           this.cartSubject.next(cart)

  //         })

  //       }
  //     })
  //   }
  //     this.cartSubject.subscribe((cart)=>{
  //       console.log(cart);

  //     })
  // }

  onUserRegister(newUser: NewUser) {
    this.http.post<NewUser>(this.registerURL, newUser, this.httpOptions).subscribe((data: any) => {
      this.currentUserSubject.next(data)
      sessionStorage.setItem('accessToken', data.accessToken)
      const token = sessionStorage.getItem('accessToken')
      console.log(token);

      const newHTTPoptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        })
      }
      this.getUserWithAccessTokenFromApi()
      const id = data._id


      this.http.post(`${this.cartURL}`,{id},newHTTPoptions).subscribe((cart)=>{
        console.log(cart);
        this.cartSubject.next(cart)

      })
      this.router.navigate([''])
    })
  }
}
