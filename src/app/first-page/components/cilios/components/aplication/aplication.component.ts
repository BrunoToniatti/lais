import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aplication',
  standalone: true,
  imports: [
    CommonModule,
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

  agendar() {
     this.router.navigate(['/calendar']);
  }
  whatsappNumber = '5511961006415'; // insere o número da Lais aqui (com DDD, sem +)

  getWhatsappLink(estilo: string): string {
    const msg = `Olá! Gostaria de agendar um cílios estilo ${estilo}.`;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }

}

