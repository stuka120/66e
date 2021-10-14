import { combineLatest, Observable } from "rxjs";
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

export function muteFirst<T, R>(first$: Observable<T>, second$: Observable<R>): Observable<R> {
  return combineLatest([first$.pipe(startWith(undefined)), second$]).pipe(
    map(([, second]) => second),
    distinctUntilChanged()
  );
}
