import { Injectable } from "@angular/core";
import { GoogleCalenderService } from "../services/google-calender.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UpcomingEventCollectionComponentModel } from "../components/components/upcoming-event-collection/upcoming-event-collection.component-model";
import { compareDates } from "../utils/date/compare-dates.util";
import { GoogleCalenderEventResponseModel } from "../model/responses/google-calender-event-response.model";

@Injectable({
  providedIn: "root"
})
export class CalendarFacade {
  constructor(private googleCalendarService: GoogleCalenderService) {}

  public getUpcomingEventsSortedUntil(
    maxDate: Date
  ): Observable<UpcomingEventCollectionComponentModel[]> {
    function mapToUpcomingEventModel(
      googleCalenderEventResponseModel: GoogleCalenderEventResponseModel
    ): UpcomingEventCollectionComponentModel {
      return {
        title: googleCalenderEventResponseModel.summary,
        dateTime: googleCalenderEventResponseModel.start.dateTime,
        endDateTime: googleCalenderEventResponseModel.end.dateTime,
        place: googleCalenderEventResponseModel.location
      };
    }

    return this.googleCalendarService
      .getEventsTill(maxDate)
      .pipe(
        map(events =>
          events
            .map(mapToUpcomingEventModel)
            .sort((a, b) => compareDates(a.dateTime, b.dateTime))
        )
      );
  }

  public getUpomingEventsForNextMonth(): Observable<UpcomingEventCollectionComponentModel[]> {
    return this.getUpcomingEventsSortedUntil(this.getTodayOneMonthAhead());
  }

  private getTodayOneMonthAhead(): Date {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    return nextMonth;
  }
}
