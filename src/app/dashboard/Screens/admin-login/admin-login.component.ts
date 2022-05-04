import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginUser } from 'src/app/Interfaces/login-user';
import { LoginService } from 'src/app/Services/login.service';
import { RegisterService } from 'src/app/Services/register.service';
import { ToastService } from 'src/app/Services/toast.service';
import { loginStart } from 'src/app/Store/Login/login.actions';
import { loginStateSchema } from 'src/app/Store/Login/login.reducers';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm!:FormGroup
  isAdmin!:boolean
  constructor(
    private formBuilder:FormBuilder,
    private toastService:ToastService,
    private service:RegisterService,
    private store:Store<{login:loginStateSchema}>,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.adminLoginForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      tac:[false,[Validators.required]]
    })
  }

  loginAdmin(){

     if(this.adminLoginForm.valid){
          const {tac,...user} =  this.adminLoginForm.value
          this.store.dispatch(loginStart(user))
          // this.service.loginUser(user).subscribe((isAdmin:boolean)=>{
          //   this.isAdmin = isAdmin;


          //   if(this.isAdmin){
          //     this.router.navigate(['admin','dashboard'])


          //   }
          //   else{
          //     setTimeout(()=>{
          //       this.toastService.hide()

          //     },2000)
          //     this.toastService.show("Admin Only Access",false,"fff")
          //   }
          // })




     }

  }

}
