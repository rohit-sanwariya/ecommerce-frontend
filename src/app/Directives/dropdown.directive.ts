import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive,ElementRef,EventEmitter,HostListener, Inject, OnDestroy, Output } from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';


@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective implements AfterViewInit,OnDestroy {
  @Output() dropdownClickedOutside = new EventEmitter<void>()
  clickSubscription!:Subscription

  constructor(private element:ElementRef,@Inject(DOCUMENT) private document:Document,) { }
  ngOnDestroy(): void {
   this.clickSubscription?.unsubscribe()
  }
  ngAfterViewInit(): void {
  this.clickSubscription =  fromEvent(this.document,'click').pipe(
      filter(
      (event:Event)=> !this.isInside(event.target as HTMLElement)


    )
    ).subscribe((val)=>{
      this.dropdownClickedOutside.emit()

    })

  }

  isInside(elementToCheck:HTMLElement){
    return elementToCheck === this.element.nativeElement || this.element.nativeElement.contains(elementToCheck)
  }

}
