import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUser } from 'src/app/Interfaces/new-user';
import { RegisterService } from 'src/app/Services/register.service';
@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  registerForm!:FormGroup

  constructor(private formBuilder:FormBuilder,private registerService:RegisterService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname:['',[Validators.required,Validators.minLength(3)]],
      lastname:['',[Validators.required,Validators.minLength(3)]],
      username:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email,Validators.minLength(9)]],
      password:['',[Validators.required,Validators.minLength(3)]],
      confirmpassword:['',[Validators.required,Validators.minLength(3)]],
      tac:[false,Validators.required]
    })
  }

  registerUser(){
    const  user = this.registerForm.value

     if(this.registerForm.valid && user.confirmpassword === user.password){


      const tac = this.registerForm.controls['tac'].value
      console.log(tac);

       const newUser:NewUser = {
         username:user.username,
         password:user.password,
         email:user.email,
         isAdmin:false
       }
       console.log(newUser);

       this.registerService.onUserRegister(newUser)
     }

  }

}
