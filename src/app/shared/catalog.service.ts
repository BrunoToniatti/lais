import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, computed, signal } from '@angular/core';
import { FALLBACK_SERVICES, LOCAL_IMAGES } from './catalog.fallback';
import { PLATFORM_API_URL } from './platform.config';

export type CatalogCategory = 'lash' | 'care' | 'package' | 'brow' | 'other';

export interface CatalogItem {
  slug: string;
  name: string;
  category: CatalogCategory;
  description: string;
  price: number;
  prefix: string;
  img: string;
  highlight: boolean;
  heroLabel: string;
}

interface ApiService {
  slug: string;
  name: string;
  category: CatalogCategory;
  category_label: string;
  description: string;
  price: string;
  price_prefix: string;
  image_url: string;
  highlight: boolean;
  hero_label: string;
}

const CATEGORIES: CatalogCategory[] = ['lash', 'care', 'package', 'brow', 'other'];
const FETCH_TIMEOUT_MS = 4000;

/**
 * Serviços e preços do site. Nasce com os valores de reserva (o site nunca fica sem preço)
 * e, quando a plataforma responde, passa a mostrar o que a Laís cadastrou no painel.
 */
@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly items = signal<CatalogItem[]>(FALLBACK_SERVICES);

  readonly lash = computed(() => this.by('lash'));
  readonly care = computed(() => this.by('care'));
  readonly packages = computed(() => this.by('package'));
  readonly brow = computed(() => this.by('brow'));
  readonly other = computed(() => this.by('other'));
  readonly highlights = computed(() => this.items().filter((i) => i.highlight).slice(0, 2));

  /** Categorias que aparecem na tabela de valores, ao lado da principal (extensão). */
  readonly sidePanels = computed(() =>
    [
      { title: 'Pacote', items: this.packages() },
      { title: 'Sobrancelha', items: this.brow() },
      { title: 'Outros', items: this.other() },
    ].filter((p) => p.items.length),
  );

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    if (isPlatformBrowser(platformId)) void this.load();
  }

  private by(category: CatalogCategory): CatalogItem[] {
    return this.items().filter((i) => i.category === category);
  }

  private async load(): Promise<void> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const response = await fetch(`${PLATFORM_API_URL}/public/services/`, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) return;
      const data: unknown = await response.json();
      const items = Array.isArray(data) ? data.map((s) => this.toItem(s as ApiService)).filter((s): s is CatalogItem => !!s) : [];
      // Lista vazia vinda da API não apaga o site: mantém os valores de reserva.
      if (items.length) this.items.set(items);
    } catch {
      /* API fora do ar ou lenta: o site segue com os valores de reserva */
    } finally {
      clearTimeout(timer);
    }
  }

  private toItem(s: ApiService): CatalogItem | null {
    const price = Number(s?.price);
    if (!s?.slug || !s?.name || !Number.isFinite(price) || !CATEGORIES.includes(s.category)) return null;
    return {
      slug: s.slug,
      name: s.name,
      category: s.category,
      description: s.description ?? '',
      price,
      prefix: s.price_prefix ?? '',
      img: s.image_url ? this.optimize(s.image_url) : (LOCAL_IMAGES[s.slug] ?? ''),
      highlight: !!s.highlight,
      heroLabel: s.hero_label ?? '',
    };
  }

  /** Cloudinary entrega a foto já reduzida e no melhor formato (WebP/AVIF) para cada aparelho. */
  private optimize(url: string): string {
    try {
      const u = new URL(url);
      if (u.protocol !== 'https:' && u.protocol !== 'http:') return '';
      if (u.hostname === 'res.cloudinary.com' && u.pathname.includes('/image/upload/') && !/\/image\/upload\/[a-z]_/.test(u.pathname)) {
        u.pathname = u.pathname.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_900/');
      }
      return u.href;
    } catch {
      return '';
    }
  }
}
