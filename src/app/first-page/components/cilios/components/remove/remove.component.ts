import { Component } from '@angular/core';
import { AplicationButtonComponent } from '../aplication-button/aplication-button.component';

@Component({
  selector: 'app-remove',
  standalone: true,
  imports: [
    AplicationButtonComponent
  ],
  templateUrl: './remove.component.html',
  styleUrl: './remove.component.scss'
})
export class RemoveComponent {
  whatsappLink = 'https://wa.me/5511961006415?text=' +
  encodeURIComponent('Olá! Gostaria de agendar uma remoção de cílios.');
}
