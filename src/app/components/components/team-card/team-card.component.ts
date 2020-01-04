import { Component, Input, OnInit } from "@angular/core";
import { TeamCardModel } from "./team-card.model";

@Component({
  selector: "app-team-card",
  templateUrl: "./team-card.component.html",
  styleUrls: ["./team-card.component.css"]
})
export class TeamCardComponent implements OnInit {
  @Input()
  model: TeamCardModel;

  constructor() {}

  ngOnInit() {}
}
