import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUser } from 'src/app/Interfaces/new-user';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-user-from-register',
  templateUrl: './user-from-register.component.html',
  styleUrls: ['./user-from-register.component.scss']
})
export class UserFromRegisterComponent implements OnInit {
  showHidePasword: boolean = false
  showHideConfirmPasword: boolean = false
  registerForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(9)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(3)]],
      tac: [false, Validators.required]
    })
  }

  registerUser() {
    const user = this.registerForm.value
    const tac = this.registerForm.controls['tac'].value


    if (this.registerForm.valid && user.confirmpassword === user.password) {
      const newUser: NewUser = {
        lastname:user.lastname,
        firstname:user.firstname,
        username: user.username,
        password: user.password,
        email: user.email,
        isAdmin: user.tac
      }
      this.registerService.onUserRegister(newUser)
    }

  }
  togglePassword(event: any) {
    event.type == 'password' ? event.type = 'text' : event.type = 'password'
    event.name === 'password'?this.showHidePasword = !this.showHidePasword: this.showHidePasword = this.showHidePasword
    event.name === 'confirmpassword'?this.showHideConfirmPasword = !this.showHideConfirmPasword: this.showHideConfirmPasword = this.showHideConfirmPasword
  }
}
