import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { ProductSchema } from 'src/app/Interfaces/product-schema';
import { FetchService } from 'src/app/Services/Backend/fetch.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  products!:ProductSchema[]
  product!:ProductSchema
  constructor(private productService:FetchService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
     this.route.params.subscribe((val)=>{
    const id =  val['id']
    this.productService.getProduct(id).subscribe((product:any)=>{


      this.product = product
    })


    })


  }

}
