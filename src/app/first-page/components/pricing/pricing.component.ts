import { Component } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal.directive';
import { CARE_SERVICES, LASH_STYLES, PACKAGES, formatPrice, whatsappLink } from '../../../shared/salon.data';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  styles = LASH_STYLES;
  packages = PACKAGES;
  care = CARE_SERVICES;
  price = formatPrice;
  whatsapp = whatsappLink('Olá! Vim pelo site e gostaria de agendar um horário.');
}
