import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
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

  currentIndex = 0;

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

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
