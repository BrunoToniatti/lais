import { Component } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal.directive';
import { ScrollService } from '../../../shared/scroll.service';
import { LASH_STYLES, PACKAGES, formatPrice, whatsappLink } from '../../../shared/salon.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  whatsapp = whatsappLink('Olá! Vim pelo site e gostaria de agendar uma extensão de cílios.');
  lashPrice = formatPrice(LASH_STYLES[0].price);
  packagePrice = formatPrice(PACKAGES[0].price);

  constructor(public scroller: ScrollService) {}
}
