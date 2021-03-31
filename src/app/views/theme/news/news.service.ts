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
    return this.httpClient.post<any>(environment.baseUrl+"file/upload",formData)
  }
}
