import { createAction } from "@ngrx/store";
import { LoginUserSchema } from "../Login/login.actions";
import { CurrentUserSchema } from "./user.reducers";



export const getUserApiStart = createAction(
  '[User] Get API Start',

)
export const getUserApiSuccess = createAction(
  '[User] Get API Success',
  (payload:CurrentUserSchema)=>payload
)
export const getUserApiFailed = createAction(
  '[User] Get API Failed'
)

export const setUserOnLogin = createAction(
  '[User] Set On Login',
  (payload:CurrentUserSchema)=>payload
)
