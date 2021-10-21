import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { StufenCardModel } from '../../components/components/stufen-card/stufen-card.model';
import {
  selectBiberStufenInfos,
  selectCaExStufenInfos,
  selectGuSpStufenInfos,
  selectRaRoStufenInfos,
  selectStufenInfosNeedStufenInfos,
  selectWiWoeStufenInfos
} from '../../root-store/stufen-info-store/selectors';
import { filter, first, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { loadAllStufenAction, loadAllStufenErrorAction, loadAllStufenSuccessAction } from '../../root-store/stufen-info-store/actions';
import { RootState } from '../../root-store/root-state';
import { Store } from '@ngrx/store';
import { WordpressService } from '../services/wordpress/wordpress.service';
import { WordpressCategoryEnum } from '../dictionary/wordpress-category.enum';
import { WordpressTagEnum } from '../dictionary/wordpress-tag.enum';
import { flatMultipleLineBreaks } from '../utils/html-string/flat-multiple-line-breaks.util';
import { StufenCardCollectionModel } from '../../components/components/stufen-card-collection/stufen-card-collection.model';
import { Memoize } from 'typescript-memoize';

@Injectable()
export class StufenDescriptionFacade {
  constructor(private store$: Store<RootState>, private wordpressService: WordpressService) {
  }

  @Memoize()
  private async doFetchStufenInfos$(): Promise<void> {
    return this.store$
      .select(selectStufenInfosNeedStufenInfos)
      .pipe(
        first(),
        filter((needStufenInfos) => needStufenInfos),
        tap(() => this.store$.dispatch(loadAllStufenAction())),
        switchMap(() => this.fetchAllStufenInfos()),
        tap({
          next: (stufenInfos) =>
            this.store$.dispatch(
              loadAllStufenSuccessAction({
                payload: {
                  ...stufenInfos
                }
              })
            ),
          error: error => this.store$.dispatch(loadAllStufenErrorAction(error))
        }),
        mapTo(undefined),
      ).toPromise();
  }

  private fetchAllStufenInfos(): Observable<StufenCardCollectionModel> {
    const self = this;

    return forkJoin({
      biber: getStufenCardModel(
        WordpressCategoryEnum.Biber,
        ['stufe', 'biber'],
        'https://www.66er.net/wp-content/uploads/biber.jpg'
      ),
      wiwoe: getStufenCardModel(
        WordpressCategoryEnum.Wiwoe,
        ['stufe', 'wiwoe'],
        'https://www.66er.net/wp-content/uploads/wiwoe.jpg'
      ),
      gusp: getStufenCardModel(
        WordpressCategoryEnum.Gusp,
        ['stufe', 'gusp'],
        'https://www.66er.net/wp-content/uploads/gusp.png'
      ),
      caex: getStufenCardModel(
        WordpressCategoryEnum.Caex,
        ['stufe', 'caex'],
        'https://www.66er.net/wp-content/uploads/caex.jpg'
      ),
      raro: getStufenCardModel(
        WordpressCategoryEnum.Raro,
        ['stufe', 'raro'],
        'https://www.66er.net/wp-content/uploads/raro.png'
      )
    });

    function getStufenCardModel(
      category: WordpressCategoryEnum,
      link: string[],
      imageUrl: string
    ): Observable<StufenCardModel> {
      return self.wordpressService.getWordpressPostByCategoryAndTag$(category, WordpressTagEnum.Content).pipe(
        map(
          (post) =>
            <StufenCardModel> {
              stufenUri: link,
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: flatMultipleLineBreaks(post.content.rendered),
              imgUrl: imageUrl
            }
        )
      );
    }
  }

  public stufenInfoBiber$() {
    void this.doFetchStufenInfos$();

    return this.store$.select(selectBiberStufenInfos);
  }

  public stufenInfoWiWoe$() {
    void this.doFetchStufenInfos$()

    return this.store$.select(selectWiWoeStufenInfos);

  }

  public stufenInfoGuSp$() {
    void this.doFetchStufenInfos$()

    return this.store$.select(selectGuSpStufenInfos);

  }

  public stufenInfoCaEx$() {
    void this.doFetchStufenInfos$()

    return this.store$.select(selectCaExStufenInfos);
  }

  public stufenInfoRaRo$() {
    void this.doFetchStufenInfos$()

    return this.store$.select(selectRaRoStufenInfos);

  }
}

export type ImageSize =
  | 'thumbnail'
  | 'medium'
  | 'onepress-blog-small'
  | 'onepress-small'
  | 'full'
  | 'large'
  | 'original';
