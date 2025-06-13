import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  items = [
    {
      image: 'assets/cilios.jpg',
      title: 'Extensão de Cílios',
      description: 'Realce o seu olhar com fios naturais e volume perfeito.',
      type: 'aplication-c'
    },
    {
      image: 'assets/smile.jpg',
      title: 'Piercing no Dente',
      description: 'Brilho no sorriso com aplicação segura e estilosa.',
      type: 'aplication-d'
    }
  ];

  constructor(private ngZone: NgZone) { }

  currentIndex = 0;
  interval: any;

  touchStartX = 0;
  touchEndX = 0;

  ngOnInit() {
    if (this.items.length > 1) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getTransform() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  prevSlide() {
    this.currentIndex =
      this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
  }

  nextSlide() {
    this.currentIndex =
      this.currentIndex === this.items.length - 1 ? 0 : this.currentIndex + 1;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  startAutoSlide() {
    this.ngZone.runOutsideAngular(() => {
      this.interval = setInterval(() => {
        this.ngZone.run(() => {
          this.nextSlide();
        });
      }, 7000);
    });
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    const deltaX = this.touchEndX - this.touchStartX;
    if (Math.abs(deltaX) > 40) { // Sensibilidade do swipe
      if (deltaX < 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.startAutoSlide();
    }
  }
}
