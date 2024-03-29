import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor(private httpClient : HttpClient) { }

  userLogin(data) : Observable<any>{
    return this.httpClient.post<any>(environment.baseUrl+"auth/login",data)
  }

  
}
