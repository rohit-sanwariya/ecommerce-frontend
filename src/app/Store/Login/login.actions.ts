import { createAction } from "@ngrx/store";


export interface LoginUserSchema {
  _id:string;
  username:string;
  email:string;
  password:string;
  isAdmin:boolean;
  lastName:string;
  firstName:string;
  accessToken:string,
  loading:boolean,
  error:boolean

}

export const loginStart = createAction(
  "[Login] Start",
  (payload) => payload
);

export const loginSuccess = createAction("[Login] Success",
(payload:LoginUserSchema) => payload);

export const loginFailed = createAction("[Login] Failed");

