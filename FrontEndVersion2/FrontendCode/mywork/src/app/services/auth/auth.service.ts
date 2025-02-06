import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { SignUpRequest, SignInRequest, LoginResponse, UserDTO, UpdateUserDTO } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  signUp(user: SignUpRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/Auth/addUser`, user, { headers });
  }

  signIn(user: SignInRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/login`, user, { headers });
  }

  // Checking if window and localStorage are defined
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
    }
  }

  clearToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
  }

  getUserById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/Auth/getUserById/${id}`);
  }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/Auth/getAllUsers`);
  }

  getAllDoctors(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/Auth/getAllDoctors`);
  }

  updateUser(id: number, userDto: UpdateUserDTO): Observable<UserDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put<UserDTO>(`${this.apiUrl}/Auth/updateUser/${id}`, userDto, { headers });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Auth/deleteUser/${id}`);
  }
}

