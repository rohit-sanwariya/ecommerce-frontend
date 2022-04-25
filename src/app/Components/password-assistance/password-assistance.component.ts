import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, Subscription } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-password-assitance',
  templateUrl: './password-assistance.component.html',
  styleUrls: ['./password-assistance.component.scss']
})
export class PasswordAssitanceComponent implements OnInit,OnDestroy {
  emailForm!:FormGroup
  subSink:Subscription = new Subscription()
  findEmailURL = `http://localhost:5000/api/users/find`
  constructor(
    private http:HttpClient,
    private toast:ToastService,

    private router:Router,
    private login:LoginService,
    ) { }
  ngOnDestroy(): void {
    this.subSink.unsubscribe()
  }

  ngOnInit(): void {
      this.emailForm = new FormGroup({
        email:new FormControl('',[Validators.required,Validators.email])
      })
  }

  checkIfUserExists(){
   if(this.emailForm.valid){
      const email = this.emailForm.value.email
      this.subSink.add(
        this.http.get(`${this.findEmailURL}/${email}`).
        pipe(catchError((err:any,caught:any)=>of(err))).
        subscribe((exist)=>{
          try {
            if(exist instanceof HttpErrorResponse){

                throw exist
            }
            else{
              console.log(exist);
              this.login.setConfirmScreenSubject(true)
              this.router.navigate(['','confirmscreen'],{state:exist})
            }
          } catch (error:any) {

               this.toast.show(error.error,false,'red')



          }



        })
      )

   }


  }

}
