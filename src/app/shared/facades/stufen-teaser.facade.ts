import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../root-store/root-state';
import { WordpressService } from '../services/wordpress/wordpress.service';
import { forkJoin, Observable } from 'rxjs';
import { filter, first, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { StufenCardModel } from '../../components/components/stufen-card/stufen-card.model';
import { selectStufenInfosNeedTeaser, selectTeasersAll } from '../../root-store/stufen-info-store/selectors';
import {
  loadAllStufenTeasersAction,
  loadAllStufenTeasersErrorAction,
  loadAllStufenTeasersSuccessAction
} from '../../root-store/stufen-info-store/actions';
import { WordpressCategoryEnum } from '../dictionary/wordpress-category.enum';
import { WordpressTagEnum } from '../dictionary/wordpress-tag.enum';
import { removeHtmlTags } from '../utils/html-string/remove-html-tags.util';
import { StufenCardCollectionModel } from '../../components/components/stufen-card-collection/stufen-card-collection.model';

@Injectable()
export class StufenTeaserFacade {
  constructor(private store$: Store<RootState>, private wordpressService: WordpressService) {
  }

  public stufenTeasersAll$() {
    void this.fetchAllStufenTeasers$()

    return this.store$.select(selectTeasersAll);

  }

  private fetchAllStufenTeasers$(): Promise<void> {
    return this.store$
      .select(selectStufenInfosNeedTeaser)
      .pipe(
        first(),
        filter((needTeasers) => needTeasers),
        tap(() => this.store$.dispatch(loadAllStufenTeasersAction())),
        switchMap(() => this.doFetchAllStufenCards$()),
        tap({
          next: (stufenTeasers) =>
            this.store$.dispatch(
              loadAllStufenTeasersSuccessAction({
                payload: {
                  ...stufenTeasers
                }
              })
            ),
          error: error => this.store$.dispatch(loadAllStufenTeasersErrorAction(error))
        }),
        mapTo(undefined)
      ).toPromise();
  }

  private doFetchAllStufenCards$(): Observable<StufenCardCollectionModel> {
    const self = this;

    return forkJoin({
      biber: fetchSingleStufenCardModel(WordpressCategoryEnum.Biber, ['stufe', 'biber']),
      wiwoe: fetchSingleStufenCardModel(WordpressCategoryEnum.Wiwoe, ['stufe', 'wiwoe']),
      gusp: fetchSingleStufenCardModel(WordpressCategoryEnum.Gusp, ['stufe', 'gusp']),
      caex: fetchSingleStufenCardModel(WordpressCategoryEnum.Caex, ['stufe', 'caex']),
      raro: fetchSingleStufenCardModel(WordpressCategoryEnum.Raro, ['stufe', 'raro'])
    });

    function fetchSingleStufenCardModel(category: WordpressCategoryEnum, link: string[]): Observable<StufenCardModel> {
      return self.wordpressService.getWordpressPostByCategoryAndTag$(category, WordpressTagEnum.Teaser).pipe(
        map(
          (post) =>
            <StufenCardModel> {
              stufenUri: link,
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: removeHtmlTags(post.content.rendered),
              imgUrl: post._embedded['wp:featuredmedia'][0].source_url
            }
        )
      );
    }
  }
}
