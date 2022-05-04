import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, Color } from 'chart.js';

@Component({
  selector: 'app-admin-home-main-chart',
  templateUrl: './admin-home-main-chart.component.html',
  styleUrls: ['./admin-home-main-chart.component.scss']
})
export class AdminHomeMainChartComponent implements OnInit {

  public lineChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Revenue 7 Months' },
    { data: [35, 49, 40, 59, 66, 25, 10], label: 'Sales 7 Months' },
    { data: [30, 43, 50, 39, 60, 65, 80], label: 'Cost 7 Months' },
  ];
  public lineChartLabels: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any= {
    responsive: true,
  };
  public lineChartColors: any = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }

}
