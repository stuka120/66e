import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {HeroBannerModel} from "./hero-banner.model";

@Component({
  selector: "app-hero-banner",
  templateUrl: "./hero-banner.component.html",
  styleUrls: ["./hero-banner.component.css"]
})
export class HeroBannerComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  // @ts-ignore
  @ViewChild("morphextElement")
  nativeMorphextContainer: ElementRef;
  morphextText: any;

  @Input()
  model: HeroBannerModel;

  ngAfterViewInit(): void {
    this.morphextText = $(this.nativeMorphextContainer.nativeElement);
    this.morphextText.Morphext({
      animation: "fadeIn", // Overrides default "bounceIn"
      separator: ",", // Overrides default ","
      speed: 3000 // Overrides default 2000
    });
  }


  ngOnInit() {
  }

}
