import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router'; // 👈 IMPORTANTE!

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() where: string = '';

  menuAtivo = false;
  submenuAtivo = false;
  isDesktop = true;

  constructor(private router: Router) {} // 👈 INJETA O ROUTER

  agende() {
    this.router.navigate(['/calendar']);
  }

  logout() {
    // Aqui você limpa login futuro se tiver auth
    this.router.navigate(['/admin']);
  }

  navegar(caminho: string) {
    this.router.navigate(['/admin', caminho]);
  }

  home() {
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.menuAtivo = !this.menuAtivo;
    if (!this.menuAtivo) {
      this.submenuAtivo = false;
    }
  }

  toggleSubmenu(event: Event) {
    if (!this.isDesktop) {
      event.stopPropagation();
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
      this.menuAtivo = false;
      this.submenuAtivo = false;
    }
  }
}
