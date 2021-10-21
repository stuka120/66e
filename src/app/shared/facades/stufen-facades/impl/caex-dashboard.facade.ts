import { Injectable } from '@angular/core';
import { StufenDescriptionFacade } from '../../stufen-description-facade.service';
import { Observable } from 'rxjs';
import { StufenCardModel } from '../../../../components/components/stufen-card/stufen-card.model';
import { DownloadsFacade } from '../../downloads/downloads.facade';
import { map, startWith } from 'rxjs/operators';
import { StufenFacadeInterface } from '../stufen-facade.interface';
import { MyWordpressFacade } from '../../wordpress/my-wordpress.facade';
import { WordpressCategoryEnum } from '../../../dictionary/wordpress-category.enum';
import { WordpressDownloadTagEnum } from '../../../dictionary/wordpress-download-tag.enum';
import { StufenTeamPostFacade } from '../../stufen-team-post.facade';
import { StufenHeimstundenTimeFacade } from '../../stufen-heimstunden-time.facade';
import { HeimstundenTimeModel } from '../../../../components/routing-views/stufen-overview/stufen-overview-dashboard.component';
import { DownloadsCardComponentModel } from '../../../../components/components/downloads-card/downloads-card.component-model';
import { TeamCardCollectionComponentModel } from '../../../../components/components/team-card-collection/team-card-collection.component-model';
import { HeroBannerComponentModel } from '../../../../components/components/hero-banner/hero-banner.component-model';

@Injectable({
  providedIn: "root"
})
export class CaexDashboardFacade implements StufenFacadeInterface {
  constructor(
    private downloadFacade: DownloadsFacade,
    private stufenInfoFacade: StufenDescriptionFacade,
    private stufenTeamPostFacace: StufenTeamPostFacade,
    private stufenHeimstundenTimeFacade: StufenHeimstundenTimeFacade,
    private myWordpressFacade: MyWordpressFacade
  ) {}

  stufenName: string = "CaEx";

  stufenInfo$: Observable<StufenCardModel> = this.stufenInfoFacade.stufenInfoCaEx$();

  stufenHeimstunden$: Observable<HeimstundenTimeModel> = this.stufenHeimstundenTimeFacade.heimstundenCaEx$();

  stufenTeam$: Observable<TeamCardCollectionComponentModel> = this.stufenTeamPostFacace.teamPostsCaEx$();

  stufenDownloads$: Observable<DownloadsCardComponentModel> = this.downloadFacade
    .getDownloadsByTagName(WordpressDownloadTagEnum.Caex)
    .pipe(
      map(
        (downloads) =>
          ({
            title: "CaEx Downloads",
            downloads: downloads
          } as DownloadsCardComponentModel)
      )
    );

  stufenBannerModel$: Observable<HeroBannerComponentModel> = this.myWordpressFacade
    .getBannerUrlForCategory$(WordpressCategoryEnum.Caex)
    .pipe(
      startWith(undefined),
      map((imageUrl) => ({
        imageUrl: imageUrl,
        buttonText: null,
        morphextPrefix: "Wir sind CaEx",
        morpext: null
      }))
    );
}
