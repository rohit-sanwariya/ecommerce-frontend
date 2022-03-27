import { Component, OnInit } from '@angular/core';
import { popularProducts, ProductSchema } from 'src/assets/Images';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:ProductSchema[] = popularProducts
  constructor() { }

  ngOnInit(): void {
  }

}
