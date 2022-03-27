import { Component, Input, OnInit } from '@angular/core';
import { ImageSchema } from 'src/app/Interfaces/image-schema';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {
    @Input() content!:ImageSchema;
  constructor() { }

  ngOnInit(): void {
  }

}
