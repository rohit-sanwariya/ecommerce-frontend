import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartSchema } from 'src/app/Interfaces/cart-schema';

import { RegisterService } from 'src/app/Services/register.service';

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

  constructor(private registerService:RegisterService,private router:Router,private route:ActivatedRoute) {
    this.userLoggedIn = !!sessionStorage.getItem('accessToken')
    this.cart$ = this.registerService.getCartDetails()
    this.user$ = this.registerService.getCurrentUser()
    this.showSearch = !this.hideSearchOnURL.includes(this.router.url)








   }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.removeItem('accessToken')
    window.location.reload()
  }


}
