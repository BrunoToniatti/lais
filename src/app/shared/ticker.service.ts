import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, computed, signal } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { PLATFORM_API_URL } from './platform.config';
import { VisitorService } from './visitor.service';

export interface TickerMessage {
  text: string;
  url: string;
}

export interface TickerData {
  id: number;
  name: string;
  messages: TickerMessage[];
  speed: 'slow' | 'normal' | 'fast';
  theme: 'gold' | 'dark';
}

const FETCH_TIMEOUT_MS = 4000;
const TICKER_HEIGHT = '40px';
const DISMISS_KEY = 'lais.ticker.dismissed';
/** Segundos de rolagem por caractere: nunca passa rápido demais para ler. */
const SECONDS_PER_CHAR = { slow: 0.5, normal: 0.35, fast: 0.24 };

/**
 * Letreiro no topo do site, controlado pelo painel da Laís.
 * Qualquer falha (API fora do ar, resposta estranha) é ignorada em silêncio: o site segue normal.
 */
@Injectable({ providedIn: 'root' })
export class TickerService {
  readonly current = signal<TickerData | null>(null);

  /** Quantas cópias do conjunto de frases: o letreiro precisa ser mais largo que a tela para não abrir buraco. */
  readonly copies = computed(() => {
    const t = this.current();
    return t && this.chars(t) < 110 ? 4 : 2;
  });

  readonly duration = computed(() => {
    const t = this.current();
    if (!t) return 30;
    return Math.max(14, Math.round(this.chars(t) * (this.copies() / 2) * SECONDS_PER_CHAR[t.speed]));
  });

  private started = false;
  private preview = false;
  private readonly isBrowser: boolean;

  constructor(
    private analytics: AnalyticsService,
    private visitor: VisitorService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async start(): Promise<void> {
    if (!this.isBrowser || this.started) return;
    this.started = true;

    // ?ticker_preview=1 deixa a Laís ver o letreiro ignorando o "fechar" e sem contar métricas.
    this.preview = new URLSearchParams(this.document.location.search).has('ticker_preview');

    const ticker = await this.fetchTicker();
    if (!ticker || (!this.preview && this.wasDismissed(ticker))) return;

    this.current.set(ticker);
    this.document.documentElement.style.setProperty('--ticker-h', TICKER_HEIGHT);
    this.analytics.track('ticker_view', { campaign_id: ticker.id, campaign_name: ticker.name });
    this.send('impression', ticker);
  }

  dismiss(): void {
    const ticker = this.current();
    if (!ticker) return;
    this.current.set(null);
    this.document.documentElement.style.setProperty('--ticker-h', '0px');
    if (!this.preview) {
      this.write(JSON.stringify({ id: ticker.id, sig: this.signature(ticker) }));
      this.send('close', ticker);
    }
  }

  /** Clique numa frase com link. O clique em si é medido pelo data-track do template. */
  clicked(): void {
    const ticker = this.current();
    if (ticker) this.send('click', ticker);
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

  // ---- rede -----------------------------------------------------------------

  private async fetchTicker(): Promise<TickerData | null> {
    const controller = new AbortController();
    const abort = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const page = this.document.location.pathname || '/';
      const visitors = this.preview ? (['new', 'returning'] as const) : ([this.visitor.get().returning ? 'returning' : 'new'] as const);
      for (const v of visitors) {
        const response = await fetch(`${PLATFORM_API_URL}/public/ticker/?page=${encodeURIComponent(page)}&visitor=${v}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        if (response.status !== 200) continue; // 204 = não há letreiro
        const ticker = this.validate(await response.json());
        if (ticker) return ticker;
      }
      return null;
    } catch {
      return null; // API fora do ar ou lenta: o site segue normal, sem letreiro
    } finally {
      clearTimeout(abort);
    }
  }

  private validate(data: unknown): TickerData | null {
    const d = data as Partial<TickerData> | null;
    if (!d || typeof d.id !== 'number' || !Array.isArray(d.messages)) return null;
    const messages = d.messages
      .map((m) => ({ text: String(m?.text ?? '').trim().slice(0, 80), url: m?.url ? (this.safeUrl(String(m.url)) ?? '') : '' }))
      .filter((m) => m.text)
      .slice(0, 6);
    if (!messages.length) return null;
    return {
      id: d.id,
      name: String(d.name ?? ''),
      messages,
      speed: d.speed === 'slow' || d.speed === 'fast' ? d.speed : 'normal',
      theme: d.theme === 'dark' ? 'dark' : 'gold',
    };
  }

  private send(type: 'impression' | 'click' | 'close', ticker: TickerData): void {
    if (this.preview) return;
    fetch(`${PLATFORM_API_URL}/public/events/`, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        campaign: ticker.id,
        visitor_id: this.visitor.get().id,
        page: this.document.location.pathname || '/',
      }),
    }).catch(() => undefined);
  }

  // ---- "fechar" lembrado até a Laís trocar o conteúdo ---------------------------

  private chars(t: TickerData): number {
    return t.messages.reduce((sum, m) => sum + m.text.length + 4, 0);
  }

  private signature(t: TickerData): string {
    const text = t.messages.map((m) => m.text).join('|');
    let hash = 0;
    for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) | 0;
    return String(hash);
  }

  private wasDismissed(t: TickerData): boolean {
    try {
      const saved = JSON.parse(localStorage.getItem(DISMISS_KEY) ?? 'null') as { id: number; sig: string } | null;
      return !!saved && saved.id === t.id && saved.sig === this.signature(t);
    } catch {
      return false;
    }
  }

  private write(value: string): void {
    try {
      localStorage.setItem(DISMISS_KEY, value);
    } catch {
      /* sem armazenamento: o letreiro pode reaparecer, mas nada quebra */
    }
  }
}
