import { Component, Input, OnInit } from '@angular/core';
import { ProductSchema } from 'src/app/Interfaces/product-schema';
import { FetchService } from 'src/app/Services/Backend/fetch.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!:ProductSchema[]
  @Input() sortByPriceShow:number = -1
  constructor(private productService:FetchService) { }

  ngOnInit(): void {
        this.productService.getProducts().subscribe((products)=>{
          this.products = products
        });
  }

}
