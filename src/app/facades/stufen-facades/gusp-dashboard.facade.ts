import { Injectable } from "@angular/core";
import { StufenInfoFacade } from "../stufen-info.facade";
import { Observable } from "rxjs";
import { StufenCardModel } from "../../model/stufen-card.model";
import { DownloadsFacade } from "../downloads.facade";
import { TeamCardCollectionModel } from "../../components/components/team-card-collection/team-card-collection.model";
import { DownloadsCardModel } from "../../components/components/downloads-card/downloads-card.model";
import { map, startWith } from 'rxjs/operators';
import { StufenFacadeInterface } from "./stufen-facade.interface";
import { HeimstundenTimeModel } from "../../components/routing-views/stufen-overview/stufen-overview-dashboard.component";
import { WordpressDictionary } from '../../dictionary/wordpress.dictionary';
import { HeroBannerModel } from '../../components/components/hero-banner/hero-banner.model';
import { MyWordpressFacade } from '../my-wordpress.facade';

@Injectable({
  providedIn: "root"
})
export class GuspDashboardFacade implements StufenFacadeInterface {
  constructor(
    private downloadFacade: DownloadsFacade,
    private stufenFacade: StufenInfoFacade,
    private myWordpressFacade: MyWordpressFacade
  ) {}

  stufenName: string = "GuSp";

  stufenInfo$: Observable<StufenCardModel> = this.stufenFacade.stufenInfoGuSp$;

  stufenHeimstunden$: Observable<HeimstundenTimeModel> = this.stufenFacade
    .heimstundenGuSp$;

  stufenTeam$: Observable<TeamCardCollectionModel> = this.stufenFacade
    .teamPostsGuSp$;

  stufenDownloads$: Observable<
    DownloadsCardModel
  > = this.downloadFacade.getDownloadsByTagName(WordpressDictionary.downloads.gusp).pipe(
    map(
      downloads =>
        ({
          title: "GuSp Downloads",
          downloads: downloads
        } as DownloadsCardModel)
    )
  );

  stufenBannerModel$: Observable<HeroBannerModel> = this.myWordpressFacade.getBannerUrlForCategory$(WordpressDictionary.categories.gusp).pipe(
    map(imageUrl => ({
      imageUrl: imageUrl,
      buttonText: null,
      morphextPrefix: "Wir sind GuSp",
      morpext: null
    })),
    startWith({
      imageUrl: undefined,
      buttonText: null,
      morphextPrefix: "Wir sind GuSp",
      morpext: null
    })
  );
}
