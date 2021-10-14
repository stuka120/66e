import { Injectable } from "@angular/core";
import { forkJoin, Observable, throwError } from "rxjs";
import {
  selectBiberHeimstundenInfos,
  selectCaExHeimstundenInfos,
  selectGuSpHeimstundenInfos,
  selectRaRoHeimstundenInfos,
  selectStufenInfosNeedHeimstundenInfos,
  selectWiWoeHeimstundenInfos
} from "../../root-store/stufen-info-store/selectors";
import { catchError, filter, map, share, startWith, switchMap, tap } from "rxjs/operators";
import {
  loadAllHeimstundenAction,
  loadAllHeimstundenSuccessAction,
  loadAllStufenErrorAction
} from "../../root-store/stufen-info-store/actions";
import { RootState } from "../../root-store/root-state";
import { Store } from "@ngrx/store";
import { WordpressService } from "../services/wordpress/wordpress.service";
import { HeimstundenTimeModel } from "../../components/routing-views/stufen-overview/stufen-overview-dashboard.component";
import { StufenHeimstundenTimeState, StufenTimeCollection } from "../../root-store/stufen-info-store/state";
import { WordpressCategoryEnum } from "../dictionary/wordpress-category.enum";
import { WordpressTagEnum } from "../dictionary/wordpress-tag.enum";
import { muteFirst } from "../utils/rxjs/mute-first.util";
import { Memoize } from 'typescript-memoize';

@Injectable()
export class StufenHeimstundenTimeFacade {
  constructor(private store$: Store<RootState>, private wordpressService: WordpressService) {}

  @Memoize()
  private fetchAllHeimstundenInfos$() {
    return this.store$.select(selectStufenInfosNeedHeimstundenInfos).pipe(
      filter((needHeimstundenInfos) => needHeimstundenInfos),
      tap(() => this.store$.dispatch(loadAllHeimstundenAction())),
      switchMap(() => this.doFetchAllStufenTimes$()),
      tap((heimstundenInfos) =>
        this.store$.dispatch(
          loadAllHeimstundenSuccessAction({
            payload: {
              heimstundenInfos: heimstundenInfos
            }
          })
        )
      ),
      catchError((err) => {
        this.store$.dispatch(loadAllStufenErrorAction(err));
        return throwError(err);
      }),
      share()
    );
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
    return muteFirst(
      this.fetchAllHeimstundenInfos$(),
      this.store$.select(selectBiberHeimstundenInfos)
    );
  }

  @Memoize()
  heimstundenWiWoe$(): Observable<HeimstundenTimeModel> {
    return muteFirst(
      this.fetchAllHeimstundenInfos$(),
      this.store$.select(selectWiWoeHeimstundenInfos)
    );
  }

  @Memoize()
  heimstundenGuSp$(): Observable<HeimstundenTimeModel> {
    return muteFirst(
      this.fetchAllHeimstundenInfos$(),
      this.store$.select(selectGuSpHeimstundenInfos)
    );
  }

  @Memoize()
  heimstundenCaEx$(): Observable<HeimstundenTimeModel> {
    return muteFirst(
      this.fetchAllHeimstundenInfos$(),
      this.store$.select(selectCaExHeimstundenInfos)
    );
  }

  @Memoize()
  heimstundenRaRo$(): Observable<HeimstundenTimeModel> {
    return muteFirst(
      this.fetchAllHeimstundenInfos$(),
      this.store$.select(selectRaRoHeimstundenInfos)
    );
  }
}
