import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootState } from "../root-store/root-state";
import { WordpressService } from "../services/wordpress.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { WordpressCategoryEnum } from "../dictionary/wordpress-category.enum";
import { WordpressTagEnum } from "../dictionary/wordpress-tag.enum";
import { TeamCardCollectionModel } from "../components/components/team-card-collection/team-card-collection.model";
import { TeamCardModel } from "../components/components/team-card/team-card.model";
import { WordpressPostResponseModel } from "../services/WordpressResponseModel.model";
import { ImageSize } from "./stufen-description-facade.service";

@Injectable()
export class StufenTeamPostFacade {
  constructor(
    private store$: Store<RootState>,
    private wordpressService: WordpressService
  ) {}
  teamPostsBiber$: Observable<
    TeamCardCollectionModel
  > = this.getTeamCardCollectionForStufe(
    WordpressCategoryEnum.Biber,
    "Das Biber Team"
  );

  teamPostsWiWoe$: Observable<
    TeamCardCollectionModel
  > = this.getTeamCardCollectionForStufe(
    WordpressCategoryEnum.Wiwoe,
    "Das WiWö Team"
  );

  teamPostsGuSp$: Observable<
    TeamCardCollectionModel
  > = this.getTeamCardCollectionForStufe(
    WordpressCategoryEnum.Gusp,
    "Das GuSp Team"
  );

  teamPostsCaEx$: Observable<
    TeamCardCollectionModel
  > = this.getTeamCardCollectionForStufe(
    WordpressCategoryEnum.Caex,
    "Das CaEx Team"
  );

  teamPostsRaRo$: Observable<
    TeamCardCollectionModel
  > = this.getTeamCardCollectionForStufe(
    WordpressCategoryEnum.Raro,
    "Das RaRo Team"
  );

  private getTeamCardCollectionForStufe(
    stufe: WordpressCategoryEnum,
    headerText: string
  ): Observable<TeamCardCollectionModel> {
    return this.wordpressService
      .getPostsByCategoryIdAndTagId$(stufe, WordpressTagEnum.Team)
      .pipe(
        map(
          posts =>
            ({
              headerText: headerText,
              teamMembers: posts.map(
                post =>
                  ({
                    name: post.title.rendered,
                    description: post.content.rendered,
                    imgUrl: this.getPostBeitragsbild(post, "medium")
                  } as TeamCardModel)
              )
            } as TeamCardCollectionModel)
        )
      );
  }

  /**
   * Returns a image url of a post image (Beitragsbild) whereas the size is the preferred size
   * If the preferred size is not available, the last available property from wordpress is used (normally this is 'full')
   * @param wordpressPost the wordress post
   * @param size the preferred size to use
   */
  private getPostBeitragsbild(
    wordpressPost: WordpressPostResponseModel,
    size: ImageSize = "large"
  ): string {
    let featuredMedia =
      wordpressPost &&
      wordpressPost._embedded &&
      wordpressPost._embedded["wp:featuredmedia"] &&
      wordpressPost._embedded["wp:featuredmedia"][0];

    if (featuredMedia) {
      let sizesAvailable = Object.keys(featuredMedia.media_details.sizes);
      if (sizesAvailable.find(sizes => sizes === size)) {
        return featuredMedia.media_details.sizes[size].source_url;
      }
      let defaultSize = sizesAvailable[sizesAvailable.length - 1];
      if (defaultSize !== undefined) {
        return featuredMedia.media_details.sizes[defaultSize].source_url;
      }
    }

    return undefined;
  }
}