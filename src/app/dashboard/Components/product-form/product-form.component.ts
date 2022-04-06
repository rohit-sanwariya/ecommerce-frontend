import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { ProductSchema } from '../../../Interfaces/product-schema';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productRegisterForm!: FormGroup;
  categories:string[] = ["electronics","jewelery","men's clothing","women's clothing"]


  constructor(private formBuilder: FormBuilder,private service:AdminService) {

  }

  ngOnInit(): void {
    this.productRegisterForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      img: ['', [Validators.required]],
      categories: [[''], []],
      size: ['', []],
      color: ['', []],
      price: ['', [Validators.required]],
    })
  }

  registerProduct() {
      if(this.productRegisterForm.valid){
        var product :ProductSchema = this.productRegisterForm.value
        console.log(product.categories);
        this.service.registerProduct(product)
        this.productRegisterForm.reset()
      }
  }

}
