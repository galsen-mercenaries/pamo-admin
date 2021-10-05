import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class MeetingService {
    request = {
    include: [
      {
        relation: "medecin",
        scope: {
          include: [
            {
              relation: "user",
            },
            {
              relation: "structuresanitaire",
            },
          ],
        },
      },
      {
        relation: "patient",
      },
    ],
  };
  constructor(private httpClient: HttpClient) {}

  countMeetingByStatus(status): Observable<any> {
    var url = environment.baseUrl + "meetings/count?[where][status]=" + status;
    return this.httpClient.get<any>(url);
  }

  getAllMeetings(): Observable<any> {
    return this.httpClient.get<any>(
      environment.baseUrl + "meetings/all-infos?filter[include][0]=medecin"
    );
  }

  getMeetingPagination(limit, skip, filter?): Observable<any> {
    this.request['limit'] = limit
    this.request['skip'] = skip
    console.log(filter)
    if (typeof filter !== 'undefined'){
      this.request['where'] = {}
      this.request['where']['status'] = filter
    }
    var request_string = encodeURI(JSON.stringify(this.request));
    return this.httpClient.get<any>(
      environment.baseUrl + "meetings?filter=" + request_string
    );
  }

  CountTotalMeeting(filter?): Observable<any> {
    return this.httpClient.get(environment.baseUrl + "meetings/count");
  }
}
