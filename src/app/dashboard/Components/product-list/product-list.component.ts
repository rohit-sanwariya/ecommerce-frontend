import { Component, OnInit } from '@angular/core';
import { ProductSchema } from 'src/app/Interfaces/product-schema';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products!:ProductSchema[]

  constructor(private service:AdminService) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe((products:ProductSchema[])=>{
      this.products = products
      console.log(this.products);

    })


  }

}
