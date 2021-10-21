import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordpressPostResponseModel } from '../../model/responses/wordpress/wordpress-post-response.model';
import { RootState } from '../../../root-store/root-state';
import { Store } from '@ngrx/store';
import { selectPostsNeedPosts, selectPostsPosts } from '../../../root-store/posts-store/selectors';
import { filter, first, mapTo, switchMap, tap } from 'rxjs/operators';
import { loadNewsAction, loadNewsErrorAction, loadNewsSuccessAction } from '../../../root-store/posts-store/actions';
import { MyFacebookService } from '../../services/facebook/my-facebook.service';

@Injectable()
export class MyFacebookFacade {
  constructor(private myFacebookService: MyFacebookService, private store$: Store<RootState>) {}

  getPosts$(): Observable<WordpressPostResponseModel[]> {
    void this.doFetchPostCollection()

    return this.store$.select(selectPostsPosts);
  }

  private doFetchPostCollection(): Promise<void> {
    return this.store$.select(selectPostsNeedPosts).pipe(
      first(),
      filter((needPosts) => needPosts),
      tap(() => this.store$.dispatch(loadNewsAction())),
      switchMap(() => this.myFacebookService.getPosts$()),
      tap({
        next: posts => this.store$.dispatch(loadNewsSuccessAction({ payload: { posts: posts } })),
        error: err => this.store$.dispatch(loadNewsErrorAction(err))
      }),
      mapTo(undefined)
    ).toPromise();
  }
}
