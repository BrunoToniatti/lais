import { Component } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal.directive';
import { CARE_SERVICES, ServiceItem, formatPrice, whatsappLink } from '../../../shared/salon.data';

@Component({
  selector: 'app-care',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './care.component.html',
  styleUrl: './care.component.scss',
})
export class CareComponent {
  items = CARE_SERVICES;
  price = formatPrice;

  link(item: ServiceItem): string {
    return whatsappLink(item.message);
  }
}
