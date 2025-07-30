import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private apiUrl = 'http://31.97.168.107:8001/api/agendamentos/';
  // private apiUrl = 'http://localhost:8000/api/agendamentos/';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = '1759a5c6ea101b459351248ce3c2ae406f7e9ab9';
    return new HttpHeaders({
      Authorization: `Token ${token}`
    });
  }

  // exemplo de função
  criarAgendamento(agendamento: Agendamento): Observable<any> {
    return this.http.post(`${this.apiUrl}agendamentos/`, agendamento, { headers: this.getAuthHeaders() });
  }

  getDiasDisponiveis(ano: number, mes: number, procedimento: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}dias-disponiveis/?ano=${ano}&mes=${mes}&procedimento=${procedimento}`, { headers: this.getAuthHeaders() });
  }

  getAgendamentosPorData(data: string): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}agendamentos/?date=${data}`, { headers: this.getAuthHeaders() });
  }

  getHorariosDisponiveis(data: string, procedimento: string) {
    const params = new HttpParams()
      .set('data', data)
      .set('procedimento', procedimento);
    return this.http.get<any>(`${this.apiUrl}horarios-disponiveis/`, {
      params,
      headers: this.getAuthHeaders()
    });
  }
}
