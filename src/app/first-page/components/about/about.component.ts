import { Component } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  highlights = ['Atendimento personalizado', 'Higiene e segurança', 'Resultado natural e duradouro'];
}
