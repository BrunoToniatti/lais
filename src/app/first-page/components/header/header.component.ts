import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() where: string = '';

  menuAtivo = false;
  submenuAtivo = false;
  isDesktop = true;

  // Método para redirecionar para a página inicial
  home() {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }

  toggleMenu() {
    this.menuAtivo = !this.menuAtivo;
    if (!this.menuAtivo) {
      this.submenuAtivo = false;
    }
  }

  toggleSubmenu(event: Event) {
    if (!this.isDesktop) {
      event.stopPropagation(); // Impede conflito com clique geral
      this.submenuAtivo = !this.submenuAtivo;
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.isDesktop = window.innerWidth > 768;
      if (this.isDesktop) {
        this.submenuAtivo = false;
      }
    }
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.onResize();
    }
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.menuAtivo = false; // Fecha o menu no mobile
      this.submenuAtivo = false;
    }
  }
}
