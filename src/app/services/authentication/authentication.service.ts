import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as SecureLS from "secure-ls";
import { LOCAL_STORAGE_KEYS } from '../../utils';
const ls = new SecureLS({ encodingType: "aes" });
import { switchMap, tap } from "rxjs/operators";
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';

const { baseUrl } = environment;
const LOGIN_ENDPOINT = `${baseUrl}users/login`;
const CURRENT_USER_INFOS = `${baseUrl}user/me`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient : HttpClient, private router: Router) { }

  userLogin(data: {login: string, password: string}) : Observable<any>{
    return this.httpClient.post(`${LOGIN_ENDPOINT}`,data).pipe(
      tap((loginRes: {token: string}) => {
        ls.set(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, loginRes.token);
      }),
      switchMap((res: any) => {
        return this.getUserInfos();
      })
    )
  }

  getUserInfos() {
    return this.httpClient.get(CURRENT_USER_INFOS).pipe(
      tap((res: UserModel) => {
        ls.set(LOCAL_STORAGE_KEYS.USER, res);
      })
    );
  }

  getUserInfosSaved() {
    const userInfos = ls.get(LOCAL_STORAGE_KEYS.USER);
    if (userInfos) return of(userInfos);
    return this.getUserInfos();
  }

  logout() {
    ls.removeAll();
    ls.clear();
    this.router.navigate(['/']);
  }
}
