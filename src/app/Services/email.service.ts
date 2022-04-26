import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  otpURL:string = `http://localhost:5000/api/verifyEmail`
  constructor() { }

  public sendEmail(templateParams: any) {


    emailjs.send('service_2ta5ozj',"template_if6dsfw", templateParams, 'bzJ7Z723pMcvFxyuy')
      .then((result: EmailJSResponseStatus) => {

      }, (error) => {

      });
  }
}
