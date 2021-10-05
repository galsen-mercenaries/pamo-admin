import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { UserModel } from '../../../../models/user.model';

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

  banUtilisateur(user: UserModel) : Observable<any>{
    return this.httpClient.patch(environment.baseUrl+"users/"+user.userId, user)
  }

  getUtilisateurPagination(limit,skip) : Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl+"users?filter[limit]="+limit+"&filter[skip]="+skip)
  }

  CountTotalUser():Observable<any>{
    return this.httpClient.get(environment.baseUrl+"users/count")
  }
}
