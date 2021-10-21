import { AppConfig } from "../../model/config/app.config";
import { HttpClient } from "@angular/common/http";
import { catchError, switchMap, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { RootState } from "../../../root-store/root-state";
import {
  loadConfigAction,
  loadConfigErrorAction,
  loadConfigSuccessAction
} from "../../../root-store/config-store/actions";
import { selectConfig } from "../../../root-store/config-store/selectors";

@Injectable()
export class ConfigurationService {
  constructor(private http: HttpClient, private store$: Store<RootState>) {}

  loadConfigFromServer(): Promise<AppConfig | undefined> {
    const jsonFile = `assets/config.json`;

    this.store$.dispatch(loadConfigAction());

    return this.http
      .get<AppConfig>(jsonFile)
      .pipe(
        tap({
          next: config => this.store$.dispatch(loadConfigSuccessAction({payload: {config}})),
          error: () => this.store$.dispatch(loadConfigErrorAction())
        }),
        catchError(() => of(undefined))
      )
      .toPromise();
  }

  getConfig$(): Observable<AppConfig | null> {
    return this.store$
      .select(selectConfig)
      .pipe(
        switchMap((config) => (config == null ? from(this.loadConfigFromServer()) : of(config))));
  }
}
