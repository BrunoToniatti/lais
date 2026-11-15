import { Injectable } from '@angular/core';

const VISITOR_KEY = 'lais.vid';

/**
 * Identifica o visitante de forma anônima (só um código aleatório, sem dados pessoais — LGPD).
 * É calculado uma única vez por carregamento: se cada recurso (modal, letreiro) decidisse sozinho,
 * o primeiro criaria o código e o segundo trataria um visitante novo como recorrente.
 */
@Injectable({ providedIn: 'root' })
export class VisitorService {
  private cached?: { id: string; returning: boolean };

  get(): { id: string; returning: boolean } {
    if (this.cached) return this.cached;
    const existing = this.read();
    if (existing) return (this.cached = { id: existing, returning: true });
    const raw = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}${Math.random().toString(16).slice(2)}`;
    const id = raw.replace(/[^A-Za-z0-9_-]/g, '');
    this.write(id);
    return (this.cached = { id, returning: false });
  }

  // O armazenamento pode estar bloqueado (aba anônima, política do navegador): nunca deixa quebrar.
  private read(): string | null {
    try {
      return localStorage.getItem(VISITOR_KEY);
    } catch {
      return null;
    }
  }

  private write(id: string): void {
    try {
      localStorage.setItem(VISITOR_KEY, id);
    } catch {
      /* sem armazenamento: cada visita conta como nova, mas nada quebra */
    }
  }
}
