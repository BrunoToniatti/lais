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
    this.menuAtivo = false;
    this.submenuAtivo = false;
    this.router.navigate(['/calendar']);
  }  logout() {
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
  }  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.isDesktop = window.innerWidth > 768;
      if (this.isDesktop) {
        this.submenuAtivo = false;
        this.menuAtivo = false;

        // Restaurar scroll do body quando mudar para desktop
        if (typeof document !== 'undefined') {
          document.body.style.overflow = '';
        }
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const navbar = target.closest('.navbar');

    if (!navbar && this.menuAtivo) {
      this.menuAtivo = false;
      this.submenuAtivo = false;

      // Restaurar scroll do body
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
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
      // Fechar menu com animação suave
      this.menuAtivo = false;
      this.submenuAtivo = false;

      // Restaurar scroll do body
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }

      // Aguardar um pouco para a animação do menu antes de fazer scroll
      setTimeout(() => {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 150);
    }
  }
}
