import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastService } from './Services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-frontend';
  show!:Observable<{show:boolean,message:string}>;
  constructor(private toastService:ToastService){}

  ngOnInit(): void {
    this.show =   this.toastService.getSubject()
  }
  close(){
    this.toastService.hide()
  }

}
