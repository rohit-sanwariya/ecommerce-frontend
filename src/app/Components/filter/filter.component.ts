import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterSchema } from 'src/app/Interfaces/filter-schema';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() optionSelected = new EventEmitter()
  @Input() options!: FilterSchema
  data!: string[]
  constructor(private formBuilder: FormBuilder) {

  }


  ngOnInit(): void {




  }

  SelectedOptions(element:any){

element.target.value === 'Price (asc)'?this.optionSelected.emit(0):this.optionSelected.emit(1)

  }

}
