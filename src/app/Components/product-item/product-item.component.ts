import {   ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RegisterService } from 'src/app/Services/register.service';
import { WishlistSchema } from 'src/app/Store/Wishlist/wishlist.reducers';
import { ProductSchema } from '../../Interfaces/product-schema';
import mediumZoom from 'medium-zoom';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit{
  @Input() product!:ProductSchema;
  liked = false;
  loading = false;
  ngOnInit(): void {
this.store.select('wishlist').subscribe(
  (wishlist)=>{
    const productsarr:any[] = wishlist.products
    const productId:string = this.product._id
    if(productsarr.includes(productId)){
      this.liked = true
    }

  }
)

  }

  constructor(
    private register:RegisterService,
    private store:Store<{wishlist:WishlistSchema}>,
    private cdr:ChangeDetectorRef
    ) {

    }


  addToCart(){
    this.loading = true
      this.register.addProductToCart(this.product,0,0)
  }

  zoomMe(image:HTMLImageElement){

      const zoom = mediumZoom(image,{

      })
     if(this.loading !== true){
      zoom.toggle()
     }

  }
  addToWishlist(){

   if(this.liked){
     setTimeout(() => {
      this.cdr.detectChanges()
      this.liked = false
     this.register.removeProductWishlist(this.product._id)
     this.loading = false;
     }, 2500);
     this.loading= true


   }
   else{
    setTimeout(() => {
      this.cdr.detectChanges()
      this.liked = true
      this.register.addProductToWishlist(this.product._id)
      this.loading = false
    }, 2500);
    this.loading = true
   }



  }



}
