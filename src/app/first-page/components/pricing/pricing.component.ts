import { Component, computed, inject } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal.directive';
import { CatalogService } from '../../../shared/catalog.service';
import { formatPrice, whatsappLink } from '../../../shared/salon.data';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  private catalog = inject(CatalogService);
  styles = this.catalog.lash;
  panels = this.catalog.sidePanels;
  price = formatPrice;

  /** Preço grande do painel principal: único valor, ou "a partir de" o menor. */
  headline = computed(() => {
    const prices = this.styles().map((s) => s.price);
    if (!prices.length) return null;
    const min = Math.min(...prices);
    return { text: this.price(min), label: new Set(prices).size === 1 ? 'todos os estilos' : 'a partir de' };
  });
  whatsapp = whatsappLink('Olá! Vim pelo site e gostaria de agendar um horário.');
}
