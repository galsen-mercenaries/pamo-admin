import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor(private httpClient : HttpClient) { }

  getNews() : Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl+"news")
  }

  addNews(data) : Observable<any>{
    return this.httpClient.post<any>(environment.baseUrl+"news",data)
  }

  deleteNew(code) : Observable<any>{
    return this.httpClient.delete<any>(environment.baseUrl+"news/"+code)
  }

  UploadImage(formData):Observable<any>{
    return this.httpClient.post<any>(environment.baseUrl+"files",formData)
  }

  countNewsByStatut(status) : Observable<any>{
    var url = environment.baseUrl+"news/count?[where][isActif]="+status
    return this.httpClient.get<any>(url)
  }

  getNewById(id): Observable<any>{
    var url = environment.baseUrl+"news/"+id
    return this.httpClient.get<any>(url)
  }

  updateNew(id,data) : Observable<any>{
    var url = environment.baseUrl+"news/"+id
    return this.httpClient.put<any>(url,data)
  }
  
}
