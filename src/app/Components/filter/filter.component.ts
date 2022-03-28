import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FilterSchema } from 'src/app/Interfaces/filter-schema';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit  {
  @Input() options!:FilterSchema
  data!:string[]
  constructor() {

  }


  ngOnInit(): void {



  }

}
