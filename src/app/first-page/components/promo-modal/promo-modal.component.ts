import { Component, HostListener, OnInit, inject } from '@angular/core';
import { PromoModalService } from '../../../shared/promo-modal.service';

@Component({
  selector: 'app-promo-modal',
  standalone: true,
  templateUrl: './promo-modal.component.html',
  styleUrl: './promo-modal.component.scss',
})
export class PromoModalComponent implements OnInit {
  promo = inject(PromoModalService);

  ngOnInit(): void {
    this.promo.start();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.promo.close('esc');
  }
}
