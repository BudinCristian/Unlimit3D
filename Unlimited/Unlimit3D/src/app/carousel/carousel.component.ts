import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class CarouselComponent implements OnInit {

  showNavigationArrows = true;
  showNavigationIndicators = true;
    images = [/*"https://www.vippng.com/png/detail/451-4516305_3d-printed-flexible-iphone-case-3d-printed-tpu.png", "https://cdn.thingiverse.com/assets/d2/50/3b/24/62/card_preview_20191223_075024_mod.jpg",*/ "assets/PikaUnlimit3D.jpg", "assets/SignInUnlimit3D.jpg", "assets/orderUnlimit3D.jpg"];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
  }

}
