import { Component, Input, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/Services/register.service';
import { ProductSchema } from '../../Interfaces/product-schema';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!:ProductSchema;
  ngOnInit(): void {


  }

  constructor(private register:RegisterService) { }

  addToCart(){
      this.register.addProductToCart(this.product,0,0)
  }
  addToWishlist(){
    this.register.addProductToWishlist(this.product._id)

  }



}
