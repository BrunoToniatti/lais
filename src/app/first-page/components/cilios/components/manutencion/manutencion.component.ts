import { Component } from '@angular/core';
import { AplicationButtonComponent } from '../aplication-button/aplication-button.component';

@Component({
  selector: 'app-manutencion',
  standalone: true,
  imports: [
    AplicationButtonComponent
  ],
  templateUrl: './manutencion.component.html',
  styleUrl: './manutencion.component.scss'
})
export class ManutencionComponent {
  whatsappLink = 'https://wa.me/5511961006415?text=' +
    encodeURIComponent('Olá! Gostaria de agendar uma manutenção de cílios.');
}
