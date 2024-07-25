import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SwipeService } from '../../services/swipe.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit, AfterViewInit {
  @ViewChild('swipeContainer') swipeContainer!: ElementRef;

  constructor(private swipeService: SwipeService, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.swipeService.enableSwipe(this.swipeContainer);
    this.setArrows();
  }
 // feature a set of arrows for easier swipe action
  setArrows(): void {
    const container = this.swipeContainer.nativeElement;
    const nextButton = container.parentElement.querySelector('.swiper-button-next');
    const prevButton = container.parentElement.querySelector('.swiper-button-prev');

    if (nextButton && prevButton) {
      nextButton.addEventListener('click', () => {
        container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
      });

      prevButton.addEventListener('click', () => {
        container.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' });
      });

      this.renderer.listen(container, 'scroll', () => {
        const scrollLeft = container.scrollLeft;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        if (scrollLeft === 0) {
          this.renderer.addClass(prevButton, 'hidden');
        } else {
          this.renderer.removeClass(prevButton, 'hidden');
        }

        if (scrollLeft >= maxScrollLeft) {
          this.renderer.addClass(nextButton, 'hidden');
        } else {
          this.renderer.removeClass(nextButton, 'hidden');
        }
      });
    } else {
      console.error('Next or Previous buttons not found');
    }
  }
}
