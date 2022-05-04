import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { StoreService } from "src/app/Services/store.service";
import { LoginUserSchema } from "../Login/login.actions";
import { getUserApiStart, getUserApiSuccess, } from "./user.actions";



@Injectable()
export class UserEffects {


  constructor(
    private actions$: Actions,
    private service: StoreService
  ) { }

  loadUser$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(getUserApiStart),
      mergeMap(()=>this.service.getUserWithAccessTokenFromApi().pipe(
        map((user:any)=>getUserApiSuccess(user))
      ))
    )
  )


}
