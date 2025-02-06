import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';  // Correct import for throwError and Observable
import { catchError } from 'rxjs/operators';    // Import catchError from rxjs/operators
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
    return this.http.get<AppointmentDTO[]>(`${this.apiUrl}/getallapt`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching appointments:', error);
        return throwError(() => new Error('Error fetching appointments'));  // Corrected error handling
      })
    );
  }

  // Get an appointment by ID
  getAppointmentById(id: number): Observable<AppointmentDTO> {
    return this.http.get<AppointmentDTO>(`${this.apiUrl}/getbyid/${id}`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching appointment by ID:', error);
        return throwError(() => new Error('Error fetching appointment by ID'));
      })
    );
  }

  createAppointment(appointment: CreateAppointmentDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}/addapt`, appointment, { headers }).pipe(
      catchError((error) => {
        console.error('Error occurred while creating appointment:', error);
        return throwError(() => new Error('Error creating appointment'));
      })
    );
  }
  

  // Update an existing appointment
  updateAppointment(id: number, appointment: AppointmentDTO): Observable<AppointmentDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<AppointmentDTO>(`${this.apiUrl}/updateapt/${id}`, appointment, { headers }).pipe(
      catchError((error) => {
        console.error('Error occurred while updating appointment:', error);
        return throwError(() => new Error('Error updating appointment'));
      })
    );
  }

  // Delete an appointment by ID
  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
      catchError((error) => {
        console.error('Error occurred while deleting appointment:', error);
        return throwError(() => new Error('Error deleting appointment'));
      })
    );
  }
}
