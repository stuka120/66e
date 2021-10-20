import { Component, Injector, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootState } from "../../../root-store/root-state";
import { Observable } from "rxjs";
import { HeroBannerComponentModel } from "../../components/hero-banner/hero-banner.component-model";
import { TeamCardCollectionComponentModel } from "../../components/team-card-collection/team-card-collection.component-model";
import { DownloadsCardComponentModel } from "../../components/downloads-card/downloads-card.component-model";
import { ActivatedRoute } from "@angular/router";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { StufenCardModel } from "../../components/stufen-card/stufen-card.model";
import { StufenFacadeInterface } from "../../../shared/facades/stufen-facades/stufen-facade.interface";

@Component({
  selector: "app-stufen-overview-dashboard",
  templateUrl: "./stufen-overview-dashboard.component.html",
  styleUrls: ["./stufen-overview-dashboard.component.css"]
})
export class StufenOverviewDashboardComponent implements OnInit {
  stufenFacade: StufenFacadeInterface;

  heroBannerModel$: Observable<HeroBannerComponentModel>;
  stufenInfo$: Observable<StufenCardModel>;
  teamMembers$: Observable<TeamCardCollectionComponentModel>;
  downloads$: Observable<DownloadsCardComponentModel>;
  heimstunden$: Observable<HeimstundenTimeModel>;

  faCog = faCog;

  constructor(private store$: Store<RootState>, private route: ActivatedRoute, private injector: Injector) {}

  ngOnInit() {
    this.stufenFacade = this.injector.get(this.route.snapshot.data.requiredService);

    this.heroBannerModel$ = this.stufenFacade.stufenBannerModel$;
    this.stufenInfo$ = this.stufenFacade.stufenInfo$;
    this.heimstunden$ = this.stufenFacade.stufenHeimstunden$;
    this.teamMembers$ = this.stufenFacade.stufenTeam$;
    this.downloads$ = this.stufenFacade.stufenDownloads$;
  }
}

export interface HeimstundenTimeModel {
  title: string;
  timeDescription: string;
}
