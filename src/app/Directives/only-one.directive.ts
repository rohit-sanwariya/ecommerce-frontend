import { Directive, ElementRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[OnlyOne]'
})
export class OnlyOneDirective implements OnInit {
  circelArr:Array<any> = []
  constructor(private element:ElementRef) {


   }
  ngOnInit(): void {
    this.circelArr.push(this.element.nativeElement);
    console.log(this.circelArr);


     fromEvent(this.element.nativeElement,'input').subscribe((val:InputEvent|any)=>{
       console.log(val.target.value);

     })
  }

}
