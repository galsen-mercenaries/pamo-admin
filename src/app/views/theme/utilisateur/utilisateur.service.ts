import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private httpClient : HttpClient) { }

  getUtilisateurs() : Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl+"users")
  }

  addUtilisateur(utilisateur) : Observable<any>{
    return this.httpClient.post(environment.baseUrl+"users",utilisateur)
  }

  banUtilisateur(mail) : Observable<any>{
    return this.httpClient.delete(environment.baseUrl+"users/"+mail)
  }
}
