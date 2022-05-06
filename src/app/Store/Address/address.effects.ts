import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createAction } from "@ngrx/store";
import { catchError, EmptyError, map, mergeMap, of, tap, throwError, throwIfEmpty } from "rxjs";
import { StoreService } from "src/app/Services/store.service";
import { getUserAddressFailed, getUserAddressStart, getUserAddressSuccess, postUserAddressFailed, postUserAddressStart, postUserAddressSuccess, putUserAddressFailed, putUserAddressStart, putUserAddressSuccess } from "./address.actions";
import { UserAddressSchema, UserAddressStateSchema } from "./Interfaces/user-address-state-schema";


interface userId{
  type:string,
  userId:string
}


@Injectable()

export class AddressEffects
{

  getUserAddress$ = createEffect(
    () => this.actions$.pipe(
        ofType(getUserAddressStart),
        mergeMap(
          (user:any)=>this.service.getUserAddress(user.userId)
          .pipe(

            map(
              (UserAdress:any) => {
                  try {
                      if(UserAdress == null) throw new Error("User Not Found")

                      return   getUserAddressSuccess(UserAdress)
                  } catch (error) {
                    console.log(error);
                    return   getUserAddressFailed(error)
                  }
              }
            ),
            catchError((err)=>of(getUserAddressFailed(err)))
          )
        )

      )
    )
  postUserAddress$ = createEffect(
    () => this.actions$.pipe(
        ofType(postUserAddressStart),
        mergeMap(
          (UserAdress:UserAddressStateSchema)=>this.service.postUserAddress(UserAdress)
          .pipe(

            map(
              (UserAdress:any) => {
                  try {
                      if(UserAdress == null) throw new Error("User Not Found")

                      return   postUserAddressSuccess(UserAdress)
                  } catch (error) {
                    console.log(error);
                    return   postUserAddressFailed(error)
                  }
              }
            ),
            catchError((err)=>of(postUserAddressFailed(err)))
          )
        )

      )
    )
  putUserAddress$ = createEffect(
    () => this.actions$.pipe(
        ofType(putUserAddressStart),
        mergeMap(
          (UserAdress:UserAddressStateSchema)=>this.service.putUserAddress(UserAdress)
          .pipe(
            map(
              (UserAdress:any) => {
                  try {
                      if(UserAdress == null) throw new Error("User Not Found")
                      return   putUserAddressSuccess(UserAdress)
                  } catch (error) {
                    console.log(error);
                    return   putUserAddressFailed(error)
                  }
              }
            ),
            catchError((err)=>of(putUserAddressFailed(err)))
          )
        )

      )
    )


  constructor(
    private actions$:Actions,
    private service:StoreService
  ){

  }
}
