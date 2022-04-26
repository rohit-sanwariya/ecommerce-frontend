import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from 'src/app/Services/register.service';

interface Map {
  [key: string]: boolean | undefined
}



@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})


export class MyDashboardComponent implements OnInit {
  user$!: Observable<any>
  activeRoute: Map = {
    'my': true,
    'orders': false,
    'account': false,
    'legal': false
  }
  constructor(
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.user$ = this.registerService.getCurrentUser()
  }

  ngOnInit(): void {


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {


        const urlArr = event.url.split("/");
        const current = urlArr[urlArr.length - 1]


        Object.keys(this.activeRoute).forEach((key: string) => {
          if (current === key) {
            this.activeRoute[key] = true
          }
          else {
            this.activeRoute[key] = false
          }
        })


      }
    })




  }

}
