import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {
  confettiPieces: Array<{left: number, color: string}> = [];
  floatingHearts: Array<{left: number}> = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.generateConfetti();
    this.generateFloatingHearts();
  }

  private generateConfetti() {
    const colors = ['#cc2e73', '#e91e63', '#f8bbd9', '#f48fb1', '#fce4ec'];

    for (let i = 0; i < 50; i++) {
      this.confettiPieces.push({
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  private generateFloatingHearts() {
    for (let i = 0; i < 8; i++) {
      this.floatingHearts.push({
        left: Math.random() * 90 + 5
      });
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  scheduleAnother() {
    this.router.navigate(['/calendar']);
  }
}
