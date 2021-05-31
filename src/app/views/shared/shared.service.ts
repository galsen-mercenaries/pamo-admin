import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http : HttpClient, private sanitizer : DomSanitizer) { }

  getRoles() : Observable<any>{
    return this.http.get(environment.baseUrl+"roles")
  }

  getSpecialisations(): Observable<any>{
    return this.http.get(environment.baseUrl+"specialisations")
  }

  getStructures() : Observable<any>{
    return this.http.get(environment.baseUrl+"structure-sanitaires")
  }

  groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  transform(string_image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(string_image);
  }

  generateImage(objet) {
    objet['_image'] = this.transform(objet['image_url']);

    return objet;
  }

  generateImages(objets) {
    for (var i = 0; i < objets.length; ++i) {
      //console.log(objets[i]["image"])
      objets[i]['image_url'] = this.transform(objets[i]['image_url']);
    }

    return objets;
  }

}
