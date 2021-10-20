import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
// tslint:disable-next-line:max-line-length
import { UpcomingEventCollectionComponentModel } from "../../components/upcoming-event-collection/upcoming-event-collection.component-model";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { CalendarFacade } from "../../../shared/facades/google-calendar/calendar-facade.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.components.html",
  styleUrls: ["./sidebar.components.css"]
})
export class SidebarComponent implements OnInit {
  faArrowLeft = faArrowLeft;

  upcomingEvents$: Observable<UpcomingEventCollectionComponentModel[]>;

  @Output()
  sidebarCloseClicked = new EventEmitter<void>();

  constructor(private eventsFacade: CalendarFacade) {}

  ngOnInit(): void {
    this.upcomingEvents$ = this.eventsFacade.getUpcomingEventsForNextMonth();
  }
}
