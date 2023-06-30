import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NewsCardComponent } from './news-card/news-card.component';
import { StufenCardComponent } from './stufen-card/stufen-card.component';
import { NewsCardCollectionComponent } from './news-card-collection/news-card-collection.component';
import { StufenCardCollectionComponent } from './stufen-card-collection/stufen-card-collection.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { StickyNoteComponent } from './sticky-note/sticky-note.component';
import { TeamCardComponent } from './team-card/team-card.component';
import { TeamCardCollectionComponent } from './team-card-collection/team-card-collection.component';
import { DownloadsCardComponent } from './downloads-card/downloads-card.component';
import { DownloadsCardItemComponent } from './downloads-card-item/downloads-card-item.component';
import { UpcomingEventCollectionComponent } from './upcoming-event-collection/upcoming-event-collection.component';
import { UpcomingEventComponent } from './upcoming-event/upcoming-event.component';
import { StufenSlideComponent } from './stufen-slide/stufen-slide.component';
import { StufenSlideSwiperComponent } from './stufen-slide-swiper/stufen-slide-swiper.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { IframeComponent } from './iframe/iframe.component';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';
import { LoadingImage } from './loading-image/loading-image.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlertComponent } from './alert/alert.component';
import { MarkdownModule } from 'ngx-markdown';
import { EventCardComponent } from './event-card/event-card.component';
import { PipeModule } from '../../shared/pipes/pipe.module';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { IframeCardComponent } from './iframe-card/iframe-card.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule,
    PipeModule,
    DirectivesModule,
    MarkdownModule
  ],
  declarations: [
    NewsCardComponent,
    StufenCardComponent,
    NewsCardCollectionComponent,
    StufenCardCollectionComponent,
    HeroBannerComponent,
    StickyNoteComponent,
    TeamCardComponent,
    TeamCardCollectionComponent,
    DownloadsCardComponent,
    DownloadsCardItemComponent,
    UpcomingEventCollectionComponent,
    UpcomingEventComponent,
    StufenSlideComponent,
    StufenSlideSwiperComponent,
    FooterComponent,
    IframeComponent,
    LoadingSpinner,
    LoadingImage,
    NavbarComponent,
    AlertComponent,
    EventCardComponent,
    IframeCardComponent
  ],
  exports: [
    NewsCardComponent,
    StufenCardComponent,
    NewsCardCollectionComponent,
    StufenCardCollectionComponent,
    HeroBannerComponent,
    StickyNoteComponent,
    TeamCardComponent,
    TeamCardCollectionComponent,
    DownloadsCardComponent,
    DownloadsCardItemComponent,
    UpcomingEventCollectionComponent,
    UpcomingEventComponent,
    StufenSlideComponent,
    StufenSlideSwiperComponent,
    FooterComponent,
    IframeComponent,
    LoadingSpinner,
    LoadingImage,
    NavbarComponent,
    AlertComponent,
    EventCardComponent,
    IframeCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
