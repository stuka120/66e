import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  GoogleCalenderEventCollectionResponseModel,
  GoogleCalenderEventResponseModel
} from "../../model/responses/google-calendar/google-calender-event-response.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GoogleCalenderService {
  constructor(private httpClient: HttpClient) {}

  public getEventsTill(maxDate: Date): Observable<GoogleCalenderEventResponseModel[]> {
    return this.httpClient
      .get<GoogleCalenderEventCollectionResponseModel>(
        // tslint:disable-next-line:max-line-length
        `https://www.66er.net/wp-json/66er/v1/events?from=${new Date().toISOString()}&to=${maxDate.toISOString()}`
      )
      .pipe(map((dto) => dto.items));
  }
}
