import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { RegisterService } from 'src/app/Services/register.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-reenter-password',
  templateUrl: './reenter-password.component.html',
  styleUrls: ['./reenter-password.component.scss']
})
export class ReenterPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup
  currentUser: any
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private toast: ToastService,
    private router: Router
  ) {
    this.currentUser = this.router.getCurrentNavigation()?.extras.state

  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })


  }
  togglePassword(input: HTMLInputElement, event: any) {


    input.type === 'password' ?
      input.type = 'text' :
      input.type = 'password';
    event.target.innerText = event.target.innerText === 'visibility' ?
      'visibility_off' : 'visibility';
  }

  changePassword() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.controls['newPassword'].value
      // const oldPassword = this.resetPasswordForm.controls['oldPassword'].value
      const confirmPassword = this.resetPasswordForm.controls['confirmPassword'].value
      if (confirmPassword === newPassword) {
        this.registerService.changeUserPassword({ newPassword }, this.currentUser, false).pipe(catchError((err: any, caught: any) => {
          return of(err)
        })).subscribe((user) => {

          if (user instanceof HttpErrorResponse && user.status === 405) {
            this.toast.show("Your New PassWord Can not be same as Current Password!", false, "#fff")

            this.resetPasswordForm.reset()

          }
          else if (user !== this.currentUser) {
            const hideTimer = setTimeout(() => {
              this.toast.hide()
              this.router.navigate(['','login'])
              clearTimeout(hideTimer)
            }, 1500);
            this.toast.show("Your password was set successfully", false, "#fff")

          }


        })
      }
      else {
        this.toast.show("confirm and pass don't match ", false, "#fff")
      }
    }

  }

}
