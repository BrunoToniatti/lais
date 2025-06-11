import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AboutComponent } from "./components/about/about.component";
import { PriceTableComponent } from "./components/price-table/price-table.component";
import { FooterComponent } from "./components/footer/footer.component";


@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [
    HeaderComponent,
    CarouselComponent,
    AboutComponent,
    PriceTableComponent,
    FooterComponent
],
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.scss'
})
export class FirstPageComponent {

}
