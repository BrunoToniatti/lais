import { Component } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal.directive';
import { ScrollService } from '../../../shared/scroll.service';
import { CatalogService } from '../../../shared/catalog.service';
import { formatPrice, whatsappLink } from '../../../shared/salon.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  whatsapp = whatsappLink('Olá! Vim pelo site e gostaria de agendar uma extensão de cílios.');
  price = formatPrice;

  constructor(
    public scroller: ScrollService,
    public catalog: CatalogService,
  ) {}
}
