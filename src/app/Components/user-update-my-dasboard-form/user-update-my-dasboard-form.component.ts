import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { catchError, Observable, of, take } from 'rxjs';
import { UserDetail } from 'src/app/Interfaces/user-detail';
import { EmailService } from 'src/app/Services/email.service';
import { RegisterService } from 'src/app/Services/register.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-user-update-my-dasboard-form',
  templateUrl: './user-update-my-dasboard-form.component.html',
  styleUrls: ['./user-update-my-dasboard-form.component.scss'],
})
export class UserUpdateMyDasboardFormComponent implements OnInit {
  showModal: boolean = false;
  user!: Observable<UserDetail | any>;
  updateForm!: FormGroup;
  modalForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  currentUser: any;
  optApi!: number;
  showPasswordModal: boolean = true;

  constructor(
    private location: Location,
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private emailService: EmailService
  ) { }

  ngOnInit(): void {
    this.user = of(this.location.getState());
    this.user.subscribe((user: any) => {
      if (user.username === undefined) {
        this.user = this.registerService.getCurrentUser();
      }
    });
    this.user.subscribe((user: any) => {
      if (user !== undefined) {
        this.currentUser = user;

        this.updateForm = this.formBuilder.group({
          username: [user.username, [Validators.required]],
          firstname: [user.firstname, [Validators.required]],
          lastname: [user.lastname, [Validators.required]],
          email: [user.email, [Validators.required]],
          password: ['', [Validators.required]],
        });
      }
    });
    this.resetPasswordForm = this.formBuilder.group({
      // oldPassword:['',[Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
    this.modalForm = this.formBuilder.group({
      d1: ['', [Validators.required, Validators.maxLength(1)]],
      d2: ['', [Validators.required, Validators.maxLength(1)]],
      d3: ['', [Validators.required, Validators.maxLength(1)]],
      d4: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }
  togglePassword(input: HTMLInputElement, event: any) {
    console.log(input.type);
    console.log(event.target.innerText);
    input.type === 'password' ?
      input.type = 'text' :
      input.type = 'password';
    event.target.innerText = event.target.innerText === 'visibility' ?
      'visibility_off' : 'visibility';
  }
  closeModal() {
    this.showModal = false;
    this.showPasswordModal = false
  }

  clearFocusNext(event: any, inputArray: HTMLInputElement[], index: number) {
    const current = inputArray[index];
    const next = index < inputArray.length - 1 ? inputArray[index + 1] : null;
    if (next) {
      current.value = event.data;
      next.value = '';
      next.focus();
    } else if (index === inputArray.length - 1) {
      if (current.value.length > 1) {
        current.value = event.data;
      } else {
        current.value = current.value;
      }
    }
  }

  showVerifyModal() {
    this.showModal = true;
    this.registerService.getOtpFromApi().subscribe((otp: any) => {
      this.optApi = Number(otp.otp);
      console.log(this.optApi);

      const templateParams = {
        from_name: 'Mantra OTP Password Recovery',
        to_name: this.currentUser.username,
        message: `Your OTP is ${this.optApi}`,
        reply_to: this.currentUser.email,
      };
      // this.emailService.sendEmail(templateParams)
    });
  }

  checkOTPPassword() {
    if (this.modalForm.valid) {
      const otpUserEntered = Number(Object.values(this.modalForm.value).join(''));
      console.log(otpUserEntered);
      if (otpUserEntered === this.optApi) {
        this.showPasswordModal = true
        console.log(otpUserEntered);

      }
    }
  }

  changePassword() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.controls['newPassword'].value
      // const oldPassword = this.resetPasswordForm.controls['oldPassword'].value
      const confirmPassword = this.resetPasswordForm.controls['confirmPassword'].value
      if (confirmPassword === newPassword) {
        this.registerService.changeUserPassword({ newPassword }).pipe(catchError((err:any,caught:any)=>{
          return of(err)
        })).subscribe((user) => {

            if (user instanceof HttpErrorResponse && user.status === 405) {
              this.toast.show("Your New PassWord Can not be same as Current Password!", false, "#fff")
              this.showPasswordModal = true;
              this.showModal = false;

            }
            else if(user !== this.currentUser) {
              this.toast.show("Your password was set successfully", false, "#B00020")
              this.showPasswordModal = false;
              this.showModal = false;
            }


        })
      }
      else {
        this.toast.show("confirm and pass don't match ", false, "#fff")
      }
    }

  }
  updateUser() {
    if (this.updateForm.valid) {
      this.user.pipe(take(1)).subscribe((user) => {
        const updateduser = { ...user, ...this.updateForm.value };

        this.registerService
          .updateCurrentUser(updateduser)
          .subscribe((UpdatedUser: any) => {
            this.registerService.updateCurrentUser(UpdatedUser);
            setTimeout(() => {
              this.toast.hide();
            }, 2000);
            this.toast.show('Your information Has been saved', false, 'red');
          });
      });
    }
    if (this.updateForm.controls['password'].value === '') {
      setTimeout(() => {
        this.toast.hide();
      }, 3000);
      this.toast.show(
        'Please Enter Your password to Update your information',
        false,
        '#ff3f6c'
      );
    }
  }
}
