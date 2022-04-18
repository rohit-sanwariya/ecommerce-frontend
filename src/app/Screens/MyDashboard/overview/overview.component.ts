import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit,OnDestroy {
  subscription = new Subscription()
  user$!:Observable<any>

  constructor(private regsiterService:RegisterService) {
    this.user$ = this.regsiterService.getCurrentUser()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    

  }

}
