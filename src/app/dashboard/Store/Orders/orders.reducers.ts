import { createReducer, on } from "@ngrx/store";
import { OrderSchema, OrdersStateSchema } from "src/app/Interfaces/order-schema";
import { loadOrdersFailed, loadOrdersStart, loadOrdersSuccess } from "./orders.actions";



const initialState:OrdersStateSchema = {
loading:false,
error:false,
orders:[]
}


const ordersReducer = createReducer(
  initialState,
  on(loadOrdersStart,(state:OrdersStateSchema)=>{
    return {
      ...state,loading:true
    }
  }),
  on(loadOrdersSuccess,(state:OrdersStateSchema,action:any)=>{
    const {type,...payload} = action
   const finalPayload:OrderSchema[] = Object.values(payload)



    return {
      ...state,loading:false,orders:finalPayload
    }
  }),
  on(loadOrdersFailed,(state:OrdersStateSchema)=>{
    return {
      ...state,loading:false,error:true,
    }
  }),
)


export default ordersReducer;
