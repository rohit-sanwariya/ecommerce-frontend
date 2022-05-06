import { createAction } from "@ngrx/store";
import { UserAddressSchema } from "./Interfaces/user-address-state-schema";

export const getUserAddressStart = createAction(
  "[UserAddressLIst] Start Get User Address",
  payload => payload
)
export const getUserAddressSuccess = createAction(
  "[UserAddressLIst] Success Get User Address",
  (payload: UserAddressSchema) => payload
)
export const getUserAddressFailed = createAction(
  "[UserAddressLIst] Failed Get User Address",
  payload => payload
)

export const postUserAddressStart = createAction(
  "[UserAddressLIst] Start Post New Address",
  payload => payload
)
export const postUserAddressSuccess = createAction(
  "[UserAddressLIst] Success Post New Address",
  payload => payload
)
export const postUserAddressFailed = createAction(
  "[UserAddressLIst] Failed Post New Address",
  payload => payload
)
export const putUserAddressStart = createAction(
  "[UserAddressLIst] Start Put New Address",
  payload => payload
)
export const putUserAddressSuccess = createAction(
  "[UserAddressLIst] Success Put New Address",
  payload => payload
)
export const putUserAddressFailed = createAction(
  "[UserAddressLIst] Failed Put New Address",
  payload => payload
)
