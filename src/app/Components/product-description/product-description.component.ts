import { Component, Input, OnInit } from '@angular/core';
import { FilterSchema } from 'src/app/Interfaces/filter-schema';
import { ProductSchema } from 'src/app/Interfaces/product-schema';


@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
 @Input() product!:ProductSchema
 size:FilterSchema = {type:'filter',data:['Size','XS',"S","M","L","XL"]}
 colors:FilterSchema = {type:'color',data:[ "Black", "Blue","Gray"]}
  constructor() { }

  ngOnInit(): void {
  }

}
