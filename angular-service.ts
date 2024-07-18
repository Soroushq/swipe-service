import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwipeService {
  constructor() {}

  enableSwipe(swipeContainer: ElementRef): void {
    const element = swipeContainer.nativeElement;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    element.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      element.classList.add('active');
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    });

    element.addEventListener('mouseleave', () => {
      isDown = false;
      element.classList.remove('active');
    });

    element.addEventListener('mouseup', () => {
      isDown = false;
      element.classList.remove('active');
    });

    element.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      element.scrollLeft = scrollLeft - walk;
    });

    element.addEventListener('touchstart', (e: TouchEvent) => {
      isDown = true;
      startX = e.touches[0].pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    });

    element.addEventListener('touchend', () => {
      isDown = false;
    });

    element.addEventListener('touchmove', (e: TouchEvent) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - element.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      element.scrollLeft = scrollLeft - walk;
    });
  }
}
