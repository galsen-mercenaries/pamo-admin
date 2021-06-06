import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RoleModel } from '../../../models/role.model';
import { StructureSanitaireModel } from '../../../models/structureSanitaire.model';
import { SpecialisationModel } from '../../../models/specialisation.model';

const { baseUrl } = environment;
const ENDPOINT_ROLES = `${baseUrl}roles`
const ENDPOINT_SPECIALISATION = `${baseUrl}specialisations`
const ENDPOINT_STRUCTURE_SANITAIRE = `${baseUrl}structure-sanitaires`

@Injectable({
  providedIn: 'root'
})
export class AutresService {

  constructor(private httpClient : HttpClient) { }

  getSpecialisations() : Observable<any>{
    return this.httpClient.get(`${ENDPOINT_SPECIALISATION}`)
  }
  addSpecialisations(item: SpecialisationModel) : Observable<any>{
    const payload = Object.assign({}, {nom: item.nom, code: item.code })
    return this.httpClient.post(`${ENDPOINT_SPECIALISATION}`, payload)
  }

  patchSpecialisations(item: SpecialisationModel) : Observable<any>{
    return this.httpClient.patch(`${ENDPOINT_SPECIALISATION}/${item.specialisationId}`, item)
  }

  getStructureSanitaire() : Observable<any>{
    return this.httpClient.get(`${ENDPOINT_STRUCTURE_SANITAIRE}`)
  }
  addStructureSanitaire(item: StructureSanitaireModel) : Observable<any>{
    const payload = Object.assign({}, {nom: item.nom, code: item.code, ville: item.ville})
    return this.httpClient.post(`${ENDPOINT_STRUCTURE_SANITAIRE}`, payload)
  }

  patchStructureSanitaire(item: StructureSanitaireModel) : Observable<any>{
    return this.httpClient.patch(`${ENDPOINT_STRUCTURE_SANITAIRE}/${item.structuresanitaireId}`, item)
  }

  getRoles() : Observable<any>{
    return this.httpClient.get(environment.baseUrl+'roles')
  }

  addRole(role: RoleModel) {
    const payload = Object.assign({}, {nom: role.nom, code: role.code})
    return this.httpClient.post( `${ENDPOINT_ROLES}`, payload);
  }

  patchRole(role: RoleModel) {
    return this.httpClient.patch(`${ENDPOINT_ROLES}/${role.roleId}`, role);
  }
}
