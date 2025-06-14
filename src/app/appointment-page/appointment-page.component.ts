import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../first-page/components/header/header.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AgendamentoService } from '../services/agendamento.service';

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './appointment-page.component.html',
  styleUrl: './appointment-page.component.scss'
})
export class AppointmentPageComponent {
  loading: boolean = false;
  date: string = '';
  procedure: string = '';
  dateFormat: string = '';
  horariosDisponiveis: string[] = [];
  selectedTime: string | null = null;
  form: FormGroup;
  sucesso: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService
  ) {
    this.date = this.route.snapshot.paramMap.get('date') || '';
    this.procedure = decodeURIComponent(this.route.snapshot.queryParamMap.get('procedimento') || '');
    this.dateFormat = this.date;
    this.form = this.fb.group({
      client_name: ['', Validators.required],
      client_email: ['', [Validators.required, Validators.email]],
      client_phone: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.date = params.get('date') || '';
      this.procedure = decodeURIComponent(this.route.snapshot.queryParamMap.get('procedimento') || '');
      this.dateFormat = this.date;
      this.carregarHorarios(); // ✅ agora só chama depois de setar tudo
    });
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  submit() {
  if (this.form.valid && this.selectedTime) {
    const agendamento = {
      client_name: this.form.value.client_name,
      client_email: this.form.value.client_email,
      client_phone: this.form.value.client_phone,
      appointment_date: this.date,
      appointment_time: this.selectedTime,
      service_type: this.procedure
    };

    this.loading = true; // inicia o loading

    this.agendamentoService.criarAgendamento(agendamento).subscribe({
      next: () => {
        this.sucesso = true;
        this.loading = false;
        setTimeout(() => { this.sucesso = false; }, 3500);
        this.form.reset();
        this.selectedTime = null;
      },
      error: (err) => {
        console.error('Erro ao agendar:', err);
        alert('Erro ao agendar. Verifique os dados e tente novamente.');
        this.loading = false;
      }
    });
  }
}

  carregarHorarios() {
  this.agendamentoService.getHorariosDisponiveis(this.date, this.procedure)
    .subscribe((res: any) => {
      this.horariosDisponiveis = res.horarios;
    });
}

  somarMinutos(hora: string, minutos: number): string {
    const [h, m] = hora.split(':').map(Number);
    const total = h * 60 + m + minutos;
    const novaH = Math.floor(total / 60).toString().padStart(2, '0');
    const novaM = (total % 60).toString().padStart(2, '0');
    return `${novaH}:${novaM}`;
  }

  compararHoras(h1: string, h2: string): boolean {
    const [h1h, h1m] = h1.split(':').map(Number);
    const [h2h, h2m] = h2.split(':').map(Number);
    return h1h < h2h || (h1h === h2h && h1m < h2m);
  }

  get dataFormatadaBR(): string {
    if (!this.date) return '';
    const [ano, mes, dia] = this.date.split('-');
    return `${dia}/${mes}/${ano}`;
  }
}
