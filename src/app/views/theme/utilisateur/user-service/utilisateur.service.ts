import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {UserModel} from '../../../../models/user.model';

const USER_ENDPOINT = 'user';
const REGISTER_USER_ENDPOINT = `${USER_ENDPOINT}/signup`;

export interface UserRegistration {
    nom: string;
    prenom: string;
    roleCode: string;
    numero: string;
    adresse: string;
    email: string;
    account_status: boolean;
    password: string;
    structuresanitaireId?: number;
}
@Injectable({
    providedIn: 'root'
})
export class UtilisateurService {
    constructor(private httpClient: HttpClient) {}

    getUtilisateurs(): Observable<any> {
        return this.httpClient.get<any>(environment.baseUrl + 'users?filter[include][0]=role');
    }

    addUtilisateur(utilisateur: UserRegistration): Observable<any> {
        return this.httpClient.post(environment.baseUrl + 'users', utilisateur);
    }

    registernNewUser(utilisateur: UserRegistration): Observable<any> {
        return this.httpClient.post(environment.baseUrl + REGISTER_USER_ENDPOINT, utilisateur);
    }

    updateUser(user: UserModel): Observable<any> {
        return this.httpClient.patch(environment.baseUrl +`users/${user.userId}`, user);
    }

    banUtilisateur(user: UserModel): Observable<any> {
        delete user['role'];
        user.account_status = false;
        return this.httpClient.patch(environment.baseUrl + 'users/' + user.userId, user);
    }

    getUtilisateurPagination(limit, skip): Observable<any> {
        return this.httpClient.get<any>(
            environment.baseUrl + 'users?filter[limit]=' + limit + '&filter[skip]=' + skip + '&filter[include][0]=role'
        );
    }

    CountTotalUser(): Observable<any> {
        return this.httpClient.get(environment.baseUrl + 'users/count');
    }

    getMedecinInfos() {
       return this.httpClient.get(environment.baseUrl + 'medecins?filter[include][0]=user')
    }

    getMedecinInfosWithFilter(userId: number) {
        const inclusionFilter = {
            "where": {
              "userId": userId
            },
            "fields": {
              "medecinid": true,
              "userId": true,
              "structuresanitaireId": true
            },
            "include": [
              {
                "relation": "user"
              },
              {
                "relation": "specialisations"
              },
              {
                "relation": "structuresanitaire"
              }
            ]
          }
        const encodedFilter = encodeURIComponent(JSON.stringify(inclusionFilter));
        return this.httpClient.get(environment.baseUrl + 'medecins?filter='+encodedFilter)
    }

    updateMedecinStructureSanitaire(medecinId: number ,userId: number, structuresanitaireId, specialisations?: any) {
        return this.httpClient.patch(environment.baseUrl + `medecins/${medecinId}`, {userId, structuresanitaireId, list_specialisations: specialisations})
    }
}
