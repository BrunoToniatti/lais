import { Component } from '@angular/core';
import { AplicationComponent } from "../dental/components/aplication/aplication.component";

@Component({
  selector: 'app-dental',
  standalone: true,
  imports: [AplicationComponent],
  templateUrl: './dental.component.html',
  styleUrl: './dental.component.scss'
})
export class DentalComponent {

}
