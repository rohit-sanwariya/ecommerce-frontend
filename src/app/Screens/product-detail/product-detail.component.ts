import { Component, OnInit } from '@angular/core';
import { popularProducts, ProductSchema } from 'src/assets/Images';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product:ProductSchema = popularProducts[0]
  constructor() { }

  ngOnInit(): void {
  }

}
