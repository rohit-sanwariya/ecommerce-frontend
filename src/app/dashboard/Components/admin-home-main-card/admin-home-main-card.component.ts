import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { timeStamp } from 'console';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-admin-home-main-card',
  templateUrl: './admin-home-main-card.component.html',
  styleUrls: ['./admin-home-main-card.component.scss']
})
export class AdminHomeMainCardComponent implements OnInit,OnChanges {
  @Input() title:string = ''
  @Input() footerText:string = ''
  @Input() orderTotal = 0;

  amount:number=0
  percent:number = 0;
  direction:string='';
  cost:number =0;
  constructor() {


   }
  ngOnChanges(changes: SimpleChanges): void {


    if(this.title=='Sales'){

      this.amount = Math.round(this.orderTotal*(1/5))
      this.percent = 20
      this.direction = 'north'
    }
    else if(this.title == 'Revenue'){
      this.amount = this.orderTotal;
      this.percent = 14.14
      this.direction = 'north'
    }
    else{

      this.amount = Math.round(this.orderTotal*(1/7))
      this.direction = 'north'

this.percent = +10
    }


  }

  ngOnInit(): void {


  }

}
