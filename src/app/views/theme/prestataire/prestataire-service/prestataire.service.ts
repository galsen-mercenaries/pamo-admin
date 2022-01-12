import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestataireService {

  request = {
    include: [{
      relation: "structureSanitaires"
    }]
  }

  constructor(private httpClient: HttpClient) { }

  getPrestataire(): Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl+"prestataires")
  }

  addPrestataire(data) : Observable<any>{
    return this.httpClient.post<any>(environment.baseUrl+"prestataires",data)
  }

  deletePrestataire(prestataire) : Observable<any>{
    return this.httpClient.delete<any>(environment.baseUrl+"prestataires/"+prestataire.prestataireId)
  }

  getPrestatairePagination(limit,skip) : Observable<any>{
    this.request["limit"] = limit;
    this.request["skip"] = skip;
    var request_string = encodeURI(JSON.stringify(this.request))
    return this.httpClient.get<any>(environment.baseUrl+"prestataires?filter=" + request_string)
  }

  getPrestataireById(id) : Observable<any> {
    var url = environment.baseUrl+"prestataires/"+id
    return this.httpClient.get<any>(url)
  }

  updatePrestataire(data,id) : Observable<any>{
    var url = environment.baseUrl+"prestataires/"+id
    return this.httpClient.put<any>(url,data)
  }

  addStructureToPrestataire(id,data) : Observable<any>{
    var url = environment.baseUrl+"prestataires/"+id+"/add-structure-sanitaires"
    return this.httpClient.put<any>(url,data)
  }

  getStructureSanitaireByPrestataireId(id, limit, skip) : Observable<any>{
    const url = environment.baseUrl+"prestataires/" + id + "/structure-sanitaires?filter[limit]="+limit+"&filter[skip]="+skip
    return this.httpClient.get<any>(url)
  }

  countStructureSanitaireByPrestataireId(id) : Observable<any>{
    const url = environment.baseUrl+"prestataires/" + id + "/structure-sanitaires/count"
    return this.httpClient.get<any>(url)
  }

  
}
