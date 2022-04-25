import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { EmailService } from 'src/app/Services/email.service';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-confirm-screen',
  templateUrl: './confirm-screen.component.html',
  styleUrls: ['./confirm-screen.component.scss']
})
export class ConfirmScreenComponent implements OnInit {
  otpForm!:FormGroup;
  subSink:Subscription = new Subscription()
  timeSubscitption:Subscription = new Subscription()
  resendShow:boolean = false
  optApi!:string
  timer:string="00:10"
  currentUser!:any
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private registerService:RegisterService,
    private emailService:EmailService,

    ) {
      this.currentUser = this.router.getCurrentNavigation()?.extras.state

     }

     ngOnDestroy(): void {
      this.subSink.unsubscribe()
      this.timeSubscitption.unsubscribe()
  }

  ngOnInit(): void {
      const timer = interval(1000)

       this.timeSubscitption =  timer.subscribe((val)=>{
          const seconds = Number(this.timer.split(":")[1])
          const current = `0${seconds-1}`
          console.log(current);
          this.timer = `00:${current}`
          if(val===9){
            this.timeSubscitption.unsubscribe()
            this.resendShow = true
          }

        })



    this.otpForm = this.formBuilder.group({
      d1: ['', [Validators.required, Validators.maxLength(1)]],
      d2: ['', [Validators.required, Validators.maxLength(1)]],
      d3: ['', [Validators.required, Validators.maxLength(1)]],
      d4: ['', [Validators.required, Validators.maxLength(1)]],
    });
    this.registerService.getOtpFromApi().subscribe((otp: any) => {
      this.optApi = otp.otp;
      console.log(this.optApi);

      if(this.currentUser){
        const templateParams = {
          from_name: 'Mantra OTP Password Recovery',
          to_name: this.currentUser.username,
          message: `Your OTP is ${this.optApi}`,
          reply_to: this.currentUser.email,
        };
        this.emailService.sendEmail(templateParams)
      }
      else{
          this.router.navigate(['','login'])
      }
    });
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

  checkOTPPassword() {
    if (this.otpForm.valid) {
      const otpUserEntered = Object.values(this.otpForm.value).join('')

      if (otpUserEntered === this.optApi) {
        this.router.navigate(['','reenter-password'],{state:this.currentUser})

        this.otpForm.reset()

      }
    }
  }

  resendOTP(){

    this.subSink.add(
      this.registerService.getOtpFromApi().subscribe((otp: any) => {
        this.optApi = otp.otp;
        console.log(this.optApi);

        if(this.currentUser){
          const templateParams = {
            from_name: 'Mantra OTP Password Recovery',
            to_name: this.currentUser.username,
            message: `Your OTP is ${this.optApi}`,
            reply_to: this.currentUser.email,
          };
          // this.emailService.sendEmail(templateParams)
        }
        else{
            // this.router.navigate(['','login'])
        }
      })
    )
  }


}
