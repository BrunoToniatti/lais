import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ScrollService } from '../../../shared/scroll.service';
import { whatsappLink } from '../../../shared/salon.data';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  links = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre-mim', label: 'Sobre' },
    { id: 'servicos', label: 'Estilos' },
    { id: 'cuidados', label: 'Remoção' },
    { id: 'valores', label: 'Valores' },
  ];

  menuOpen = false;
  scrolled = false;
  progress = 0;
  active = 'inicio';
  whatsapp = whatsappLink('Olá! Gostaria de agendar um horário.');

  private observer?: IntersectionObserver;
  private readonly isBrowser: boolean;

  constructor(
    private scroller: ScrollService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser || !('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (this.active = e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    this.links.forEach(({ id }) => {
      const el = this.document.getElementById(id);
      if (el) this.observer!.observe(el);
    });
    this.onScroll();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.lockBody(false);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    const doc = this.document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    this.scrolled = window.scrollY > 24;
    this.progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.menuOpen) this.toggleMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser && window.innerWidth > 900 && this.menuOpen) this.toggleMenu();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.lockBody(this.menuOpen);
  }

  go(id: string, event: Event): void {
    if (this.menuOpen) this.toggleMenu();
    this.scroller.scrollTo(id, event);
  }

  private lockBody(lock: boolean): void {
    if (this.isBrowser) this.document.body.style.overflow = lock ? 'hidden' : '';
  }
}
