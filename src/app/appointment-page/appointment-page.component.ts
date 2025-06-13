import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../first-page/components/header/header.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
date: string = '';
dateFormat: string = '';
  times: string[] = ['09:00', '10:30', '13:00', '15:00', '17:30'];
  selectedTime: string | null = null;
  form: FormGroup;


  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.date = this.route.snapshot.paramMap.get('date') || '';
    this.dateFormat = this.date;
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  submit() {
    if (this.form.valid && this.selectedTime) {
      const agendamento = {
        date: this.dateFormat,
        time: this.selectedTime,
        ...this.form.value
      };
      console.log('Agendamento final:', agendamento);
      alert('Agendamento confirmado com sucesso!');
      this.form.reset();
      this.selectedTime = null;
    }
  }

  formatDateBR(date: string): string {
    // Espera data no formato 'YYYY-MM-DD'
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
}
