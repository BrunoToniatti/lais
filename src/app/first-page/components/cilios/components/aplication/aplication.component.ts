import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AplicationButtonComponent } from "../aplication-button/aplication-button.component";

@Component({
  selector: 'app-aplication',
  standalone: true,
  imports: [
    CommonModule,
    AplicationButtonComponent
],
  templateUrl: './aplication.component.html',
  styleUrl: './aplication.component.scss'
})
export class AplicationComponent {
  constructor(private router: Router) { }

  aplicacoes = [
    { nome: 'Volume Brasileiro', img: 'assets/cilios/brasileiro.png' },
    { nome: 'Volume Inglês', img: 'assets/cilios/ingles.jpg' },
    { nome: 'Volume Glamour', img: 'assets/cilios/glamour.png' },
    { nome: 'Volume Wispy', img: 'assets/cilios/wispy.png' },
    { nome: 'Estilo Fox Eyes', img: 'assets/cilios/fox.png' },
    { nome: 'Estilo Fio a Fio', img: 'assets/cilios/fioafio.png' }
  ];

  agendar(tipo: string) {
    this.router.navigate(['/calendar'], {
      queryParams: { procedimento: tipo }
    });
  }

}

