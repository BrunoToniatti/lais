import { Component } from '@angular/core';

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss'
})
export class PromotionComponent {
  whatsappLink = 'https://wa.me/5511961006415?text=' +
    encodeURIComponent('Olá! Gostaria de agendar um piercing dental. *Vim pelo Piri*');

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
