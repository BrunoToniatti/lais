import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { PLATFORM_API_URL } from './platform.config';

export interface PromoCampaign {
  id: number;
  name: string;
  audience: 'all' | 'new' | 'returning';
  modal: {
    title: string;
    body: string;
    image_url: string;
    cta_label: string;
    cta_url: string;
    delay_seconds: number;
    pages: string[];
    frequency: 'always' | 'session' | 'day' | 'once';
  };
}

type EventType = 'impression' | 'click' | 'close';

const VISITOR_KEY = 'lais.vid';
const DAY_MS = 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 4000;

/**
 * Busca a campanha ativa na plataforma e decide se e quando exibir o modal.
 *
 * Princípio: o modal NUNCA pode atrapalhar o visitante. Por isso:
 *  - qualquer falha (API fora do ar, lenta, resposta estranha) é ignorada em silêncio;
 *  - só um modal por visita, e depois de fechado não volta nessa página;
 *  - as regras (período, público, página, atraso, frequência) vêm do painel da Laís.
 */
@Injectable({ providedIn: 'root' })
export class PromoModalService {
  readonly current = signal<PromoCampaign | null>(null);

  private started = false;
  private visitorId = '';
  private preview = false;
  private timer?: ReturnType<typeof setTimeout>;
  private readonly isBrowser: boolean;

  constructor(
    private analytics: AnalyticsService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async start(): Promise<void> {
    if (!this.isBrowser || this.started) return;
    this.started = true;

    // ?modal_preview=1 deixa a Laís testar o modal ignorando a frequência (sem contar métricas).
    this.preview = new URLSearchParams(this.document.location.search).has('modal_preview');

    const { id, returning } = this.resolveVisitor();
    this.visitorId = id;

    // No teste, a Laís (que já visitou o site) precisa ver também campanhas de "primeira visita".
    const campaigns = this.preview
      ? this.merge(await Promise.all([this.fetchCampaigns('new'), this.fetchCampaigns('returning')]))
      : await this.fetchCampaigns(returning ? 'returning' : 'new');
    const campaign = campaigns.find((c) => this.isValid(c) && (this.preview || this.frequencyAllows(c)));
    if (!campaign) return;

    this.timer = setTimeout(() => this.whenVisible(campaign), Math.max(0, campaign.modal.delay_seconds) * 1000);
  }

  /** Fecha o modal. `method` identifica como o visitante fechou (métrica). */
  close(method: 'button' | 'dismiss' | 'esc' | 'cta' = 'button'): void {
    const campaign = this.current();
    if (!campaign) return;
    this.current.set(null);
    if (method === 'esc') this.analytics.track('modal_close', { campaign_id: campaign.id, method });
    if (method !== 'cta') this.send('close', campaign);
  }

  /** Chamado ao clicar no botão principal. O clique em si é medido pelo data-track do template. */
  cta(): void {
    const campaign = this.current();
    if (!campaign) return;
    this.send('click', campaign);
    this.current.set(null);
  }

  /** Só links http(s): nunca confia cegamente no que vem da API. */
  safeUrl(url: string): string | null {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : null;
    } catch {
      return null;
    }
  }

  // ---- regras de exibição ---------------------------------------------------

  private isValid(c: PromoCampaign): boolean {
    return !!c?.modal?.title && typeof c.id === 'number';
  }

  private frequencyAllows(c: PromoCampaign): boolean {
    const key = this.key(c);
    switch (c.modal.frequency) {
      case 'always':
        return true;
      case 'session':
        return !this.read(sessionStorage, key);
      case 'once':
        return !this.read(localStorage, key);
      case 'day': {
        const last = Number(this.read(localStorage, key));
        return !last || Date.now() - last > DAY_MS;
      }
      default:
        return false;
    }
  }

  private markShown(c: PromoCampaign): void {
    if (this.preview) return;
    this.write(sessionStorage, this.key(c), '1');
    this.write(localStorage, this.key(c), String(Date.now()));
  }

  /** Espera a aba estar visível para não exibir (nem contar) um modal que ninguém viu. */
  private whenVisible(campaign: PromoCampaign): void {
    if (this.document.visibilityState === 'visible') {
      this.show(campaign);
      return;
    }
    const onVisible = () => {
      if (this.document.visibilityState !== 'visible') return;
      this.document.removeEventListener('visibilitychange', onVisible);
      this.show(campaign);
    };
    this.document.addEventListener('visibilitychange', onVisible);
  }

  private show(campaign: PromoCampaign): void {
    this.markShown(campaign);
    this.current.set(campaign);
    this.analytics.track('modal_view', { campaign_id: campaign.id, campaign_name: campaign.name });
    this.send('impression', campaign);
  }

  // ---- rede -----------------------------------------------------------------

  private async fetchCampaigns(visitor: 'new' | 'returning'): Promise<PromoCampaign[]> {
    const controller = new AbortController();
    const abort = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const page = this.document.location.pathname || '/';
      const url = `${PLATFORM_API_URL}/public/campaigns/?page=${encodeURIComponent(page)}&visitor=${visitor}`;
      const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
      if (!response.ok) return [];
      const data: unknown = await response.json();
      return Array.isArray(data) ? (data as PromoCampaign[]) : [];
    } catch {
      return []; // API fora do ar ou lenta: o site segue normal, sem modal
    } finally {
      clearTimeout(abort);
    }
  }

  private merge(lists: PromoCampaign[][]): PromoCampaign[] {
    const seen = new Set<number>();
    return lists.flat().filter((c) => !seen.has(c.id) && !!seen.add(c.id));
  }

  private send(type: EventType, campaign: PromoCampaign): void {
    if (this.preview) return;
    fetch(`${PLATFORM_API_URL}/public/events/`, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        campaign: campaign.id,
        visitor_id: this.visitorId,
        page: this.document.location.pathname || '/',
      }),
    }).catch(() => undefined);
  }

  // ---- visitante anônimo (LGPD: só um identificador aleatório) -----------------

  private resolveVisitor(): { id: string; returning: boolean } {
    const existing = this.read(localStorage, VISITOR_KEY);
    if (existing) return { id: existing, returning: true };
    const id = (crypto.randomUUID?.() ?? `${Date.now()}${Math.random().toString(16).slice(2)}`).replace(/[^A-Za-z0-9_-]/g, '');
    this.write(localStorage, VISITOR_KEY, id);
    return { id, returning: false };
  }

  private key(c: PromoCampaign): string {
    return `lais.modal.${c.id}`;
  }

  // Storage pode estar bloqueado (aba anônima, política do navegador): nunca deixa quebrar.
  private read(store: Storage, key: string): string | null {
    try {
      return store.getItem(key);
    } catch {
      return null;
    }
  }

  private write(store: Storage, key: string, value: string): void {
    try {
      store.setItem(key, value);
    } catch {
      /* sem armazenamento: o modal pode reaparecer, mas nada quebra */
    }
  }
}
