import { Injectable } from "@angular/core";
import { StufenDescriptionFacade } from "../../stufen-description-facade.service";
import { Observable } from "rxjs";
import { StufenCardModel } from "../../../../components/components/stufen-card/stufen-card.model";
import { DownloadsFacade } from "../../downloads/downloads.facade";
import { TeamCardCollectionComponentModel } from "../../../../components/components/team-card-collection/team-card-collection.component-model";
import { DownloadsCardComponentModel } from "../../../../components/components/downloads-card/downloads-card.component-model";
import { map, startWith } from "rxjs/operators";
import { StufenFacadeInterface } from "../stufen-facade.interface";
import { HeimstundenTimeModel } from "../../../../components/routing-views/stufen-overview/stufen-overview-dashboard.component";
import { HeroBannerComponentModel } from "../../../../components/components/hero-banner/hero-banner.component-model";
import { MyWordpressFacade } from "../../wordpress/my-wordpress.facade";
import { WordpressCategoryEnum } from "../../../dictionary/wordpress-category.enum";
import { WordpressDownloadTagEnum } from "../../../dictionary/wordpress-download-tag.enum";
import { StufenTeamPostFacade } from "../../stufen-team-post.facade";
import { StufenHeimstundenTimeFacade } from "../../stufen-heimstunden-time.facade";

@Injectable({
  providedIn: "root"
})
export class WiwoeDashboardFacade implements StufenFacadeInterface {
  constructor(
    private downloadFacade: DownloadsFacade,
    private stufenInfoFacade: StufenDescriptionFacade,
    private stufenTeamPostFacade: StufenTeamPostFacade,
    private stufenHeimstundenTimeFacade: StufenHeimstundenTimeFacade,
    private myWordpressFacade: MyWordpressFacade
  ) {}

  stufenName: string = "WiWö";

  stufenInfo$: Observable<StufenCardModel> = this.stufenInfoFacade.stufenInfoWiWoe$();

  stufenHeimstunden$: Observable<HeimstundenTimeModel> = this.stufenHeimstundenTimeFacade.heimstundenWiWoe$();

  stufenTeam$: Observable<TeamCardCollectionComponentModel> = this.stufenTeamPostFacade.teamPostsWiWoe$();

  stufenDownloads$: Observable<DownloadsCardComponentModel> = this.downloadFacade
    .getDownloadsByTagName(WordpressDownloadTagEnum.Wiwoe)
    .pipe(
      map(
        (downloads) =>
          ({
            title: "WiWö Downloads",
            downloads: downloads
          } as DownloadsCardComponentModel)
      )
    );

  stufenBannerModel$: Observable<HeroBannerComponentModel> = this.myWordpressFacade
    .getBannerUrlForCategory$(WordpressCategoryEnum.Wiwoe)
    .pipe(
      startWith(undefined),
      map((imageUrl) => ({
        imageUrl: imageUrl,
        buttonText: null,
        morphextPrefix: "Wir sind WiWö",
        morpext: null
      }))
    );
}
