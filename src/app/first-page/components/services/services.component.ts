import { Component } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal.directive';
import { LASH_STYLES, LashStyle, formatPrice, whatsappLink } from '../../../shared/salon.data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  styles = LASH_STYLES;
  price = formatPrice;

  link(style: LashStyle): string {
    return whatsappLink(`Olá! Gostaria de agendar um cílios estilo ${style.name}.`);
  }
}
