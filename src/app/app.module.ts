import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MyFacebookService } from "./shared/services/facebook/my-facebook.service";
import { HttpClientModule } from "@angular/common/http";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { WordpressService } from "./shared/services/wordpress/wordpress.service";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RootStoreModule } from "./root-store";
import { StufenDescriptionFacade } from "./shared/facades/stufen-description-facade.service";
import { MyFacebookFacade } from "./shared/facades/facebook/my-facebook.facade";
import { DownloadsFacade } from "./shared/facades/downloads/downloads.facade";
import { WiwoeDashboardFacade } from "./shared/facades/stufen-facades/impl/wiwoe-dashboard.facade";
import { BiberDashboardFacade } from "./shared/facades/stufen-facades/impl/biber-dashboard.facade";
import { GuspDashboardFacade } from "./shared/facades/stufen-facades/impl/gusp-dashboard.facade";
import { CaexDashboardFacade } from "./shared/facades/stufen-facades/impl/caex-dashboard.facade";
import { RaroDashboardFacade } from "./shared/facades/stufen-facades/impl/raro-dashboard.facade";
import { CalendarFacade } from "./shared/facades/google-calendar/calendar-facade.service";
import { registerLocaleData } from "@angular/common";
import localeDeAt from "@angular/common/locales/de-AT";
import { BreakpointService } from "./shared/services/breakpoint/breakpoint.service";
import { RoutingViewsModule } from "./components/routing-views/routing-views.module";
import { ComponentsModule } from "./components/components/components.module";
import { LoadingSpinner } from "./components/components/loading-spinner/loading-spinner.component";
import { SidebarModule } from "ng-sidebar";
import { EntriesModule } from "./components/entries/entries.module";
import { ConfigurationService } from "./shared/services/configuration/configuration.service";
import { StufenTeaserFacade } from "./shared/facades/stufen-teaser.facade";
import { StufenTeamPostFacade } from "./shared/facades/stufen-team-post.facade";
import { StufenHeimstundenTimeFacade } from "./shared/facades/stufen-heimstunden-time.facade";
import { MarkdownModule, MarkedOptions } from "ngx-markdown";
import { SummerEventService } from "./shared/services/summer-event/summer-event.service";
import { OverlayModule } from "./components/overlay/overlay.module";
import { Summer2020Facade } from "./shared/facades/summer-2020/summer-2020.facade";

registerLocaleData(localeDeAt, "de-AT");

export function initializeApp(configurationService: ConfigurationService) {
  return () => configurationService.loadConfigFromServer();
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModalModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    RootStoreModule,
    OverlayModule,
    ComponentsModule,
    RoutingViewsModule,
    EntriesModule,
    SidebarModule.forRoot(),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: false,
          smartLists: true,
          smartypants: false
        }
      }
    })
  ],
  declarations: [AppComponent],
  providers: [
    MyFacebookService,
    WordpressService,
    BreakpointService,
    ConfigurationService,
    SummerEventService,

    StufenDescriptionFacade,
    StufenTeaserFacade,
    StufenTeamPostFacade,
    StufenHeimstundenTimeFacade,
    BiberDashboardFacade,
    WiwoeDashboardFacade,
    GuspDashboardFacade,
    CaexDashboardFacade,
    RaroDashboardFacade,
    Summer2020Facade,

    MyFacebookFacade,
    DownloadsFacade,
    CalendarFacade,

    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigurationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoadingSpinner]
})
export class AppModule {}
