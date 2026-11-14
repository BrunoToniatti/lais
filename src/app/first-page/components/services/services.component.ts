import { Component, computed, inject } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal.directive';
import { CatalogItem, CatalogService } from '../../../shared/catalog.service';
import { formatPrice, whatsappLink } from '../../../shared/salon.data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  private catalog = inject(CatalogService);
  styles = this.catalog.lash;
  price = formatPrice;
  /** O aviso "todos com o mesmo valor" só aparece enquanto for verdade. */
  samePrice = computed(() => new Set(this.styles().map((s) => s.price)).size <= 1);

  link(style: CatalogItem): string {
    return whatsappLink(`Olá! Gostaria de agendar um cílios estilo ${style.name}.`);
  }
}
