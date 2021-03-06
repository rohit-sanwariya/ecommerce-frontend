import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { log, timeStamp } from 'console';

import {
  BehaviorSubject,
  catchError,
  concat,
  concatMap,
  EMPTY,
  map,
  mergeMap,
  Observable,
  of,
  Subscription,
  take,

} from 'rxjs';

import { CartSchema } from '../Interfaces/cart-schema';
import { LoginUser } from '../Interfaces/login-user';
import { NewUser } from '../Interfaces/new-user';

import { addProduct, updateProductWishlistStart  } from '../Store/Wishlist/wishlist.actions';
import { initialState, WishlistSchema } from '../Store/Wishlist/wishlist.reducers';

import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService implements OnInit, OnDestroy {
  subSink = new Subscription();
  wishlistSubject: BehaviorSubject<WishlistSchema> = new BehaviorSubject(initialState)
  wishlist$!: Observable<WishlistSchema>;
  tempUserSubject = new BehaviorSubject([]);
  otpURL: string = `http://localhost:5000/api/verifyEmail`;
  ordersSubject = new BehaviorSubject([]);
  cartTotal = new BehaviorSubject(0);
  cartProductsIds = new BehaviorSubject([]);
  cartProducts = new BehaviorSubject([]);
  cartSubject = new BehaviorSubject({});
  hasCart = new BehaviorSubject({ before: false, after: true });
  baseURL: string = `http://localhost:5000`;
  cartURL: string = `http://localhost:5000/api/cart`;
  loginURL: string = 'http://localhost:5000/api/auth/login';
  loginSubject = new BehaviorSubject({});
  currentUserSubject = new BehaviorSubject({});
  user!: any;
  registerURL: string = 'http://localhost:5000/api/auth/register';
  addressSubject = new BehaviorSubject({});
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  selectUserAddressShipping = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private router: Router,
    private ProductService: AdminService,
    private store: Store<{ wishlist: WishlistSchema }>,

  ) {
    this.wishlist$ = this.store.select('wishlist')

  }
  ngOnDestroy(): void {
    this.subSink.unsubscribe()
  }
  ngOnInit(): void {

    if (this.user === undefined) {
      this.getUserWithAccessTokenFromApi();
    }
    this.subSink.add(
      this.currentUserSubject.subscribe((user) => {
        this.user = user;
      })
    );
  }


  getCartProductIds() {
    // this.getCartDetails()
    this.subSink.add(
      this.cartSubject.pipe(take(2)).subscribe((cart: any) => {
        if (Object.keys(cart).length > 0) {
          const ids = cart.products.map((product: any) => {
            return product.productId;
          });

          this.cartProductsIds.next(ids);
        }
      })
    )
    return this.cartProductsIds.asObservable();
  }

  getOtpFromApi() {
    return this.http.get(this.otpURL, );
  }
  setOrders(order: any) {
    this.ordersSubject.next(order);
  }


  getAllOrderFromApiByAdmin(){
    return this.http.get(`${this.baseURL}/api/orders/`);
  }

  getCurrentIncomeByAdminFromAPI(){
    return this.http.get(`${this.baseURL}/api/orders/income`);
  }
  getAllOrdersByAdmin(){

    return concat(
      this.getUserWithAccessTokenFromApi(),
      this.getAllOrderFromApiByAdmin()
    )

  }
  getCurrentIncomeByAdmin(){

    return concat(
      this.getUserWithAccessTokenFromApi(),
      this.getCurrentIncomeByAdminFromAPI()
    )

  }
  getOrder() {
    return this.ordersSubject.asObservable();
  }
  getCartProducts() {
    this.getCartProductIds();
    this.subSink.add(this.cartProductsIds.pipe(take(1)).subscribe((ids) => {
      if (ids.length > 0) {
        this.ProductService.getProductsByIds(ids).subscribe((products) => {
          if (products.length > 0) {
            this.cartProducts.next(products);
          }
        });
      }
    }))
    return this.cartProducts.asObservable();
  }



  changeUserPassword(passwords: any, user: any, hasToken: boolean) {

    const url = hasToken ? `http://localhost:5000/api/users/updatePassword/${user._id}` : `http://localhost:5000/api/users/forgot/${user._id}`
    if (user._id) {

      const body = { newPassword: passwords.newPassword, ...user };
      this.subSink.add(this.http
        .put(url, body, )
        .pipe(
          catchError((err: any, caught: any) => {
            return of(err);
          })
        )
        .subscribe({
          next: (updatedUser) => {

            this.tempUserSubject.next(updatedUser);
          },
          error: (err: Error) => {

          },
        }))
    }
    else {

    }
    return this.tempUserSubject.asObservable();


  }

  // calCartTotal() {
  //   this.getCartProducts();
  //   this.subSink.add(
  //     this.cartSubject
  //       .pipe(
  //         take(1),
  //         map((cart: any) => cart.products)
  //       )
  //       .subscribe((cartProducts: any) => {
  //         const productsWithoutPrice = cartProducts;

  //         this.cartProducts.pipe(take(2)).subscribe((products: any) => {
  //           const productsWithPrice = products;
  //           if (productsWithPrice.length > 0 && productsWithoutPrice.length > 0) {
  //             let cartTotal = 0;
  //             productsWithPrice.forEach((withPrice: any) => {
  //               const found = productsWithoutPrice.find(
  //                 (p: any) => p.productId === withPrice._id
  //               );
  //               const quantity = found.quantity;
  //               const price = withPrice.price;
  //               cartTotal += quantity * price;
  //             });
  //             this.cartTotal.next(cartTotal);
  //           }
  //         });
  //       })
  //   )
  //   return this.cartTotal.asObservable();
  // }

  addUserAddress(userForm: any) {
    this.getUserWithAccessTokenFromApi();
    this.subSink.add(
      this.currentUserSubject.pipe(take(1)).subscribe((user: any) => {
        if (Object.keys(user).length > 0) {
          const body = {
            id: user._id,
            addresses: [userForm],
          };


          this.subSink.add(
            this.http
              .post(
                `${this.baseURL}/api/address/${body.id}`,
                body,

              )
              .subscribe((address: any) => {
                this.addressSubject.next(address);
              })
          )
          return;
        }
      })
    )
    return this.addressSubject.asObservable();
  }
  appendNewAddress(userForm: any) {
    this.getUserWithAccessTokenFromApi();
    this.subSink.add(
      this.currentUserSubject.pipe(take(1)).subscribe((user: any) => {
        if (Object.keys(user).length > 0) {


          this.subSink.add(
            this.http
              .put(
                `${this.baseURL}/api/address/${userForm.id}`,
                userForm,

              )
              .subscribe((address: any) => {
                this.addressSubject.next(address);
              })
          )
          return;
        }
      })
    )
    return this.addressSubject.asObservable();
  }
  editUserAddress(userForm: any) {


    this.subSink.add(
      this.http
        .put(
          `${this.baseURL}/api/address/${userForm.id}`,
          userForm,

        )
        .subscribe((address: any) => {
          this.addressSubject.next(address);
        })
    )

    return this.addressSubject.asObservable();
  }
  removeUserSelectedAddress(address: any) {
    this.subSink.add(
      this.http
        .put(
          `${this.baseURL}/api/address/${address.id}`,
          address,

        )
        .subscribe((address: any) => {
          this.addressSubject.next(address);
        })
    )
    return this.addressSubject.asObservable();
  }
  getUserAddress() {
    this.getUserWithAccessTokenFromApi();
    this.subSink.add(
      this.currentUserSubject.pipe(take(2)).subscribe((user: any) => {
        if (Object.keys(user).length > 0) {
          this.http
            .get(`${this.baseURL}/api/address/${user._id}`, )
            .subscribe({
              next: (address: any) => {
                try {
                  if (address == null) {
                    throw Error;
                  } else {
                    this.addressSubject.next(address);
                  }
                } catch (error) {
                  //
                  // this.router.navigate([''])
                }
              },
              error: (error) => {
                this.router.navigate(['']);
              },
            });
        }
      })
    )

    return this.addressSubject.asObservable();
  }

  setUserAddress(address: any) { }
  getSelectedUserAddressShipping() {
    return this.selectUserAddressShipping.asObservable();
  }
  setSelectedUserAddressShipping(address: any) {
    this.selectUserAddressShipping.next(address);
  }

  clearCart(cart: any) {
    cart.products = [];
    this.subSink.add(
      this.http
        .put(`${this.cartURL}/${this.user._id}`, cart,
         )
        .subscribe((updatedCart) => {
          this.cartSubject.next(updatedCart);
          // window.location.reload()
        })
    )
  }

  loginUser(user: LoginUser): Observable<boolean> {
    this.subSink.add(
      this.http
        .post<LoginUser>(this.loginURL, user)
        .subscribe((res: any) => {
          this.currentUserSubject.next(res);
          this.loginSubject.next(res.isAdmin);
          if (res.isAdmin) {
            sessionStorage.setItem('accessToken', res.accessToken);
          } else {
            sessionStorage.setItem('accessToken', res.accessToken);
          }
          this.router.navigate(['']);
        })
    )
    return this.loginSubject.asObservable() as Observable<boolean>;
  }

  getUserWithAccessTokenFromApi() {
    const currentUser$: Observable<any> = this.http
      .get(`${this.baseURL}/api/users/single`)
      if(sessionStorage.getItem('accessToken')){



currentUser$.subscribe((user: any) => {
  this.currentUserSubject.next(user);
  this.user = user;
})
      }

      return currentUser$ ? currentUser$ : EMPTY;


  }

  getCartDetails() {
    const token = sessionStorage.getItem('accessToken');

    this.getUserWithAccessTokenFromApi();
    this.subSink.add(
      this.currentUserSubject.pipe(take(2)).subscribe((user: any) => {
        const id = user._id;
        if (!!id) {
          this.subSink.add(
            this.http
              .get<CartSchema>(`${this.cartURL}/find/${id}`  )
              .subscribe((cart) => {
                this.cartSubject.next(cart);
              })
          )
        }
      })
    )
    return this.cartSubject.asObservable() as Observable<CartSchema>;
  }

  // addProductToCart(product: ProductSchema, quantity: number, incrment: number) {
  //   this.getCartDetails();
  //   this.subSink.add(
  //     this.cartSubject.pipe(take(1)).subscribe((cart: any) => {
  //       if (Object.keys(cart).length !== 0) {
  //         const found = cart.products.findIndex((productincart: any) => {
  //           if (productincart.productId === product._id) {
  //             return productincart;
  //           }
  //         });
  //         if (found === -1) {
  //           cart.products.push({ productId: product._id, quantity: 1 });
  //         } else {
  //           cart.products[found].quantity = quantity + incrment;
  //         }
  //         this.subSink.add(
  //           this.http
  //             .put(`${this.cartURL}/${this.user._id}`,
  //             cart, )
  //             .subscribe((updatedCart) => {
  //               this.cartSubject.next(updatedCart);
  //               window.location.reload();
  //             })
  //         )
  //       }
  //     })
  //   )
  // }
  deleteProductFromCart(product: any) {
    this.subSink.add(
      this.cartSubject.pipe(take(2)).subscribe((cart: any) => {
        if (Object.keys(cart).length > 0) {
          const newCartProducts = cart.products.filter((cartProduct: any) => {
            if (product._id !== cartProduct.productId) return cartProduct;
          });
          cart.products = newCartProducts;

          this.subSink.add(
            this.http
              .put(
                `${this.cartURL}/removeProduct/${this.user._id}`,
                cart,

              )
              .subscribe((updatedCart) => {
                this.cartSubject.next(updatedCart);
                // window.location.reload()
              })
          )
        }
      })
    )
  }
  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user)
  }

  updateCurrentUser(user: any) {
    return this.http.put(
      `${this.baseURL}/api/users/${user._id}`,
      user,

    )
  }

  onNewUserRegister(newUser:NewUser){
    this.http
      .post<NewUser>(this.registerURL, newUser).pipe(
        concatMap(
          (newUserFromApi:any)=>{

            sessionStorage.setItem('accessToken',newUserFromApi.accessToken)
            return this.http
            .post<CartSchema>(`${this.cartURL}`, { id:newUserFromApi._id })

          }

        ),
        concatMap(
          (cart:CartSchema)=>{
            const id = cart.id

            const token:string|null = sessionStorage.getItem('accessToken');


            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
              }),
            }
            return this.http.post(`http://localhost:5000/api/wish/${id}`,
            { id, products: [] },httpOptions)

          }
        )
      ).subscribe()
  }
  // onUserRegister(newUser: NewUser) {
  //   this.http
  //     .post<NewUser>(this.registerURL, newUser)
  //     .subscribe((data: any) => {
  //       this.currentUserSubject.next(data);
  //       sessionStorage.setItem('accessToken', data.accessToken);

  //       const id = data._id;
  //       this.subSink.add(
  //         this.http
  //           .post(`${this.cartURL}`, { id })
  //           .subscribe((cart) => {
  //             this.cartSubject.next(cart);
  //           })
  //       )
  //       this.subSink.add(
  //         this.http.post(`http://localhost:5000/api/wish/`,
  //          { id, products: [] }).subscribe()
  //       )
  //       this.router.navigate(['']);
  //     })
  // }

  getUserOrders() {
    let user = {};
    this.getCurrentUser().subscribe((user: any) => {
      if (Object.keys(user).length === 0) return;

      this.subSink.add(this.http
        .get(
          `${this.baseURL}/api/orders/findAll/${user._id}`,

        )
        .subscribe((orders: any) => {
          this.ordersSubject.next(orders);
        }))
    });

    return this.ordersSubject.asObservable();
  }
  getWishlistFromApi(id:string) {
      return concat(
        this.getUserWithAccessTokenFromApi(),
    this.http.get<WishlistSchema>(`http://localhost:5000/api/wish/${id}` )
      )

  }
  loadWishlist(){
      return concat(
        this.getUserWithAccessTokenFromApi(),

      ).subscribe((user)=>{


      })
  }


  addProductToWishlist(productId: string) {
    this.store.select('wishlist').pipe(take(1)).subscribe((wish: any) => {
      const newWishlist = { ...wish, products: [productId, ...wish.products,] }

      this.store.dispatch(addProduct(newWishlist))
      const {loading,type,...newWishlistReq} = newWishlist
      this.http.put<WishlistSchema>(`http://localhost:5000/api/wish/${newWishlistReq.id}`,newWishlistReq, ).subscribe((wishlistUpdate)=>{

        this.wishlistSubject.next(wishlistUpdate)

      })
    })
    return this.wishlistSubject.asObservable()
  }
  removeProductWishlist(productId:string){
    this.store.select('wishlist').pipe(take(1)).subscribe((wish: any) => {
      const newWishlist = { ...wish, products: wish.products.filter((pro:any)=>pro !== productId) }
      this.store.dispatch(updateProductWishlistStart(newWishlist))
      const {loading,type,...newWishlistReq} = newWishlist
      this.http.put<WishlistSchema>(`http://localhost:5000/api/wish/${newWishlistReq.id}`,newWishlistReq ).subscribe((wishlistUpdate)=>{

        this.wishlistSubject.next(wishlistUpdate)

      })
    })
    return this.wishlistSubject.asObservable()
  }
}




