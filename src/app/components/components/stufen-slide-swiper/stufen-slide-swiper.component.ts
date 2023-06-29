import { Component, OnInit, Input } from "@angular/core";
import { StufenCardModel } from "../stufen-card/stufen-card.model";
import { A11y, Mousewheel, Navigation, Pagination, SwiperOptions } from 'swiper';

@Component({
  selector: "app-stufen-slide-swiper",
  templateUrl: "./stufen-slide-swiper.component.html",
  styleUrls: ["./stufen-slide-swiper.component.css"]
})
export class StufenSlideSwiperComponent implements OnInit {
  public config: SwiperOptions = {
    modules: [Navigation, Pagination, A11y, Mousewheel],
    init: false,
    autoHeight: true,
    spaceBetween: 20,
    navigation: true,
    pagination: false,
    slidesPerView: 4,
    centeredSlides: false,
  }

  @Input() stufenModels: StufenCardModel[];

  ngOnInit() {}
}
