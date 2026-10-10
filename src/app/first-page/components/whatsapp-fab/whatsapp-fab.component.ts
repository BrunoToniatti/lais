import { Component } from '@angular/core';
import { whatsappLink } from '../../../shared/salon.data';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  template: `
    <a class="fab" [href]="link" target="_blank" rel="noopener" aria-label="Agendar pelo WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.2-1.4A9.9 9.9 0 1 0 12.04 2zm5.8 14.1c-.25.7-1.45 1.34-2 1.4-.5.06-1.14.09-1.84-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.95-4.36-.14-.2-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.3.58-.37.78-.37h.56c.18 0 .42-.07.65.5l.9 2.2c.07.15.12.32.02.5-.1.2-.15.32-.3.5l-.45.52c-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.05 1.13 1 2.1 1.32 2.4 1.47.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15l2.1 1c.3.14.5.2.57.33.07.12.07.7-.18 1.4z"/></svg>
      <span>Agendar</span>
    </a>
  `,
  styles: `
    .fab {
      position: fixed;
      right: 1.2rem;
      bottom: 1.2rem;
      z-index: 900;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.85rem 1.3rem;
      border-radius: 999px;
      font-weight: 500;
      color: #fff;
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      box-shadow: 0 14px 30px -10px rgba(58, 42, 8, 0.65);
      transition: transform 0.4s var(--ease);
      animation: pulse 3s ease-in-out infinite;
    }
    .fab:hover { transform: translateY(-4px) scale(1.04); }
    svg { width: 1.5rem; height: 1.5rem; fill: currentColor; }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 14px 30px -10px rgba(58, 42, 8, 0.65), 0 0 0 0 rgba(197, 162, 69, 0.5); }
      50% { box-shadow: 0 14px 30px -10px rgba(58, 42, 8, 0.65), 0 0 0 14px rgba(197, 162, 69, 0); }
    }
    @media (max-width: 560px) {
      span { display: none; }
      .fab { padding: 0.95rem; }
    }
  `,
})
export class WhatsappFabComponent {
  link = whatsappLink('Olá! Vim pelo site e gostaria de agendar um horário.');
}
