import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartSchema } from 'src/app/Interfaces/cart-schema';

import { RegisterService } from 'src/app/Services/register.service';
import { LoginUserSchema } from 'src/app/Store/Login/login.actions';
import { loginStateSchema } from 'src/app/Store/Login/login.reducers';
import { getUserApiStart } from 'src/app/Store/User/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userLoggedIn!:boolean
  showSearch:boolean = true;
  hideSearchOnURL = [
    '/cart','/my','/success','/my/orders',
    '/my/user/address','/my/user/profile',
    '/my/user/cash','/my/legal'
  ]
  cart$!:Observable<CartSchema>
  user$!:Observable<any>

  constructor(
    private registerService:RegisterService,
    private router:Router,
    private route:ActivatedRoute,
    private store:Store<{'user':LoginUserSchema}>,
    private loginstore:Store<{'login':loginStateSchema}>,
    ) {
    this.userLoggedIn = !!sessionStorage.getItem('accessToken')
    this.cart$ = this.registerService.getCartDetails()
    this.user$ = this.registerService.getCurrentUser()
    this.showSearch = !this.hideSearchOnURL.includes(this.router.url)
      if(this.userLoggedIn){


        this.store.dispatch(getUserApiStart())
      }

this.store.select('user').subscribe(
  

)





   }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.removeItem('accessToken')
    window.location.reload()
  }


}
