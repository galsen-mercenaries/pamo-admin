import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StructureSanitaireService {

  constructor(private httpClient : HttpClient) { }

  getStructureSanitaire() : Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl+"structure-sanitaires")
  }

  addStructureSanitaire(data): Observable<any>{
    return this.httpClient.post<any>(environment.baseUrl+"structure-sanitaires",data)
  }

  deleteStructureSanitaire(structureSanitaireId): Observable<any>{
    return this.httpClient.delete<any>(environment.baseUrl+"structure-sanitaires/"+structureSanitaireId)
  }

  getStructureSanitairePagination(limit,skip){
    return this.httpClient.get<any>(environment.baseUrl+"structure-sanitaires?filter[limit}="+limit+"&filter[skip]="+skip)
  }

  CountStructure():Observable<any>{
    return this.httpClient.get(environment.baseUrl+"structure-sanitaires/count")
  }

  countStructureSanitaireByType(status) : Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl+"structure-sanitaires/count?[where][typePrestataire]="+status)
  }
}
 