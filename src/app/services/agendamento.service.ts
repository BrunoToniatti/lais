import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Agendamento {
  client_name: string;
  client_email: string;
  client_phone: string;
  appointment_date: string;
  appointment_time: string;
  service_type: string;
  appointment_created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = 'https://lais-backend.onrender.com/api/agendamentos/';

  constructor(private http: HttpClient) { }

  // exemplo de função
  criarAgendamento(agendamento: Agendamento): Observable<any> {
    return this.http.post(`${this.apiUrl}agendamentos/`, agendamento);
  }

  getDiasDisponiveis(ano: number, mes: number, procedimento: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}dias-disponiveis/?ano=${ano}&mes=${mes}&procedimento=${procedimento}`);
  }

  getAgendamentosPorData(data: string): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}agendamentos/?date=${data}`);
  }

  getHorariosDisponiveis(data: string, procedimento: string) {
  const params = new HttpParams()
    .set('data', data)
    .set('procedimento', procedimento);
  return this.http.get<any>(`${this.apiUrl}horarios-disponiveis/`, { params });
}
}
