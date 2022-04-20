import { Location } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { UserDetail } from 'src/app/Interfaces/user-detail';
import { RegisterService } from 'src/app/Services/register.service';
import { ToastService } from 'src/app/Services/toast.service';


@Component({
  selector: 'app-user-update-my-dasboard-form',
  templateUrl: './user-update-my-dasboard-form.component.html',
  styleUrls: ['./user-update-my-dasboard-form.component.scss']
})
export class UserUpdateMyDasboardFormComponent implements OnInit {
  user!:Observable< UserDetail
   |any>;
   updateForm!:FormGroup

  constructor(
    private location: Location,
    private registerService:RegisterService,
    private formBuilder:FormBuilder,
    private toast:ToastService
  ) {
  }

  ngOnInit(): void {
    this.user = of(this.location.getState())
    this.user.subscribe((user: any)=>{
      if(user.username === undefined){
       this.user =  this.registerService.getCurrentUser()
      }
    })
    this.user.subscribe((user:any)=>{
      if(user !== undefined){
        console.log(user);

        this.updateForm = this.formBuilder.group({
          username:[user.username,[Validators.required]],
          firstname:[user.firstname,[Validators.required]],
          lastname:[user.lastname,[Validators.required]],
          email:[user.email,[Validators.required]],
          password:['',[Validators.required]]
        })
      }
    })

  }

  updateUser(){
    if(this.updateForm.valid){
      this.user.pipe(take(1)).subscribe((user)=>{
        const updateduser = {...user,...this.updateForm.value}

        this.registerService.updateCurrentUser(updateduser).subscribe((UpdatedUser:any)=>{
          this.registerService.updateCurrentUser(UpdatedUser);
        setTimeout(() => {
          this.toast.hide()
        }, 2000);
        this.toast.show("Your information Has been saved",false,"red")
        })

      })
    }
    if(this.updateForm.controls['password'].value === ''){
      setTimeout(() => {
        this.toast.hide()
      }, 3000);
        this.toast.show("Please Enter Your password to Update your information",false,"#ff3f6c")
    }

  }

}
