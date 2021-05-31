import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AutresService {

  constructor(private httpClient : HttpClient) { }

  getSpecialisations() : Observable<any>{
    return this.httpClient.get(environment.baseUrl+'specialisations')
  }

  getStructureSanitaire() : Observable<any>{
    return this.httpClient.get(environment.baseUrl+'structure-sanitaires')
  }

  getRoles() : Observable<any>{
    return this.httpClient.get(environment.baseUrl+'roles')
  }
}
