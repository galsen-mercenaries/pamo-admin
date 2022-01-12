import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StructureSanitaireService {
  request = {}

  constructor(private httpClient : HttpClient) { }

  getStructureSanitaire() : Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl+"structure-sanitaires")
  }

  getStructureSanitaireById(id) : Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl+"structure-sanitaires/"+id)
  }

  addStructureSanitaire(data): Observable<any>{
    return this.httpClient.post<any>(environment.baseUrl+"structure-sanitaires",data)
  }

  deleteStructureSanitaire(structureSanitaireId): Observable<any>{
    return this.httpClient.delete<any>(environment.baseUrl+"structure-sanitaires/"+structureSanitaireId)
  }

  updateStructureSanitaire(structureSanitaireId, data) : Observable<any>{
    return this.httpClient.put<any>(environment.baseUrl+"structure-sanitaires/"+structureSanitaireId, data)
  }

  getStructureSanitairePagination(limit,skip, filter?){
    this.request={}
    this.request["limit"] = limit
    this.request["skip"] = skip
    if (typeof filter !=="undefined" && filter !=="structures"){
      this.request['where'] = {}
      this.request["where"]["typePrestataire"] = filter;
    }
    console.log(this.request)
    var request_string = encodeURI(JSON.stringify(this.request));
    return this.httpClient.get<any>(environment.baseUrl+"structure-sanitaires?filter="+request_string)
  }

  CountStructure():Observable<any>{
    return this.httpClient.get(environment.baseUrl+"structure-sanitaires/count")
  }

  countStructureSanitaireByType(status) : Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl+"structure-sanitaires/count?[where][typePrestataire]="+status)
  }

  getStructureSanitaireByType(status) : Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl+"structure-sanitaires?[where][typePrestataire]="+status)
  }
}
 