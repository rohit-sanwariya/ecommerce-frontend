import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from 'src/app/Store/Cart/cart.reducers';

const routes:Routes = [
  {
    path:'',
    component:CartComponent,
  }
]

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(

        'cart',cartReducer

    )
  ]
})
export class CartModule { }
