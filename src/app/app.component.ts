import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './shared/analytics.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'lais';

  constructor(private analytics: AnalyticsService) {}

  ngOnInit(): void {
    this.analytics.start();
  }
}
