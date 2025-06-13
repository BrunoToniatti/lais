import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aplication-button',
  standalone: true,
  imports: [],
  templateUrl: './aplication-button.component.html',
  styleUrl: './aplication-button.component.scss'
})
export class AplicationButtonComponent {
  @Input() btnStyle: string = '';
  @Input() btnProcedure: string = '';
  @Input() btnText: string = '';

  constructor(private router: Router) { }

  agendar(tipo: string) {
    this.router.navigate(['/calendar'], {
      queryParams: { procedimento: tipo }
    });
  }
}
