import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

/** Rolagem suave com easing, que respeita prefers-reduced-motion e o header fixo. */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly isBrowser: boolean;
  private frame = 0;
  private readonly offset = 72;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  scrollTo(id: string, event?: Event): void {
    event?.preventDefault();
    if (!this.isBrowser) return;

    const target = this.document.getElementById(id);
    const win = this.document.defaultView;
    if (!target || !win) return;

    const start = win.scrollY;
    const end = id === 'inicio' ? 0 : target.getBoundingClientRect().top + start - this.offset;
    const distance = end - start;
    const reduced = win.matchMedia('(prefers-reduced-motion: reduce)').matches;

    cancelAnimationFrame(this.frame);
    if (reduced || Math.abs(distance) < 2) {
      win.scrollTo(0, end);
      return;
    }

    const duration = Math.min(1400, Math.max(700, Math.abs(distance) * 0.6));
    const t0 = performance.now();
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const cancel = () => cancelAnimationFrame(this.frame);
    win.addEventListener('wheel', cancel, { once: true, passive: true });
    win.addEventListener('touchstart', cancel, { once: true, passive: true });

    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      win.scrollTo(0, start + distance * ease(p));
      if (p < 1) this.frame = requestAnimationFrame(step);
    };
    this.frame = requestAnimationFrame(step);
  }
}
