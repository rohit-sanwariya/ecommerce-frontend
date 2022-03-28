import { Component, OnInit } from '@angular/core';
import { FilterSchema } from 'src/app/Interfaces/filter-schema';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})




export class ProductPageComponent implements OnInit {
  colors:FilterSchema = {type:'filter',data:['Color','White',"Black","Red","Blue","Yellow","Green"]}
  size:FilterSchema = {type:'filter',data:['Size','XS',"S","M","L","XL"]}
  sort:FilterSchema = {type:'sort',data:['Newest','Price (asc)',"Price (desc)"]}

  constructor() { }

  ngOnInit(): void {
  }

}
