import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginForm =  this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      tac:[false,[Validators.required]],
    })
  }

  loginUser(){
    console.log(this.loginForm.controls['tac'].value);

    if(this.loginForm.valid && this.loginForm.controls['tac'].value){
      console.log('you won baby');

    }

  }

}
