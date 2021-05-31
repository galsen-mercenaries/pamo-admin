import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private httpClient : HttpClient) { }

  getUtilisateurs() : Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl+"users?filter[include][0]=role")
  }

  addUtilisateur(utilisateur) : Observable<any>{
    return this.httpClient.post(environment.baseUrl+"users",utilisateur)
  }

  banUtilisateur(mail) : Observable<any>{
    return this.httpClient.delete(environment.baseUrl+"users/"+mail)
  }
}
