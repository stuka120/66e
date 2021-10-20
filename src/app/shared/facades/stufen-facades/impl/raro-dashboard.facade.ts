import { Injectable } from "@angular/core";
import { StufenDescriptionFacade } from "../../stufen-description-facade.service";
import { Observable } from "rxjs";
import { StufenCardModel } from "../../../../components/components/stufen-card/stufen-card.model";
import { DownloadsFacade } from "../../downloads/downloads.facade";
import { map, startWith } from "rxjs/operators";
import { StufenFacadeInterface } from "../stufen-facade.interface";
import { MyWordpressFacade } from "../../wordpress/my-wordpress.facade";
import { WordpressCategoryEnum } from "../../../dictionary/wordpress-category.enum";
import { WordpressDownloadTagEnum } from "../../../dictionary/wordpress-download-tag.enum";
import { StufenTeamPostFacade } from "../../stufen-team-post.facade";
import { StufenHeimstundenTimeFacade } from "../../stufen-heimstunden-time.facade";
import { HeimstundenTimeModel } from "../../../../components/routing-views/stufen-overview/stufen-overview-dashboard.component";
import { DownloadsCardComponentModel } from "../../../../components/components/downloads-card/downloads-card.component-model";
import { TeamCardCollectionComponentModel } from "../../../../components/components/team-card-collection/team-card-collection.component-model";
import { HeroBannerComponentModel } from "../../../../components/components/hero-banner/hero-banner.component-model";

@Injectable({
  providedIn: "root"
})
export class RaroDashboardFacade implements StufenFacadeInterface {
  constructor(
    private downloadFacade: DownloadsFacade,
    private stufenInfoFacade: StufenDescriptionFacade,
    private stufenTeamPostFacade: StufenTeamPostFacade,
    private stufenHeimstundenTimeFacade: StufenHeimstundenTimeFacade,
    private myWordpressFacade: MyWordpressFacade
  ) {}

  stufenName: string = "RaRo";

  stufenInfo$: Observable<StufenCardModel> = this.stufenInfoFacade.stufenInfoRaRo$();

  stufenHeimstunden$: Observable<HeimstundenTimeModel> = this.stufenHeimstundenTimeFacade.heimstundenRaRo$();

  stufenTeam$: Observable<TeamCardCollectionComponentModel> = this.stufenTeamPostFacade.teamPostsRaRo$();

  stufenDownloads$: Observable<DownloadsCardComponentModel> = this.downloadFacade
    .getDownloadsByTagName(WordpressDownloadTagEnum.Raro)
    .pipe(
      map(
        (downloads) =>
          ({
            title: "Raro Downloads",
            downloads: downloads
          } as DownloadsCardComponentModel)
      )
    );

  stufenBannerModel$: Observable<HeroBannerComponentModel> = this.myWordpressFacade
    .getBannerUrlForCategory$(WordpressCategoryEnum.Raro)
    .pipe(
      startWith(undefined),
      map((imageUrl) => ({
        imageUrl: imageUrl,
        buttonText: null,
        morphextPrefix: "Wir sind RaRo",
        morpext: null
      }))
    );
}
