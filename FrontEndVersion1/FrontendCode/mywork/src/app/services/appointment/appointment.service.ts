
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AppointmentDTO, CreateAppointmentDTO } from './appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/Appointment`; // Base URL for the API

  constructor(private http: HttpClient) {}

  // Get all appointments
  getAppointments(): Observable<AppointmentDTO[]> {
    return this.http.get<AppointmentDTO[]>(`${this.apiUrl}/getallapt`);
  }

  // Get an appointment by ID
  getAppointmentById(id: number): Observable<AppointmentDTO> {
    return this.http.get<AppointmentDTO>(`${this.apiUrl}/getbyid/${id}`);
  }

  // Create a new appointment
  createAppointment(appointment: CreateAppointmentDTO): Observable<AppointmentDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<AppointmentDTO>(`${this.apiUrl}/addapt`, appointment, { headers });
  }

  // Update an existing appointment
  updateAppointment(id: number, appointment: AppointmentDTO): Observable<AppointmentDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<AppointmentDTO>(`${this.apiUrl}/updateapt/${id}`, appointment, { headers });
  }

  // Delete an appointment by ID
  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
