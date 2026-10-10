import { Component } from '@angular/core';
import { ScrollService } from '../../../shared/scroll.service';
import { INSTAGRAM_URL, whatsappLink } from '../../../shared/salon.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  instagram = INSTAGRAM_URL;
  whatsapp = whatsappLink();

  constructor(public scroller: ScrollService) {}
}
