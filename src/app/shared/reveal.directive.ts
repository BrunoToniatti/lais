import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

/** Anima o elemento (fade + subida) quando ele entra na tela. */
@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  /** Atraso em ms, útil para escalonar cards de uma mesma grade. */
  @Input() appReveal: number | string = 0;

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) return;

    const node = this.el.nativeElement;
    node.classList.add('reveal');
    node.style.transitionDelay = `${Number(this.appReveal) || 0}ms`;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('reveal--in');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
