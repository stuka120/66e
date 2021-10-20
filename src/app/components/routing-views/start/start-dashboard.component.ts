import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { selectPostsIsLoading } from "../../../root-store/posts-store/selectors";
import { RootState } from "../../../root-store/root-state";
import { selectStufenInfosIsLoading } from "../../../root-store/stufen-info-store/selectors";
import { HeroBannerComponentModel } from "../../components/hero-banner/hero-banner.component-model";
import { UpcomingEventCollectionComponentModel } from "../../components/upcoming-event-collection/upcoming-event-collection.component-model";
import { Router } from "@angular/router";
import { WordpressPostResponseModel } from "../../../shared/model/responses/wordpress/wordpress-post-response.model";
import { MyFacebookFacade } from "../../../shared/facades/facebook/my-facebook.facade";
import { StufenTeaserFacade } from "../../../shared/facades/stufen-teaser.facade";
import { CalendarFacade } from "../../../shared/facades/google-calendar/calendar-facade.service";
import { StufenCardModel } from "../../components/stufen-card/stufen-card.model";
import { StufenDescriptionFacade } from "../../../shared/facades/stufen-description-facade.service";
import { MyWordpressFacade } from "../../../shared/facades/wordpress/my-wordpress.facade";
import { WordpressCategoryEnum } from "../../../shared/dictionary/wordpress-category.enum";
import { IframeCardModel } from "../../components/iframe-card/iframe-card.model";
import * as moment from "moment";

@Component({
  selector: "app-start-dashboard",
  templateUrl: "./start-dashboard.component.html",
  styleUrls: ["./start-dashboard.component.css"]
})
export class StartDashboardComponent implements OnInit {
  posts$: Observable<WordpressPostResponseModel[]>;

  stufenCardModels$: Observable<StufenCardModel[]>;
  isLoadingPosts$: Observable<boolean>;
  isLoadingStufenInfos$: Observable<boolean>;

  heroBannerModel$: Observable<HeroBannerComponentModel>;
  heroBannerUrl$: Observable<string>;

  upcomingEvents$: Observable<UpcomingEventCollectionComponentModel[]>;

  adventCalenderIframeModel?: IframeCardModel;

  constructor(
    private myFacebookFacade: MyFacebookFacade,
    private store$: Store<RootState>,
    private stufenInfoFacade: StufenDescriptionFacade,
    private stufenTeaserFacade: StufenTeaserFacade,
    private calendarFacade: CalendarFacade,
    private wordpressFacade: MyWordpressFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoadingPosts$ = this.store$.select(selectPostsIsLoading);
    this.isLoadingStufenInfos$ = this.store$.select(selectStufenInfosIsLoading);
    this.heroBannerUrl$ = this.wordpressFacade.getBannerUrlForCategory$(WordpressCategoryEnum.Startseite);
    this.heroBannerModel$ = this.wordpressFacade.getStartseiteBanner$();
    this.posts$ = this.myFacebookFacade.getPosts$();
    this.stufenCardModels$ = this.stufenTeaserFacade.stufenTeasersAll$();
    this.upcomingEvents$ = this.calendarFacade.getUpcomingEventsForNextMonth();

    this.adventCalenderIframeModel = this.buildAdventkalenderModelWithin2020Year();
  }

  private buildAdventkalenderModelWithin2020Year() {
    const now = moment();
    const endOf2020 = moment("2020-12-31").endOf("year").endOf("day");
    if (now.isBefore(endOf2020)) {
      return {
        iframe: {
          url: "https://calendar.myadvent.net?id=50f50d60b9996903030916e0324fc2bd",
          height: 400
        },
        headerMessage: "66er Adventkalender",
        bodyMessage:
          "Unser 66er Adventkalender!\nKann [hier](https://calendar.myadvent.net?id=50f50d60b9996903030916e0324fc2bd) im Vollbild geöffnet werden. 🎄🎄🎄"
      };
    }
    return undefined;
  }

  heroButtonClicked() {
    this.router.navigate([""], {
      fragment: "nachrichten",
      preserveFragment: true
    });
  }
}
