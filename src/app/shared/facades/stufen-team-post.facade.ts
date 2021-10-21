import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../root-store/root-state';
import { WordpressService } from '../services/wordpress/wordpress.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WordpressCategoryEnum } from '../dictionary/wordpress-category.enum';
import { WordpressTagEnum } from '../dictionary/wordpress-tag.enum';
import { TeamCardCollectionComponentModel } from '../../components/components/team-card-collection/team-card-collection.component-model';
import { TeamCardComponentModel } from '../../components/components/team-card/team-card.component-model';
import { WordpressPostResponseModel } from '../model/responses/wordpress/wordpress-response.model';
import { ImageSize } from './stufen-description-facade.service';

@Injectable()
export class StufenTeamPostFacade {
  constructor(private store$: Store<RootState>, private wordpressService: WordpressService) {}

  teamPostsBiber$(): Observable<TeamCardCollectionComponentModel> {
    return this.fetchTeamCardCollectionForStufe(
      WordpressCategoryEnum.Biber,
      "Das Biber Team"
    );
  }

  teamPostsWiWoe$(): Observable<TeamCardCollectionComponentModel> {
    return this.fetchTeamCardCollectionForStufe(
      WordpressCategoryEnum.Wiwoe,
      "Das WiWö Team"
    );
  }

  teamPostsGuSp$(): Observable<TeamCardCollectionComponentModel> {
    return this.fetchTeamCardCollectionForStufe(
      WordpressCategoryEnum.Gusp,
      "Das GuSp Team"
    );
  }

  teamPostsCaEx$(): Observable<TeamCardCollectionComponentModel> {
    return this.fetchTeamCardCollectionForStufe(
      WordpressCategoryEnum.Caex,
      "Das CaEx Team"
    );
  }

  teamPostsRaRo$(): Observable<TeamCardCollectionComponentModel> {
    return this.fetchTeamCardCollectionForStufe(
      WordpressCategoryEnum.Raro,
      "Das RaRo Team"
    );
  }

  private fetchTeamCardCollectionForStufe(
    stufe: WordpressCategoryEnum,
    headerText: string
  ): Observable<TeamCardCollectionComponentModel> {
    return this.wordpressService.getPostCollectionByCategoryAndTag$(stufe, WordpressTagEnum.Team).pipe(
      map(
        (posts) =>
          ({
            headerText: headerText,
            teamMembers: posts.map(
              (post) =>
                ({
                  name: post.title.rendered,
                  description: post.content.rendered,
                  imgUrl: this.getPostBeitragsbild(post, "medium")
                } as TeamCardComponentModel)
            )
          } as TeamCardCollectionComponentModel)
      )
    );
  }

  /**
   * Returns a image url of a post image (Beitragsbild) whereas the size is the preferred size
   * If the preferred size is not available, the last available property from wordpress is used (normally this is 'full')
   * @param wordpressPost the wordress post
   * @param size the preferred size to use
   */
  private getPostBeitragsbild(wordpressPost: WordpressPostResponseModel, size: ImageSize = "large"): string {
    let featuredMedia =
      wordpressPost &&
      wordpressPost._embedded &&
      wordpressPost._embedded["wp:featuredmedia"] &&
      wordpressPost._embedded["wp:featuredmedia"][0];

    if (featuredMedia) {
      let sizesAvailable = Object.keys(featuredMedia.media_details.sizes);
      if (sizesAvailable.find((sizes) => sizes === size)) {
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
