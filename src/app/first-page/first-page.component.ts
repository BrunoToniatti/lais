import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { CareComponent } from './components/care/care.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappFabComponent } from './components/whatsapp-fab/whatsapp-fab.component';

@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    CareComponent,
    PricingComponent,
    FooterComponent,
    WhatsappFabComponent,
  ],
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.scss',
})
export class FirstPageComponent {}
