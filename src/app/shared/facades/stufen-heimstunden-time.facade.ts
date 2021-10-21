import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import {
  selectBiberHeimstundenInfos,
  selectCaExHeimstundenInfos,
  selectGuSpHeimstundenInfos,
  selectRaRoHeimstundenInfos,
  selectStufenInfosNeedHeimstundenInfos,
  selectWiWoeHeimstundenInfos
} from '../../root-store/stufen-info-store/selectors';
import { filter, first, map, mapTo, switchMap, tap } from 'rxjs/operators';
import {
  loadAllHeimstundenAction,
  loadAllHeimstundenSuccessAction,
  loadAllStufenErrorAction
} from '../../root-store/stufen-info-store/actions';
import { RootState } from '../../root-store/root-state';
import { Store } from '@ngrx/store';
import { WordpressService } from '../services/wordpress/wordpress.service';
import { HeimstundenTimeModel } from '../../components/routing-views/stufen-overview/stufen-overview-dashboard.component';
import { StufenHeimstundenTimeState, StufenTimeCollection } from '../../root-store/stufen-info-store/state';
import { WordpressCategoryEnum } from '../dictionary/wordpress-category.enum';
import { WordpressTagEnum } from '../dictionary/wordpress-tag.enum';
import { Memoize } from 'typescript-memoize';

@Injectable()
export class StufenHeimstundenTimeFacade {
  constructor(private store$: Store<RootState>, private wordpressService: WordpressService) {
  }

  private fetchAllHeimstundenInfos$(): Promise<void> {
    return this.store$.select(selectStufenInfosNeedHeimstundenInfos).pipe(
      first(),
      filter((needHeimstundenInfos) => needHeimstundenInfos),
      tap(() => this.store$.dispatch(loadAllHeimstundenAction())),
      switchMap(() => this.doFetchAllStufenTimes$()),
      tap({
          next: (heimstundenInfos) =>
            this.store$.dispatch(
              loadAllHeimstundenSuccessAction({
                payload: {
                  heimstundenInfos: heimstundenInfos
                }
              })
            ),
          error: err => this.store$.dispatch(loadAllStufenErrorAction(err))
        }
      ),
      mapTo(undefined)
    ).toPromise();
  }

  private doFetchAllStufenTimes$(): Observable<StufenTimeCollection> {
    const self = this;

    return forkJoin({
      biber: getHeimstundenTime(WordpressCategoryEnum.Biber),
      wiwoe: getHeimstundenTime(WordpressCategoryEnum.Wiwoe),
      gusp: getHeimstundenTime(WordpressCategoryEnum.Gusp),
      caex: getHeimstundenTime(WordpressCategoryEnum.Caex),
      raro: getHeimstundenTime(WordpressCategoryEnum.Raro)
    });

    function getHeimstundenTime(category: WordpressCategoryEnum): Observable<StufenHeimstundenTimeState> {
      return self.wordpressService.getWordpressPostByCategoryAndTag$(category, WordpressTagEnum.Time).pipe(
        map(
          (post) =>
            ({
              title: post.title.rendered,
              timeDescription: post.content.rendered
            } as StufenHeimstundenTimeState)
        )
      );
    }
  }

  @Memoize()
  heimstundenBiber$() {
    void this.fetchAllHeimstundenInfos$()

    return this.store$.select(selectBiberHeimstundenInfos);
  }

  heimstundenWiWoe$(): Observable<HeimstundenTimeModel> {
    void this.fetchAllHeimstundenInfos$()

    return this.store$.select(selectWiWoeHeimstundenInfos);
  }

  heimstundenGuSp$(): Observable<HeimstundenTimeModel> {
    void this.fetchAllHeimstundenInfos$()

    return this.store$.select(selectGuSpHeimstundenInfos);
  }

  heimstundenCaEx$(): Observable<HeimstundenTimeModel> {
    void this.fetchAllHeimstundenInfos$()

    return this.store$.select(selectCaExHeimstundenInfos);
  }

  heimstundenRaRo$(): Observable<HeimstundenTimeModel> {
    void this.fetchAllHeimstundenInfos$()

    return this.store$.select(selectRaRoHeimstundenInfos);
  }
}
