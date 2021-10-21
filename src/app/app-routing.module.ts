import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiberDashboardFacade } from './shared/facades/stufen-facades/impl/biber-dashboard.facade';
import { ImprintDashboardComponent } from './components/routing-views/imprint/imprint-dashboard.component';
import { StartDashboardComponent } from './components/routing-views/start/start-dashboard.component';
import { StufenOverviewDashboardComponent } from './components/routing-views/stufen-overview/stufen-overview-dashboard.component';
import { GuspDashboardFacade } from './shared/facades/stufen-facades/impl/gusp-dashboard.facade';
import { RaroDashboardFacade } from './shared/facades/stufen-facades/impl/raro-dashboard.facade';
import { CaexDashboardFacade } from './shared/facades/stufen-facades/impl/caex-dashboard.facade';
import { ContactViewComponent } from './components/routing-views/contact/contact-view.component';
import { DownloadsDashboardComponent } from './components/routing-views/downloads/downloads-dashboard.component';
import { WiwoeDashboardFacade } from './shared/facades/stufen-facades/impl/wiwoe-dashboard.facade';
import { DatenschutzDashboardComponent } from './components/routing-views/datenschutz/datenschutz-dashboard.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: StartDashboardComponent
  },
  {
    path: "downloads",
    pathMatch: "full",
    component: DownloadsDashboardComponent
  },
  {
    path: "stufe",
    children: [
      {
        path: "biber",
        component: StufenOverviewDashboardComponent,
        data: { requiredService: BiberDashboardFacade }
      },
      {
        path: "wiwoe",
        component: StufenOverviewDashboardComponent,
        data: { requiredService: WiwoeDashboardFacade }
      },
      {
        path: "gusp",
        component: StufenOverviewDashboardComponent,
        data: { requiredService: GuspDashboardFacade }
      },
      {
        path: "caex",
        component: StufenOverviewDashboardComponent,
        data: { requiredService: CaexDashboardFacade }
      },
      {
        path: "raro",
        component: StufenOverviewDashboardComponent,
        data: { requiredService: RaroDashboardFacade }
      }
    ]
  },
  {
    path: "impressum",
    component: ImprintDashboardComponent
  },
  {
    path: "datenschutz",
    component: DatenschutzDashboardComponent
  },
  {
    path: "kontakt",
    component: ContactViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      scrollOffset: [0, 64]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
