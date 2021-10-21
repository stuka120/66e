import { Injectable } from '@angular/core';
import { GoogleCalenderService } from '../../services/google-calendar/google-calender.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UpcomingEventCollectionComponentModel } from '../../../components/components/upcoming-event-collection/upcoming-event-collection.component-model';
import { compareDates } from '../../utils/date/compare-dates.util';
import { GoogleCalenderEventResponseModel } from '../../model/responses/google-calendar/google-calender-event-response.model';
import { Memoize } from 'typescript-memoize';

@Injectable({
  providedIn: 'root'
})
export class CalendarFacade {
  constructor(private googleCalendarService: GoogleCalenderService) {
  }

  public getUpcomingEventsSortedUntil$(maxDate: Date): Observable<UpcomingEventCollectionComponentModel[]> {
    return this.googleCalendarService
      .getEventsTill(maxDate)
      .pipe(
        map((events) => events.map(mapToUpcomingEventModel).sort(sortByEventDate))
      );

    function mapToUpcomingEventModel(
      googleCalenderEventResponseModel: GoogleCalenderEventResponseModel
    ): UpcomingEventCollectionComponentModel {
      return {
        title: googleCalenderEventResponseModel.summary,
        dateTime: !!googleCalenderEventResponseModel.start.dateTime
          ? googleCalenderEventResponseModel.start.dateTime
          : googleCalenderEventResponseModel.start.date,
        endDateTime: !!googleCalenderEventResponseModel.end.dateTime
          ? googleCalenderEventResponseModel.end.dateTime
          : googleCalenderEventResponseModel.end.date,
        place: googleCalenderEventResponseModel.location
      };
    }

    function sortByEventDate(event: UpcomingEventCollectionComponentModel, otherEvent: UpcomingEventCollectionComponentModel) {
      return compareDates(event.dateTime, otherEvent.dateTime)
    }
  }

  @Memoize()
  public getUpcomingEventsForNextMonth(): Observable<UpcomingEventCollectionComponentModel[]> {
    return this.getUpcomingEventsSortedUntil$(getTodayOneMonthAhead()).pipe(shareReplay(1));

    function getTodayOneMonthAhead(): Date {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      return nextMonth;
    }
  }
}
