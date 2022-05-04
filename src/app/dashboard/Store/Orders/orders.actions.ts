import { createAction } from "@ngrx/store";
import { OrderSchema } from "src/app/Interfaces/order-schema";




export const loadOrdersStart = createAction('[Dashboard] Home Main Load Orders Start')
export const loadOrdersSuccess = createAction(
  '[Dashboard] Home Main Load Orders Success',
  (payload:OrderSchema)=>payload
  )
export const loadOrdersFailed = createAction('[Dashboard] Home Main Load Orders Error')
