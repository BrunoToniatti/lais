import { Component, OnInit, inject } from '@angular/core';
import { TickerService } from '../../../shared/ticker.service';

@Component({
  selector: 'app-ticker',
  standalone: true,
  templateUrl: './ticker.component.html',
  styleUrl: './ticker.component.scss',
})
export class TickerComponent implements OnInit {
  ticker = inject(TickerService);

  ngOnInit(): void {
    this.ticker.start();
  }

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}
