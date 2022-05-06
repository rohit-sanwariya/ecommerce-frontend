import { createReducer, on } from "@ngrx/store";
import { getUserAddressFailed, getUserAddressStart, getUserAddressSuccess, postUserAddressFailed, postUserAddressStart, postUserAddressSuccess, putUserAddressFailed, putUserAddressStart, putUserAddressSuccess } from "./address.actions";
import { UserAddressStateSchema } from "./Interfaces/user-address-state-schema";

const userAddressInitialState:UserAddressStateSchema={
  id:'',
  loading:false,
  error:false,
  addresses:[]

}


export const addressReducer = createReducer(
  userAddressInitialState,
  on(getUserAddressStart,(state:UserAddressStateSchema,payload:any)=>{
   console.log('start add');


    return {
      ...state,loading:true,id:payload.userId
    }
  }),
  on(getUserAddressSuccess,(state:UserAddressStateSchema,payload:any)=>{
    return {
      ...payload,loading:false
    }
  }),
  on(getUserAddressFailed,(state:UserAddressStateSchema)=>{

    return {
      ...state,loading:false,error:true
    }
  }),
  on(postUserAddressStart,(state:UserAddressStateSchema,payload:any)=>{
    return {
      ...state,addressess:[...state.addresses,payload],loading:true
    }
  }),
  on(postUserAddressSuccess,(state:UserAddressStateSchema,payload:any)=>{
    return {
      ...payload,loading:false
    }
  }),
  on(postUserAddressFailed,(state:UserAddressStateSchema )=>{
    return {
      ...state, loading:false,error:true
    }
  }),
  on(putUserAddressStart,(state:UserAddressStateSchema,payload:any)=>{
    console.log(payload);

    return {
      ...state,addressess:[...state.addresses,payload],loading:true
    }
  }),
  on(putUserAddressSuccess,(state:UserAddressStateSchema,payload:any)=>{
    return {
      ...payload,loading:false
    }
  }),
  on(putUserAddressFailed,(state:UserAddressStateSchema )=>{
    return {
      ...state, loading:false,error:true
    }
  }),

)
