import { Component } from '@angular/core';

@Component({
  selector: 'app-remove',
  standalone: true,
  imports: [],
  templateUrl: './remove.component.html',
  styleUrl: './remove.component.scss'
})
export class RemoveComponent {
  whatsappLink = 'https://wa.me/5511961006415?text=' +
  encodeURIComponent('Olá! Gostaria de agendar uma remoção de cílios.');
}
