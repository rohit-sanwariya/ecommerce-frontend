import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit {

  constructor(private registerService:RegisterService) { }

  ngOnInit(): void {
    
  }

}
