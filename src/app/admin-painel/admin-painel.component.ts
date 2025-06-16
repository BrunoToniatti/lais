import { Component } from '@angular/core';
import { HeaderComponent } from "../first-page/components/header/header.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-painel',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './admin-painel.component.html',
  styleUrl: './admin-painel.component.scss'
})
export class AdminPainelComponent {
agendamentosHoje = [
    { cliente: 'Maria', hora: '10:00' },
    { cliente: 'Juliana', hora: '14:00' }
  ];

  totalMes = 1350; // R$ fictício
  totalClientes = 22;
  maisPopular = 'Volume Glamour';

  constructor(private router: Router) {}

  irPara(caminho: string) {
    this.router.navigate(['/admin', caminho]);
  }
}
