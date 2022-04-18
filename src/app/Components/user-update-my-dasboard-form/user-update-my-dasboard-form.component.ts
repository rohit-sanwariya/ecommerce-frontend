import { Location } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RegisterService } from 'src/app/Services/register.service';


@Component({
  selector: 'app-user-update-my-dasboard-form',
  templateUrl: './user-update-my-dasboard-form.component.html',
  styleUrls: ['./user-update-my-dasboard-form.component.scss']
})
export class UserUpdateMyDasboardFormComponent implements OnInit {
  user!:Observable<{
    username:'',
    firstname:'',
    lastname:'',
    email:'',
  } |any>
  constructor(
    private location: Location,
    private router:Router,
    private registerService:RegisterService
  ) {
  }

  ngOnInit(): void {
    this.user = of(this.location.getState())
    this.user.subscribe((user: any)=>{
      if(user.username === undefined){
       this.user =  this.registerService.getCurrentUser()

      }

    })


    //  if(this.user.username === undefined) this.router.navigate(['','my','user'])





  }

}
