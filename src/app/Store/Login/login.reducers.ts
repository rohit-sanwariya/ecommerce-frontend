import { Action, createReducer, on } from "@ngrx/store";
import { loginFailed, loginStart, loginSuccess, LoginUserSchema } from "./login.actions";


export interface loginStateSchema{
  loggedIn:boolean
  loading:boolean
  error:boolean
  isAdmin:boolean
}
const initialState:loginStateSchema = {
  loggedIn:false,
  loading:false,
  error:false,
  isAdmin:false
}
export const loginReducer = createReducer(
  initialState,
  on(loginStart,(state:loginStateSchema,action:Action)=>{



    return {
      loading:true,
      loggedIn:false,
      error:true,
      isAdmin:false
    }
  }),
  on(loginSuccess,(state:loginStateSchema,payload:LoginUserSchema)=>{

      sessionStorage.setItem('accessToken',payload.accessToken)

    return {
      loading:false,
      loggedIn:true,
      error:false,
      isAdmin:payload.isAdmin
    }
  }),
  on(loginFailed,(state:loginStateSchema)=>{
    return {
      loading:false,
      loggedIn:false,
      error:true,
      isAdmin:false
    }
  }),
)

