import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel-client',
  templateUrl: './carousel-client.component.html',
  styleUrls: ['./carousel-client.component.css']
})
export class CarouselClientComponent implements OnInit {

  showNavigationArrows = true;
  showNavigationIndicators = true;
  images = ["https://www.coooolstuff.com/wp-content/uploads/2020/07/O1CN01VyaTSO1TNxZH0hzCd-190502371-1.jpg","https://i.all3dp.com/cdn-cgi/image/fit=cover,w=1284,h=722,gravity=0.5x0.5,format=auto/wp-content/uploads/2019/02/19134741/yoda-an-iconic-figure-from-star-wars-is-popular-huanksta-pinshape-190217.jpg","https://static.turbosquid.com/Preview/001331/744/22/_D.jpg"];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
  }

}
