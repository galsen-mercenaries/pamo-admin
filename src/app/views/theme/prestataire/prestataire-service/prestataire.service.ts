import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestataireService {

  constructor(private httpClient: HttpClient) { }

  getPrestataire(): Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl+"prestataires")
  }

  addPrestataire(data) : Observable<any>{
    return this.httpClient.post<any>(environment.baseUrl+"prestataires",data)
  }

  deletePrestataire(prestataire_id) : Observable<any>{
    return this.httpClient.delete<any>(environment.baseUrl+"prestataires/"+prestataire_id)
  }

  
}
