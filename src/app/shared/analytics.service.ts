import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';

type Params = Record<string, string | number | boolean>;

/**
 * Envia eventos para o dataLayer do GTM (GA4).
 *
 * Os cliques são capturados por UM listener delegado no document. Para dar contexto a um elemento,
 * basta marcar no template:
 *   data-track="whatsapp_click" data-track-location="hero" data-track-service-name="Volume Wispy"
 * O valor de data-track vira o nome do evento e cada data-track-* vira um parâmetro em snake_case
 * (data-track-service-name -> service_name). Cliques sem data-track viram `generic_click`.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly isBrowser: boolean;
  private started = false;
  private readonly numeric = new Set(['price', 'position', 'value']);

  constructor(
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /** Liga cliques, profundidade de rolagem, seções vistas e tempo na página. */
  start(): void {
    if (!this.isBrowser || this.started) return;
    this.started = true;

    this.zone.runOutsideAngular(() => {
      this.document.addEventListener('click', (e) => this.onClick(e), { capture: true });
      this.trackScrollDepth();
      this.trackSections();
      this.trackTimeOnPage();
    });
  }

  track(event: string, params: Params = {}): void {
    if (!this.isBrowser) return;
    const w = this.document.defaultView as unknown as { dataLayer?: object[] };
    (w.dataLayer = w.dataLayer || []).push({ event, ...params });
  }

  private onClick(e: MouseEvent): void {
    const target = e.target as Element | null;
    if (!target?.closest) return;

    const tracked = target.closest<HTMLElement>('[data-track]');
    const interactive = target.closest<HTMLElement>('a, button');
    const el = tracked ?? interactive ?? (target as HTMLElement);

    const params: Params = {};
    const dataset = tracked?.dataset ?? {};
    for (const key of Object.keys(dataset)) {
      if (key === 'track' || !key.startsWith('track')) continue;
      const name = key.slice(5).replace(/^./, (c) => c.toLowerCase()).replace(/[A-Z]/g, (c) => '_' + c.toLowerCase());
      const raw = dataset[key] ?? '';
      params[name] = this.numeric.has(name) && raw !== '' && !isNaN(Number(raw)) ? Number(raw) : raw;
    }

    const anchor = el.closest('a') as HTMLAnchorElement | null;
    const text = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim();
    params['element_text'] = text.slice(0, 80);
    params['element_tag'] = el.tagName.toLowerCase();
    params['click_type'] = anchor ? 'link' : interactive ? 'button' : 'other';
    params['section_id'] = el.closest('section[id], header, footer')?.id || el.closest('header, footer')?.tagName.toLowerCase() || '';
    if (anchor?.href) params['link_url'] = anchor.href;
    if (typeof params['price'] === 'number') {
      params['value'] = params['price'];
      params['currency'] = 'BRL';
    }

    this.track(tracked?.dataset['track'] || 'generic_click', params);
  }

  private trackScrollDepth(): void {
    const win = this.document.defaultView!;
    const pending = [25, 50, 75, 100];
    const onScroll = () => {
      const doc = this.document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max <= 0) return;
      const pct = (win.scrollY / max) * 100;
      while (pending.length && pct >= pending[0] - (pending[0] === 100 ? 1 : 0)) {
        this.track('scroll_depth', { percent: pending.shift()! });
      }
      if (!pending.length) win.removeEventListener('scroll', onScroll);
    };
    win.addEventListener('scroll', onScroll, { passive: true });
  }

  private trackSections(): void {
    if (!('IntersectionObserver' in window)) return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && !seen.has(id)) {
            seen.add(id);
            this.track('section_view', { section_id: id });
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.4 },
    );
    this.document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
  }

  private trackTimeOnPage(): void {
    [15, 30, 60, 120].forEach((seconds) =>
      setTimeout(() => {
        if (this.document.visibilityState === 'visible') this.track('time_on_page', { seconds });
      }, seconds * 1000),
    );
  }
}
