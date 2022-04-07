import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductSchema } from 'src/app/Interfaces/product-schema';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-product-update-form',
  templateUrl: './product-update-form.component.html',
  styleUrls: ['./product-update-form.component.scss']
})
export class ProductUpdateFormComponent implements OnInit {

  productUpdateForm!: FormGroup;
  id!:string
  proudctToBeUpdated!:Observable<ProductSchema>;
  categories:string[] = ["electronics","jewelery","men's clothing","women's clothing"]


  constructor(private formBuilder: FormBuilder,private service:AdminService,private route:ActivatedRoute) {

  }

  ngOnInit(): void {
      this.route.params.subscribe((params)=>{
        const id = params['id']
        this.id = id
      this.proudctToBeUpdated =   this.service.getProduct(id) as Observable<ProductSchema>
      })

    this.proudctToBeUpdated.subscribe((product:ProductSchema)=>{
      this.productUpdateForm = this.formBuilder.group({
        title: [product.title, [Validators.required]],
        desc: [product.desc, [Validators.required]],
        img: [product.img, [Validators.required]],
        categories: [product.categories],
        size: [product.size],
        color: [product.color],
        price: [product.price, [Validators.required]],
      })
    })
  }

  updateProduct() {
    const product :ProductSchema = this.productUpdateForm.value
      if(this.productUpdateForm.valid){
        console.log(product);
        this.service.updateProduct(product,this.id)
      }
  }

}
