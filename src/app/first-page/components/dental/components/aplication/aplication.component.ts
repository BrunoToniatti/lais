import { Component } from '@angular/core';
import { AplicationButtonComponent } from '../../../cilios/components/aplication-button/aplication-button.component';

@Component({
  selector: 'app-aplication',
  standalone: true,
  imports: [
    AplicationButtonComponent
  ],
  templateUrl: './aplication.component.html',
  styleUrl: './aplication.component.scss'
})
export class AplicationComponent {
whatsappLink = 'https://wa.me/5511961006415?text=' +
    encodeURIComponent('Olá! Gostaria de agendar uma aplicação de piercing dental.');
}
