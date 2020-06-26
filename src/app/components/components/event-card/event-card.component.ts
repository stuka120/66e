import { Component, Input, OnInit } from "@angular/core";
import { faCalendar, faChevronDown, faChevronUp, faClock, faList } from "@fortawesome/free-solid-svg-icons";
import { EventCardComponentModel } from "./event-card.component-model";

@Component({
  selector: "app-event-card",
  templateUrl: "./event-card.component.html",
  styleUrls: ["./event-card.component.css"]
})
export class EventCardComponent implements OnInit {
  @Input()
  model: EventCardComponentModel;

  // @ts-ignore
  faList = faList;
  faClock = faClock;
  faCalendar = faCalendar;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  isExpanded: boolean;

  constructor() {}

  ngOnInit() {}
}
