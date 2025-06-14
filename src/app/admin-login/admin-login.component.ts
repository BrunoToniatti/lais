import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  usuario = '';
  senha = '';
  erroLogin = '';

  constructor(private router: Router) { }

  fazerLogin() {
    if (this.usuario === 'lais' && this.senha === '1234') {
      this.erroLogin = '';
      this.router.navigate(['/admin/painel']);
    } else {
      this.erroLogin = 'Usuário ou senha incorretos.';
    }
  }
}
