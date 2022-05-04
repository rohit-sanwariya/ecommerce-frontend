import { createReducer, on } from "@ngrx/store";
import { LoginUserSchema } from "../Login/login.actions";
import { getUserApiStart, getUserApiSuccess, setUserOnLogin } from "./user.actions";

export interface CurrentUserSchema {
  _id:string;
  username:string;
  email:string;
  password:string;
  isAdmin:boolean;
  lastname:string;
  firstname:string;
  loading:boolean;
  error:boolean;

}



export const userInitialState:CurrentUserSchema ={
  _id:'',
  username:'',
  email:'',
  password:'',
  isAdmin:false,
  lastname:'',
  firstname:'',
  error:false,
  loading:false
}

export const userReducer = createReducer(
  userInitialState,
  on(getUserApiStart,(
    (state:CurrentUserSchema )=>{



    return {
      ...state,loading:true,error:false
    }
  })),
  on(getUserApiSuccess,(
    (state:CurrentUserSchema,action:CurrentUserSchema)=>{

      const {type,...payload}:any = {...action}


    return {
      ...state,...payload,loading:false,error:false
    }
  })),

)
