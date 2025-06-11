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
      whatsMessage: 'Olá! Gostaria de agendar uma extensão de cílios.'
    },
    {
      image: 'assets/smile.jpg',
      title: 'Piercing no Dente',
      description: 'Brilho no sorriso com aplicação segura e estilosa.',
      whatsMessage: 'Olá! Tenho interesse em colocar piercing no dente.'
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

  abrirWhatsApp(mensagem: string) {
    const numero = '5511961006415'; // Exemplo: 5599999999999
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  }
}
