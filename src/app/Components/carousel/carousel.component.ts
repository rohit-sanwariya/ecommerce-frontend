import { Component, OnInit } from '@angular/core';
import { Images } from 'src/assets/Images';
import { ImageSchema } from 'src/app/Interfaces/image-schema';
import { trigger, state, style, animate, transition } from '@angular/animations'
let currentImageIdx = 0
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  // animations:[
  //   trigger('slider',[
  //     state('left',style({
  //       transform: `translateX(${-100*currentImageIdx}vw)`
  //     })),

  //     // state('center',style({ transform:'translateX(0)'})),
  //     state('right',style({ transform:'translateX(100vw)'})),

  //   transition('left<=>center',[
  //     animate('500ms cubic-bezier(.17,.67,.88,.1)')
  //   ])
  // ]),
  // ]
})
export class CarouselComponent implements OnInit {

  images: ImageSchema[] = Images
  currentImageIdx: number = 0

  constructor() { }

  ngOnInit(): void {
  }
  slideLeft() {

    // 0 1 2
    if (this.currentImageIdx === 0) {

      this.currentImageIdx = this.images.length - 1
      currentImageIdx = this.images.length - 1
    }
    else {
      this.currentImageIdx--;
      currentImageIdx--;
    }
    //

  }
  slideRight() {
    // 0 1 2
    if (this.currentImageIdx === this.images.length - 1) {
      this.currentImageIdx = 0;
    }
    else {
      this.currentImageIdx++;
    }

  }
}
