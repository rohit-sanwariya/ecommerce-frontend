import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message:string = ''
  confirmSubject = new BehaviorSubject(false);
  subject = new BehaviorSubject({show:false,message:''})
  constructor() {

   }
   show(message:string){
     this.subject.next({show:true,message});
   }
   hide(){
     this.subject.next({show:false,message:''});
   }
   setConfirmSubject(confirmation:boolean){
     this.confirmSubject.next(confirmation)
   }
   getSubject(){
     return this.subject.asObservable();
   }
   getConfirmSubject(){
    return this.confirmSubject.asObservable();
   }
}
