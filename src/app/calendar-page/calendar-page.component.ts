import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../first-page/components/header/header.component";
import { FormsModule } from '@angular/forms';
import { AgendamentoService } from '../services/agendamento.service';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FormsModule,

  ],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss'
})
export class CalendarPageComponent {
  diasComDisponibilidade: string[] = []; // formato YYYY-MM-DD

  currentDate = new Date();
  weeks: (Date | null)[][] = [];
  procedure: string = '';
  procedures: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private agendamentoService: AgendamentoService,
    private serviceService: ServiceService
  ) {
    this.generateCalendar();
    this.carregarProcedimentos();
  }
  carregarProcedimentos() {
  this.serviceService.getAll().subscribe({
    next: (res) => {
      // Ajuste conforme a estrutura que o backend retornar:
      this.procedures = res.map((s: any) => s.name);

      const fromQuery = this.route.snapshot.queryParamMap.get('procedimento');
      if (fromQuery && this.procedures.includes(fromQuery)) {
        this.procedure = fromQuery;
        this.carregarDiasDisponiveis();
      }
    },
    error: (err) => {
      console.error('Erro ao carregar procedimentos:', err);
    }
  });
}
  diasComHorario: string[] = [];

  carregarDiasDisponiveis() {
    const ano = this.currentDate.getFullYear();
    const mes = this.currentDate.getMonth() + 1;
    this.agendamentoService.getDiasDisponiveis(ano, mes, this.procedure).subscribe({
      next: (dias) => {
        this.diasComHorario = dias;
        this.generateCalendar();
      },
      error: (err) => {
        console.error('Erro ao carregar dias disponíveis:', err);
      }
    });
  }

  temHorarioDisponivel(date: Date | null): boolean {
    if (!date) return false;
    const dataStr = date.toISOString().split('T')[0];
    return this.diasComDisponibilidade.includes(dataStr);
  }


  selecionarProcedimento(p: string) {
    this.procedure = p;
    this.carregarDiasDisponiveis();
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

  isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

  isDisponivel(date: Date): boolean {
    if (this.isToday(date)) return false;
    const dia = date.toISOString().split('T')[0];
    return this.diasComHorario.includes(dia);
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
