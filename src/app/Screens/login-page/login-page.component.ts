import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of, Subscription } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';
import { RegisterService } from 'src/app/Services/register.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit,OnDestroy {
  subsink:Subscription = new Subscription()
  loginForm!:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private loginService:RegisterService,
    private toast:ToastService,

    ) { }
  ngOnDestroy(): void {
      this.subsink.unsubscribe()
  }

  ngOnInit(): void {
    this.loginForm =  this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      tac:[false,[Validators.required]],
    })
  }

  loginUser(){
    const user = this.loginForm.value;

    if(this.loginForm.valid){
         this.subsink.add(
          this.loginService.loginUser(user).pipe(catchError((err:any,caught:any)=>{
            return of(err)
          })).subscribe((err)=>{
            const message:string = "Your Username or password is incorrect";
            this.toast.show(message,false,'red')

          })
         )
    }

  }

}
