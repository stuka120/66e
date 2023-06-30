import { NgModule } from "@angular/core";
import { IsLoadingDirective } from "./is-loading.directive";
import { SwiperDirective } from './swiper.directive';

@NgModule({
  declarations: [IsLoadingDirective, SwiperDirective],
  exports: [IsLoadingDirective, SwiperDirective]
})
export class DirectivesModule {}
