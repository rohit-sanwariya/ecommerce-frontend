import { Action, createReducer, on, reduceState } from "@ngrx/store";
import {   CartSchema } from "src/app/Interfaces/cart-schema";
import { incrementCartProductFailed, incrementCartProductStart, incrementCartProductSuccess, fetchCartFailed, fetchCartStart, fetchCartSuccess } from "./cart.actions";

export interface reduceState {
  loading:boolean
  error:boolean

}
interface stateSchema extends CartSchema , reduceState{

}
const cartInitialState:stateSchema = {
  _id:'',
  id:'',
  products:[],
  loading:false,
  error:false,

}

export const cartReducer= createReducer(
  cartInitialState,
 on(fetchCartStart,(state:any)=>{


   return {
     ...state,loading:true
   }
 }),
 on(incrementCartProductStart,(state:any,payload:any)=>{


   return {
     ...payload,loading:true
   }
 }),
 on(incrementCartProductSuccess,(state:stateSchema,payload:any)=>{


      return {
        ...payload,loading:false
   }
 }),
 on(incrementCartProductFailed,(state:any)=>{
   return {
     ...state,loading:false,error:true,
   }
 }),
 on(fetchCartFailed,(state:any)=>{
   return {
     ...state,loading:false,error:true,
   }
 }),
 on(fetchCartSuccess,(state:any,action:CartSchema)=>{
   const {type,...payload}:any = {...action}



   return {
     ...state,...payload,loading:false
   }
 }),


)
