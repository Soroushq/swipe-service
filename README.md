# swipe-service
a swipe service script to use instead of having scrollers and using out-dated modules and swiper in your angular project
simply create a new service using "ng generate service swipe" in your angular cli, and add these code to the ts file (NOT spec.ts file), a
and use it in your component of your liking,
just remember to call this service in the ts file of your desired component and import the necessary libraries and modules, like these:
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { SwipeService } from '../../services/swipe.service';
...
...
 and in the export section your code should be sth like this:
export class ServicesSampleComponent implements AfterViewInit{
  @ViewChild('swipeContainer') swipeContainer!: ElementRef;

  constructor(private swipeService: SwipeService) { }

  ngAfterViewInit() {
    this.swipeService.enableSwipe(this.swipeContainer);
  }

}

furthur instruction and points are added to the code after // .

Good luck
