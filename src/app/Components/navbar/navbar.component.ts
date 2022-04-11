import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userLoggedIn!:boolean

  constructor(private registerService:RegisterService) {
    this.userLoggedIn = !!sessionStorage.getItem('accessToken')
    console.log(this.userLoggedIn);

   }

  ngOnInit(): void {
  }
  handleCart(){
      this.registerService.getCartDetails()
  }

}
