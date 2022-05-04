import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, map, mergeMap, tap } from "rxjs";

import { LoginService } from "src/app/Services/login.service";
import { setUserOnLogin } from "../User/user.actions";

import { loginStart, loginSuccess, LoginUserSchema } from "./login.actions";



@Injectable()
export class LoginEffects {


  loadLogin$ = createEffect(
    () => this.action$.pipe(
      ofType(loginStart),
      mergeMap(
        (user) => this.loginService.loginUser(user).pipe(
        
          map((login:LoginUserSchema) => {

           if(login.isAdmin){
            this.router.navigate(['','admin','dashboard'])
           }
           else{
            this.router.navigate([''])
           }

            return loginSuccess(login)
          }),
          catchError(() => EMPTY)
        ),

      )
    )
  )

  constructor(
    private action$: Actions,
    private loginService: LoginService,
    private router:Router,

  ) {

  }

}
