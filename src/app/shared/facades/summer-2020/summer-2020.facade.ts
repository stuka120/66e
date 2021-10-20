import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventCardComponentModel } from '../../../components/components/event-card/event-card.component-model';
import { map } from 'rxjs/operators';
import { SummerEventService } from '../../services/summer-event/summer-event.service';
import { EventRegistrationModalPayload } from '../../../components/overlay/event-registration/event-registration-result.model';
import { WINDOW } from 'ngx-window-token';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { SummerEventResponseModel } from '../../model/responses/summer-event/summer-event-response.model';

@Injectable()
export class Summer2020Facade {
  constructor(
    private summerEventService: SummerEventService,
    private configurationService: ConfigurationService,
    @Inject(WINDOW) private window: Window
  ) {
  }

  getEvents$(): Observable<EventCardComponentModel[]> {
    return this.summerEventService.getEvents$().pipe(map(response => this.mapToOrderedEventsList(response)));
  }

  getAllEvents$(): Observable<EventCardComponentModel[]> {
    return this.summerEventService.getAllEvents$().pipe(map(response => this.mapToOrderedEventsList(response)));
  }

  private mapToOrderedEventsList(response: SummerEventResponseModel[]): EventCardComponentModel[] {
    return response
      .map(mapToEventCardComponentModel)
      .sort(sortByEventStartTime);

    function mapToEventCardComponentModel(responseItem: SummerEventResponseModel): EventCardComponentModel {
      return {
        id: responseItem.id,
        name: responseItem.name,
        summary: responseItem.summary,
        stufen: responseItem.stufen,
        description: responseItem.description,
        imageUrl: responseItem.imageUrl,
        pdfUrl: responseItem.pdfUrl,
        eventDate: new Date(responseItem.eventDate),
        eventStartTime: new Date(responseItem.eventStartTime),
        eventEndTime: new Date(responseItem.eventEndTime),
        registrationFrom: responseItem.registrationFrom ? new Date(responseItem.registrationFrom) : undefined,
        registrationTo: responseItem.registrationTo ? new Date(responseItem.registrationTo) : undefined,
        price: responseItem.price ?? undefined
      };
    }

    function sortByEventStartTime(event: EventCardComponentModel, otherEvent: EventCardComponentModel) {
      return event.eventDate.setTime(event.eventStartTime.getTime()).valueOf() -
        otherEvent.eventDate.setTime(otherEvent.eventStartTime.getTime()).valueOf();
    }
  }

  createEventRegistration$(eventRegistration: EventRegistrationModalPayload) {
    return this.summerEventService.registerForEvent$({
      eventId: eventRegistration.eventId,
      firstName: eventRegistration.firstname,
      lastName: eventRegistration.lastname,
      email: eventRegistration.email
    });
  }

  downloadDetailsPdf(eventPdfUrl: string) {
    this.window.open(eventPdfUrl, '_blank');
  }
}
