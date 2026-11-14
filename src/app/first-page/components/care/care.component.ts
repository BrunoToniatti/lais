import { Component, inject } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal.directive';
import { CatalogItem, CatalogService } from '../../../shared/catalog.service';
import { formatPrice, whatsappLink } from '../../../shared/salon.data';

@Component({
  selector: 'app-care',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './care.component.html',
  styleUrl: './care.component.scss',
})
export class CareComponent {
  items = inject(CatalogService).care;
  price = formatPrice;

  link(item: CatalogItem): string {
    return whatsappLink(`Olá! Gostaria de agendar ${item.name.toLowerCase()}.`);
  }
}
