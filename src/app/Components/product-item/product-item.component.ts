import { Component, Input, OnInit } from '@angular/core';
import { ProductSchema } from 'src/assets/Images';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!:ProductSchema
  constructor() { }

  ngOnInit(): void {
  }

}
