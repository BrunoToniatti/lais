import { Component } from '@angular/core';

@Component({
  selector: 'app-aplication',
  standalone: true,
  imports: [],
  templateUrl: './aplication.component.html',
  styleUrl: './aplication.component.scss'
})
export class AplicationComponent {
whatsappLink = 'https://wa.me/55XXXXXXXXXXX?text=' +
    encodeURIComponent('Olá! Gostaria de agendar uma aplicação de piercing no dente.');
}
