import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://31.97.168.107:8001/api/servicos/';
  // private apiUrl = 'http://localhost:8000/api/servicos/';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = '1759a5c6ea101b459351248ce3c2ae406f7e9ab9'; // 🔁 Substitua aqui pelo token da Lais
    return new HttpHeaders({
      Authorization: `Token ${token}`
    });
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.getAuthHeaders() });
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, data, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }
}
