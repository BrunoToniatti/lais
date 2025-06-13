import { Component } from '@angular/core';
import { AplicationComponent } from "./components/aplication/aplication.component";
import { RemoveComponent } from "./components/remove/remove.component";
import { ManutencionComponent } from "./components/manutencion/manutencion.component";

@Component({
  selector: 'app-cilios',
  standalone: true,
  imports: [AplicationComponent, RemoveComponent, ManutencionComponent],
  templateUrl: './cilios.component.html',
  styleUrl: './cilios.component.scss'
})
export class CiliosComponent {

}
