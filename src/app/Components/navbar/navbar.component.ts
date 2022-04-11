import { Component, OnInit } from '@angular/core';
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
  cart$!:Observable<CartSchema>

  constructor(private registerService:RegisterService) {
    this.userLoggedIn = !!sessionStorage.getItem('accessToken')
    this.cart$ = this.registerService.getCartDetails()


   }

  ngOnInit(): void {
  }
  

}
