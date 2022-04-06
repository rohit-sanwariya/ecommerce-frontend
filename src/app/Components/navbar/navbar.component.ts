import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userLoggedIn!:boolean

  constructor() {
    this.userLoggedIn = !!sessionStorage.getItem('accessToken')
    console.log(this.userLoggedIn);

   }

  ngOnInit(): void {
  }

}
