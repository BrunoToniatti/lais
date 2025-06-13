import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../first-page/components/header/header.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FormsModule
],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss'
})
export class CalendarPageComponent {
  currentDate = new Date();
  weeks: (Date | null)[][] = [];
  procedure: string = '';
  procedures = ['Cílios fio a fio', 'Piercing', 'Limpeza de pele'];

  constructor(private router: Router) {
    this.generateCalendar();
  }

  get currentMonth(): string {
    return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const startDay = firstDay.getDay();
    const today = new Date();

    this.weeks = [];
    let currentWeek: (Date | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), d);
      currentWeek.push(date);

      if (currentWeek.length === 7) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      this.weeks.push(currentWeek);
    }
  }

  isPast(date: Date): boolean {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date < now;
  }

  selectDate(date: Date) {
    if (!this.isPast(date)) {
      const formatted = date.toISOString().split('T')[0];
      this.router.navigate(['/agendar', formatted], {
        queryParams: { procedimento: this.procedure }
      });
    }
  }
}
