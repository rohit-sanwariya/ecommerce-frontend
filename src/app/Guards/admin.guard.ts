import { Injectable, ɵpublishDefaultGlobalUtils } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { loginStateSchema } from '../Store/Login/login.reducers';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isAdmin:boolean = false;
  user$!:Observable<boolean>
  constructor(
    private store:Store<{login:loginStateSchema}>
  ){
    this.store.select('login').subscribe((user)=>{



    })
       this.user$ = this.store.select('login').pipe(map(loginState=>loginState.isAdmin))
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.user$
  }

}
