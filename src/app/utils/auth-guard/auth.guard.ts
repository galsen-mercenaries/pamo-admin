import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as SecureLS from "secure-ls";
import { LOCAL_STORAGE_KEYS } from '..';
const ls = new SecureLS({ encodingType: "aes" });

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = ls.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

      if(!token) {
          return false
      }
    return true;
  }

}
